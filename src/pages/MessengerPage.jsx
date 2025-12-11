import { useTheme } from '@contexts/ThemeContext';
import { Button, ContactCard, MessegesWindow, SettingtModal } from '@components';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '/src/contexts/AuthContext';
import { useWebSocket } from '/src/contexts/WebSocketContext';
// React-icons
import { MdDarkMode, MdLightMode, MdArrowBackIosNew, MdOutlineSettings } from 'react-icons/md';

// Import SCSS
import '/src/scss/_pages/_messenger_page.scss';

export const MessengerPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  // const navigate = useNavigate();
  const { onlineUsers, isConnected } = useWebSocket();

  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Handle acount delete
  // const handleConfirmDelete = async () => {
  //   try {
  //     // TODO: add API call to delete account
  //     const responce = await deleteUser(user.username);
  //     // For now, logout and redirect to welcome page
  //     logout();
  //     navigate('/');
  //   } catch (err) {
  //     console.error('Delete account error:', err);
  //     alert('Failed to delete account');
  //   } finally {
  //     setModalOpen(false);
  //   }
  // };

  // Temporary for testing
  console.log('Online users:', onlineUsers);
  console.log('Connected:', isConnected);

  if (!isConnected) {
    return <div>Loading...</div>;
  }

  return (
    <div className='messenger_page'>
      <nav className='nav_line' id='navLine'>
        {/* User block */}
        <div className='user_block'>
          {/* User Logo */}
          <div className='auth_user_div'>{user?.username} </div>

          {/* Status indicate */}
          <div className='online_status_div'>{isConnected ? 'Online' : 'Offline'}</div>
        </div>

        {/* actions block */}
        <div className='actions_block'>
          {/* Setting btn */}
          <Button
            className={'btn change_theme_btn'}
            onClick={() => {
              setModalOpen(true);
            }}>
            <MdOutlineSettings />
          </Button>

          {/* Log out btn */}
          {/* <Button
            className={'btn btn_log_out'}
            onClick={() => {
              logout();
              navigate('/');
            }}>
            Log out
          </Button> */}
        </div>
      </nav>

      {/* ******************************************* */}
      {/* Setting  modal */}
      <SettingtModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        // onConfirm={handleConfirmDelete}
        username={user?.username}
      />
      {/* ******************************************* */}

      <main className={`messenger_container ${selectedContact ? 'chat_open' : ''}`}>
        <div className='contacts_panel'>
          {!isConnected ? (
            <div className='connecting-message'>Connecting to server...</div>
          ) : onlineUsers.length === 0 ? (
            <div className='no-users-message'>No users online</div>
          ) : (
            onlineUsers
              .filter((onlineUsers) => onlineUsers.id !== user.id)
              .map((onlineUser) => (
                <ContactCard
                  key={onlineUser.id}
                  userName={onlineUser.username}
                  onClick={() => setSelectedContact(onlineUser)}
                  isActive={selectedContact?.id === onlineUser.id}
                />
              ))
          )}
        </div>
        <div className='dialog_panel'>
          <MessegesWindow
            className='messeges_window'
            selectedContact={selectedContact}
            onClose={() => setSelectedContact(null)}></MessegesWindow>
        </div>
      </main>
    </div>
  );
};
