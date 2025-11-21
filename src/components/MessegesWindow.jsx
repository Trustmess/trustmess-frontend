import { Button } from '@components';
import { useWebSocket } from '@contexts/WebSocketContext';
import { useAuth } from '@contexts/AuthContext';
import { useState } from 'react';
import { useMemo } from 'react';
import { MdArrowBackIosNew, MdSend } from 'react-icons/md';

export const MessegesWindow = ({ selectedContact, onClose }) => {
  const { sendMessage, messages, onlineUsers } = useWebSocket();
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');

  // Helper usernames map
  const knownUsersMap = useMemo(() => {
    const map = new Map();
    if (user) map.set(user.id, user.username);

    if (selectedContact) map.set(selectedContact.id, selectedContact.username);

    if (Array.isArray(onlineUsers)) {
      onlineUsers.forEach((user) => {
        if (user?.id) map.set(user.id, user.username);
      });
    }
    return map;
  }, [onlineUsers, user, selectedContact]);

  const getUserName = (id) => {
    if (!id) return 'Unknown';
    return knownUsersMap.get(id) || `User ${id}`;
  };

  const currentChatMessages = messages.filter(
    (msg) =>
      (msg.senderId === user.id && msg.recipientId === selectedContact?.id) ||
      (msg.senderId === selectedContact?.id && msg.recipientId === user.id),
  );

  const handleBackToUserList = () => {
    if (typeof onClose === 'function') {
      onClose();
      return;
    }
  };

  const handleSend = () => {
    if (!selectedContact) {
      alert('Choose contact');
      return;
    }

    if (!inputValue.trim()) return;

    sendMessage(selectedContact.id, inputValue);
    setInputValue('');
  };

  if (!selectedContact) {
    return (
      <div className='messeges_window'>
        <div className='no_contact_selected'>Choose user for communicate</div>
      </div>
    );
  }

  return (
    <div className='messeges_window'>
      <div className='messeges_history'>
        {currentChatMessages.map((msg) => (
          <div key={msg.id} className={`message ${msg.senderId === user.id ? 'sent' : 'received'}`}>
            <div className='message_sender'>{getUserName(msg.senderId)}</div>
            <div className='message_timestamp'>
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </div>
            <div className='message_content'>{msg.content}</div>
          </div>
        ))}
      </div>
      <div className='action_bar'>
        {/* NEW ARROW BACK */}
        <Button className={'btn back_btn'} onClick={handleBackToUserList}>
          <MdArrowBackIosNew className='material-icons' />
        </Button>

        <input
          className='message_input'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Enter message'></input>

        <Button className={'btn send_message_btn'} onClick={handleSend}>
          <MdSend />
        </Button>
      </div>
    </div>
  );
};
