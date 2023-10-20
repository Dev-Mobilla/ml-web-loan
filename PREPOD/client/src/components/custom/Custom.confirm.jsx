import React from 'react'
import CustomButton from './Custom.button';
import '../../styles/customcomponent.css';

const CustomConfirmation = ({ title, message, onClose, onConfirm, confirmBtn }) => {
  return (
    <div className="custom-confirm modal">
      <div className="modal-content">
        <div className="modal-body">
          <p className="modal-title">{title}</p>
          <p className="modal-description">
            {message}
          </p>
          <div className="modal-actions">
            <CustomButton
              name=" Cancel"
              styles="confirmation-cancel-btn"
              EventHandler={onClose}
            />
            <CustomButton
              name={confirmBtn}
              styles="confirmation-btn"
              EventHandler={onConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomConfirmation