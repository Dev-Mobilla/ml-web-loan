import React, { useState, useEffect, useRef } from 'react';
import '../../styles/AlertModalComponent.css';

const AlertModalComponent = ({ onClose }) => {
    const [showModal, setShowModal] = useState(false);
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
        <div>
            <div className="alertbackground" onClick={onClose}>
                <div className="alertcontainer" ref={modalRef}>
                    <div className="body">
                        <span>You have no existing loan at the moment</span>
                    </div>
                    <div className="AlertFooter">
                        <button id='Ok-btn' onClick={onClose}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertModalComponent;