import React, { useState, useEffect, useRef } from "react";
import QRCODE from "../../assets/images/mlwallet-qr-code.svg";
import downloadICON from "../../assets/icons/icon.png";

import "../../styles/QRmodal.css";

const QRModalComponent = ({ onClose }) => {
  const [showAlertModal, setShowAlertModal] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setShowAlertModal(false);
    }, 10000); // Show alert for 10 seconds

    const modal = () => {
      setShowModal(false);
    };

    return () => {
      clearTimeout(alertTimeout);
      clearTimeout(modal);
    };
  }, []);

  return (
    <div className="qr-modal">
      <div className="modalBackground" onClick={onClose}>
        {showAlertModal && (
          <div className="Alert">
            <img src={downloadICON} alt="Download Icon" />
            <span aria-hidden="true">Download Wallet Via QR Code Scanning</span>
          </div>
        )}
        <div className="modalContainer" ref={modalRef}>
          <div className="body">
            <img src={QRCODE} alt="QR_CODE" />
          </div>
          <div className="QRfooter">
            <p>Open QR reader or camera to open link</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModalComponent;
