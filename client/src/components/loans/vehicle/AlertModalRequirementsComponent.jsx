import React, { useState, useEffect, useRef } from "react";
import "../../../styles/RequirementsAlertModal.css";

const AlertModalRequirementsComponent = ({ onClose }) => {
  const setShowModal = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    const modal = () => {
      setShowModal(false);
    };
    return () => {
      clearTimeout(modal);
    };
  }, []);

  return (
    <div className="ModalRequirementsBackground" onClick={onClose}>
      <div className="ModalRequirementsContainer" ref={modalRef}>
        <div className="body">
          <span>Please complete your requirements to finish application</span>
        </div>
        <div className="ModalRequirementsFooter">
          <button id="Ok-btn">OK</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModalRequirementsComponent;
