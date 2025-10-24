import { Routes, Route } from 'react-router-dom';
import { WelcomePage, LogInPage, SignUpPage, MainPage } from '@pages';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/login' element={<LogInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/main' element={<MainPage/>}   />
    </Routes>
  );
};
