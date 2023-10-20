import React from "react";

const FeatureNotAvailableModalComponent = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body">
          <h1 className="modal-title">Feature Not Available</h1>
          <p className="modal-description">
            This feature is currently not available.
          </p>
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureNotAvailableModalComponent;
