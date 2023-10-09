import React from "react";

const CustomInputField = ({
  inputType,
  inputStyle,
  inputOnchange,
  inputVal,
  inputPlaceholder,
  inputName
}) => {
  return (
    <input
      type={inputType}
      className={inputStyle}
      onChange={inputOnchange}
      value={inputVal}
      placeholder={inputPlaceholder}
      name={inputName}
    />
  );
};

export default CustomInputField;
