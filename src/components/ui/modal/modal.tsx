import React, { useState } from 'react';
import styles from './modal.module.css';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div >
          <h2 className={styles.modalTitle}>{title}</h2>
          <div className={styles.modalBody}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
