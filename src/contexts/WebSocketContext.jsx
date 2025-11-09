import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { getApiUrl } from '/src/config/apiConfig';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  const shouldReconnect = useRef(true);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5; // Maximum 5 reconnection attempts

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Attempting WebSocket connection for user:', user.username);
      shouldReconnect.current = true;
      reconnectAttempts.current = 0; // Reset reconnect attempts on new login
      connectWebSocket();
    } else {
      shouldReconnect.current = false;
      reconnectAttempts.current = 0;
      disconnectWebSocket();
    }

    return () => {
      shouldReconnect.current = false;
      reconnectAttempts.current = 0;
      disconnectWebSocket();
    };
  }, [isAuthenticated, user]);

  const connectWebSocket = async () => {
    try {
      // Get API URL from apiConfig (finds working API)
      const apiUrl = await getApiUrl();

      if (!apiUrl) {
        console.error('No working API found');
        return;
      }

      const wsBaseUrl = apiUrl
        .replace('http://', 'ws://')
        .replace('https://', 'wss://')
        .replace(/\/$/, '');

      const wsUrl = `${wsBaseUrl}/ws/${user.id}`;

      console.log('Connecting to WebSocked:', wsUrl);
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket Connected');
        setIsConnected(true);
        reconnectAttempts.current = 0; // Reset attempts on successful connection
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);

        if (data.type === 'online_users') {
          console.log('Updating online users:', data.users);
          setOnlineUsers(data.users);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket ERROR:', error);
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket CLOSED:', event.code, event.reason);
        setIsConnected(false);

        // Option: auto reconnect with maximum attempts limit
        if (shouldReconnect.current && isAuthenticated && user) {
          if (reconnectAttempts.current < maxReconnectAttempts) {
            reconnectAttempts.current += 1;
            console.log(
              `Attempting to reconnect in 3 seconds... (Attempt ${reconnectAttempts.current}/${maxReconnectAttempts})`,
            );
            setTimeout(() => {
              connectWebSocket();
            }, 3000);
          } else {
            console.warn(
              `Maximum reconnection attempts (${maxReconnectAttempts}) reached. Giving up.`,
            );
            shouldReconnect.current = false;
          }
        } else {
          console.log('Reconnect disabled (user logged out or max attempts reached)');
        }
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      console.log('Disconnecting WebSocket');
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
      setOnlineUsers([]);
    }
  };

  const value = {
    onlineUsers,
    isConnected,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => useContext(WebSocketContext);
