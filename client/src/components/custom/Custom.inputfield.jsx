import React from "react";

const CustomInputField = ({
  inputType,
  inputStyle,
  inputOnchange,
  inputVal,
  inputPlaceholder,
  inputName,
  onKeyDownHandler,
  readOnly
}) => {
  return (
    <input
      type={inputType}
      className={inputStyle}
      onChange={inputOnchange}
      value={inputVal}
      placeholder={inputPlaceholder}
      name={inputName}
      onKeyDown={onKeyDownHandler}
      readOnly={readOnly}
    />
  );
};

export default CustomInputField;
