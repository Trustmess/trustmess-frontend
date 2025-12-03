import React from 'react';
import ReactModal from 'react-modal';

export const ModalWrapper = ({
  isOpen,
  onRequestClose,
  title,
  children,
  shouldCloseOnOverlayClick = true,
  className = '',
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      overlayClassName='modal-overlay'
      className={`modal-content ${className}`}>
      {title && <h2 className='modal-title'>{title}</h2>}
      <div className='modal-body'>{children}</div>
    </ReactModal>
  );
};
