import { Routes, Route } from 'react-router-dom';
import { WelcomePage, LogInPage, SignUpPage, MessengerPage } from '@pages';
// DEV IMPORTS
// import { DevPage } from '@pages';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/login' element={<LogInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route
        path='/messenger'
        element={
          <ProtectedRoute>
            <MessengerPage />
          </ProtectedRoute>
        }
      />
      {/* DEV PAGES */}
      {/* <Route path='/dev' element={<DevPage />} /> */}
    </Routes>
  );
};
