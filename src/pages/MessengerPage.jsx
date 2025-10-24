import { useTheme } from '@contexts/ThemeContext';
import { Button } from '@components';
import { useNavigate } from 'react-router-dom';
// React-icons
import { MdDarkMode, MdLightMode } from 'react-icons/md';

// Import SCSS
import '/src/scss/_pages/_messenger_page.scss';

export const MessengerPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  return (
    <div className='messenger_page'>
      <nav className='nav_line' id='navLine'>
        {/* Theme switch */}
        <Button className={'btn change_theme_btn'} dataTheme={theme} onClick={toggleTheme}>
          {theme === 'dark' ? (
            <MdDarkMode className='theme_ico' />
          ) : (
            <MdLightMode className='theme_ico' />
          )}
        </Button>
        {/* Log out btn */}
        <Button className={'btn btn_log_out'} onClick={() => navigate('/')}>
          Log out
        </Button>
      </nav>

      <main className='messenger_container'>
        <div className='contacts_panel'></div>
        <div className='dialog_panel'></div>
      </main>
    </div>
  );
};
