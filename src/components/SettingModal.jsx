// src/components/DeleteAccountModal.jsx
import React from 'react';
import { useState } from 'react';
import { useAuth } from '/src/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { Button, AccountSettings, ModalWrapper } from '@components';
import { deleteUser } from '/src/api/requests';

import { useTheme } from '@contexts/ThemeContext';
import { MdDarkMode, MdLightMode, MdArrowBackIosNew, MdOutlineSettings } from 'react-icons/md';

export const SettingtModal = ({ isOpen, onRequestClose, username }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [view, setView] = useState('settings'); // 'settings' | 'account'
  const navigate = useNavigate();

  const handleClose = () => {
    setView('settings');
    onRequestClose();
  };

  // Handle acount delete
  const handleConfirmDelete = async () => {
    try {
      const responce = await deleteUser(user.username);
      logout();
      navigate('/');
    } catch (err) {
      console.error('Delete account error:', err);
      alert('Failed to delete account');
    } finally {
      handleClose();
    }
  };

  return (
    <ModalWrapper
      className='modal_window'
      isOpen={isOpen}
      onRequestClose={handleClose}
      title='Settings '
      shouldCloseOnOverlayClick={false}>
      {view === 'settings' ? (
        <>
          {/* Btn Back */}
          <Button className={'btn change_theme_btn'} onClick={onRequestClose}>
            <MdArrowBackIosNew className='material-icons' />
          </Button>

          {/* Theme switch */}
          <Button className={'btn change_theme_btn'} dataTheme={theme} onClick={toggleTheme}>
            {theme === 'dark' ? (
              <MdDarkMode className='theme_ico' />
            ) : (
              <MdLightMode className='theme_ico' />
            )}
          </Button>

          {/* Acount setting */}
          <Button
            className={'btn btn_account_settings'}
            dataTheme={theme}
            onClick={() => setView('account')}>
            Account Settings
          </Button>

          {/* Log out */}
          <Button
            className={'btn btn_log_out'}
            onClick={() => {
              logout();
              navigate('/');
            }}>
            Log out
          </Button>
        </>
      ) : (
        <>
          <AccountSettings
            className='account_settings_component'
            onBack={() => setView('settings')}
            onCancel={() => setView('settings')}
            onConfirmDelete={handleConfirmDelete}
          />
        </>
      )}
    </ModalWrapper>
  );
};
