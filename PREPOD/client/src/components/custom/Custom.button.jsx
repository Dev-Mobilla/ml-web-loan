import React from "react";
import "../../styles/customcomponent.css";

const CustomButton = ({ 
  name,
  styles,
  EventHandler,
  disabled,
  inline,
  icon,
  iconStyle,
  btnType }) => {

  const handleClick = () => {
    if (!disabled && EventHandler) {
      EventHandler();
    }
  };

  return (
    <button
      className={styles}
      onClick={handleClick}
      disabled={disabled}
      style={{ inline }}
      type={btnType}
    >
      {icon ? <span className={iconStyle}>{icon}</span> : null}
      {name}
    </button>
  );
};

export default CustomButton;
