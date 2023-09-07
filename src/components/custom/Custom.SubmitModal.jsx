import React, { useState } from 'react'
import { CustomButton, CustomInput } from '..';
import { numbers } from './../../utils/ExistingNumbers';
import {
  OTPModalComponent,
  AlertModalComponent
}
  from "../index";

const CustomSubmitModal = ({
  mobileNumber,
  containerClass,
  wrapperClass,
  inputWrapperClass,
  labelClass,
  modalBtn,
  modalBtnWrapper,
  inptBtnWrapper,
  placeHolder
}) => {


  const [number, setNumber] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  
  const handleModalAlertClose = () => {
    setShowAlertModal(false);
  };


  const handleButtonClick = () => {
    if (numbers.includes(Number(number))) {
      setShowOTPModal(true);
    } else {
      setShowAlertModal(true);
    }
  };


  return (
    <div className={wrapperClass}>
      <div className={containerClass}>
        <label htmlFor="" className={labelClass}>{mobileNumber}</label>
        <div className={inptBtnWrapper}>
          <div className={inputWrapperClass}>
            <input type="text" placeholder={placeHolder} value={number} onChange={(e) => setNumber(e.target.value)} />
          </div>
          <div className={modalBtnWrapper}>
            <CustomButton name="Continue" styles={modalBtn} EventHandler={handleButtonClick} />
          </div>
        </div>
      </div>
      {
        showOTPModal ?
          <OTPModalComponent time="58" />
          : <></>
      }
      {
        showAlertModal ?
          <AlertModalComponent onClose={handleModalAlertClose} />
          : <></>
      }
    </div>
  )
}

export default CustomSubmitModal;