import React from "react";
import { CustomButton } from "..";

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
  inputValue,
  onInputChange,
  inputError
}) => {
  return (
    <div className={wrapperClass}>
      <div className={containerClass}>
        <div className={inptBtnWrapper}>
          <div className={inputWrapperClass}>
            <label htmlFor="" className={labelClass}>
              {label}
            </label>
            <p>
              {inputValue}
            </p>
          </div>
          <div className={modalBtnWrapper}>
            <CustomButton
              name="Continue"
              styles={modalBtn}
              EventHandler={onclickHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSubmitModal;
