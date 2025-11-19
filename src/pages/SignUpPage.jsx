import { Button, SignUpForm } from '@components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

// Import SCSS
import '/src/scss/_pages//_signup_page.scss';
// import react icons
import { MdDarkMode, MdLightMode, MdArrowBackIosNew } from 'react-icons/md';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='signup_page' id='signupPage'>
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

      <SignUpForm />

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
