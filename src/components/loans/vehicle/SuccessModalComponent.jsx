import React from 'react';
import "../../../styles/successModal.css";

const SuccessModal = ({closeModal}) => {
  return (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="modalTitle">
                <h1>We have received your application</h1>
            </div>
            <div className="modalBody">
                <p>Our ML Loans Team will be reviewing the information submitted. You will receive a message
                from us in 3-5 business days.</p>
            </div>
            <div className="ok-close-btn">
                <button onClick={() => closeModal(false)}>Ok</button>
            </div>
        </div>

    </div>
    
  )
}

export default SuccessModal