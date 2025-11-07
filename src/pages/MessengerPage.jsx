import { useTheme } from '@contexts/ThemeContext';
import { Button, ContactCard } from '@components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/contexts/AuthContext';
import { useWebSocket } from '/src/contexts/WebSocketContext';
// React-icons
import { MdDarkMode, MdLightMode } from 'react-icons/md';

// Import SCSS
import '/src/scss/_pages/_messenger_page.scss';

export const MessengerPage = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const { onlineUsers, isConnected } = useWebSocket();

  // Temporary for testing
  console.log('Online users:', onlineUsers);
  console.log('Connected:', isConnected);

  if (!isConnected) {
    return <div>Loading...</div>;
  }

  return (
    <div className='messenger_page'>
      <nav className='nav_line' id='navLine'>
        {/* User Logo */}
        <div className='auth_user_div'>{user?.username} </div>
        {/* Status indicate */}
        <div className='online_status_div'>{isConnected ? 'Online' : 'Offline'}</div>
        {/* Theme switch */}
        <Button className={'btn change_theme_btn'} dataTheme={theme} onClick={toggleTheme}>
          {theme === 'dark' ? (
            <MdDarkMode className='theme_ico' />
          ) : (
            <MdLightMode className='theme_ico' />
          )}
        </Button>
        {/* Log out btn */}
        <Button
          className={'btn btn_log_out'}
          onClick={() => {
            logout();
            navigate('/');
          }}>
          Log out
        </Button>
      </nav>

      <main className='messenger_container'>
        <div className='contacts_panel'>
          {!isConnected ? (
            <div className='connecting-message'>Connecting to server...</div>
          ) : onlineUsers.length === 0 ? (
            <div className='no-users-message'>No users online</div>
          ) : (
            onlineUsers.map((user) => <ContactCard key={user.id} userName={user.username} />)
          )}
        </div>
        <div className='dialog_panel'></div>
      </main>
    </div>
  );
};
