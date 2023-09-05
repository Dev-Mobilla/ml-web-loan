import React from 'react'
import {CustomButton, CustomInput} from '..';

const CustomSubmitModal = ({ 
  mobileNumber, 
  containerClass, 
  wrapperClass, 
  inputWrapperClass, 
  labelClass,
  modalBtn,
  modalBtnWrapper,
inptBtnWrapper,
placeHolder,
onclickHandler}) => {

  return (
    <div className={wrapperClass}>
        <div className={containerClass}>
          <label htmlFor="" className={labelClass}>{mobileNumber}</label>
          <div className={inptBtnWrapper}>
            <div className={inputWrapperClass}>
              <input type="text" placeholder={placeHolder}/>
            </div>
            <div className={modalBtnWrapper}>
              <CustomButton name="Continue" styles={modalBtn} EventHandler={onclickHandler}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CustomSubmitModal;