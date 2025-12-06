// src/components/DeleteAccountModal.jsx
import React from 'react';
import { ModalWrapper } from '@components';

// import { deleteUser } from '/src/api/requests';

export const DeleteAccountModal = ({ isOpen, onRequestClose, onConfirm, username }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title='Deleting an account'
      shouldCloseOnOverlayClick={false}>
      <p>
        You are sure want delete account <strong>{username}</strong>? This action is irreversible.
      </p>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
        <button onClick={onRequestClose} className='btn-outline'>
          Cancel
        </button>
        <button onClick={onConfirm} className='btn-danger' style={{ marginLeft: 8 }}>
          Delete
        </button>
      </div>
    </ModalWrapper>
  );
};
