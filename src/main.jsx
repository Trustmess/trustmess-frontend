import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import ReactModal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@contexts/ThemeContext';
import './scss/style.scss';
import { AuthProvider } from './contexts/AuthContext';
import { WebSocketProvider } from './contexts/WebSocketContext';

ReactModal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <AuthProvider>
        <ThemeProvider>
          <WebSocketProvider>
            <App />
          </WebSocketProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
