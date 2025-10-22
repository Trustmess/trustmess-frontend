import { Button } from '@components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

// Impoty styles
import '/src/scss/_pages/_welcome_page.scss';
// Import google material icons
import 'material-icons/iconfont/material-icons.css';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='welcome_page' id='welcomePage'>
      <div className='welcome_page_container'>
        <div className='welcome_page_title'>Right Messenger</div>
        {/* Theme switch */}
        <Button className={'btn change_theme_btn'} dataTheme={theme} onClick={toggleTheme}>
          <span className='material-icons'>{theme + '_mode'}</span>
        </Button>
        <Button className={'btn sign_up_btn'} onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
        <Button className={'btn log_in_btn'} onClick={() => navigate('/login')}>
          Log In
        </Button>
      </div>
    </div>
  );
};
