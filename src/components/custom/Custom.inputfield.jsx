import React from 'react'

const CustomInputField = ({ inputType, inputStyle, inputOnchange, inputVal, inputPlaceholder }) => {

  return <input type={inputType} className={inputStyle} onChange={inputOnchange} value={inputVal} placeholder={inputPlaceholder}/>
  
}

export default CustomInputField;