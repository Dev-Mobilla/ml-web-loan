import React from "react";
import "../../../styles/successModal.css";

const SuccessModal = ({ hideModal, title, message }) => {
  return (
    <div className="modalBackground">
      <div className="success-modalContainer">
        <div className="modalTitle">
          <h1>{title}</h1>
        </div>
        <div className="modalBody">
          <p>
            {message}
          </p>
        </div>
        <div className="ok-close-btn">
          <button onClick={() => hideModal(false)}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
