import { Button } from '@components';
import { useWebSocket } from '@contexts/WebSocketContext';
import { useAuth } from '@contexts/AuthContext';
import { useState } from 'react';

export const MessegesWindow = ({ selectedContact }) => {
  const { sendMessage, messages } = useWebSocket();
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');

  if (!selectedContact) {
    return (
      <div className='messeges_window'>
        <div className='no_contact_selected'>Choose user for communicate</div>
      </div>
    );
  }

  const currentChatMessages = messages.filter(
    (msg) =>
      (msg.senderId === user.id && msg.recipientId === selectedContact?.id) ||
      (msg.senderId === selectedContact?.id && msg.recipientId === user.id),
  );

  const handleSend = () => {
    if (!selectedContact) {
      alert('Choose contact');
      return;
    }

    if (!inputValue.trim()) return;

    sendMessage(selectedContact.id, inputValue);
    setInputValue('');
  };

  return (
    <div className='messeges_window'>
      <div className='messeges_history'>
        {currentChatMessages.map((msg) => (
          <div key={msg.id} className={`message ${msg.senderId === user.id ? 'sent' : 'received'}`}>
            <div className='message_content'>{msg.content}</div>
            <div className='message_timestamp'>{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div className='action_bar'>
        <input
          className='message_input'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Enter message'></input>
        <Button className={'btn send_message_btn'} onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};
