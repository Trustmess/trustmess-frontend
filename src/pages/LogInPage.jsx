import { Button, LogInForm } from '@components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

// Import SCSS
import '/src/scss/_pages/_login_page.scss';
// import react icons
import { MdDarkMode, MdLightMode, MdArrowBackIos, MdArrowBackIosNew } from 'react-icons/md';

export const LogInPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='login_page' id='loginPage'>
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

      <LogInForm />

      {/* OLD ARROW BACK */}
      {/* <Button className={'btn back_btn'} onClick={() => navigate('/')}>
        <span className='material-icons'>arrow_back_ios_new</span>
      </Button> */}

      {/* NEW ARROW BACK */}
      <Button className={'btn back_btn'} onClick={() => navigate('/')}>
        <MdArrowBackIosNew className='material-icons' />
      </Button>
    </div>
  );
};
