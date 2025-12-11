import React from 'react';
import { ModalWrapper } from '@components';
import { Button } from '@components';

export const AccountSettings = ({ onConfir, onBack, onConfirmDelete, onCancel, className }) => {
  return (
    <div className={className}>
      <Button className=' btn btn_cancel' onClick={onCancel ?? onBack}>
        Cancel
      </Button>
      <Button className='btn btn_danger' onClick={onConfirmDelete}>
        Delete Account
      </Button>
    </div>
  );
};
