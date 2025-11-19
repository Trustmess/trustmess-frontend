import { Button } from '@components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

// Impoty styles
import '/src/scss/_pages/_welcome_page.scss';
// import react icons
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='welcome_page' id='welcomePage'>
      {/* Nav Line */}
      <nav className='nav_line' id='navLine'>
        {/* Theme switch  NEW REACT ICONS*/}
        <Button className={'btn change_theme_btn'} dataTheme={theme} onClick={toggleTheme}>
          {theme === 'dark' ? (
            <MdDarkMode className='theme_ico' />
          ) : (
            <MdLightMode className='theme_ico' />
          )}
        </Button>
      </nav>

      <div className='welcome_page_container'>
        <div className='welcome_page_title'>TrustMess</div>

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
