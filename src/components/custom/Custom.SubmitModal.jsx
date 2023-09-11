import React, { useState } from 'react'
import { CustomButton, CustomInput, CustomInputField } from '..';

const CustomSubmitModal = ({
  label,
  containerClass,
  wrapperClass,
  inputWrapperClass,
  labelClass,
  modalBtn,
  modalBtnWrapper,
  inptBtnWrapper,
  onclickHandler,
  inputType,
  placeHolder,
  inputValue
}) => {

  return (
    <div className={wrapperClass}>
      <div className={containerClass}>
        <label htmlFor="" className={labelClass}>{label}</label>
        <div className={inptBtnWrapper}>
          <div className={inputWrapperClass}>
            <CustomInputField inputType={inputType} inputVal={inputValue} inputPlaceholder={placeHolder}/>
            {/* <input type="text" placeholder={placeHolder} value={number} /> */}
          </div>
          <div className={modalBtnWrapper}>
            <CustomButton name="Continue" styles={modalBtn} EventHandler={onclickHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomSubmitModal;