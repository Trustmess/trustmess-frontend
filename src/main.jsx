import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@contexts/ThemeContext';
import './scss/style.scss';
import { AuthProvider } from './contexts/AuthContext';
import { WebSocketProvider } from './contexts/WebSocketContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <ThemeProvider>
        <AuthProvider>
          <WebSocketProvider>
            <App />
          </WebSocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
