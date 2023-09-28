import React from "react";
import "../../styles/customcomponent.css";

const CustomButton = (props) => {
  const {
    name,
    styles,
    EventHandler,
    disabled,
    inline,
    icon,
    iconStyle,
    btnType,
  } = props;
  // console.log(disabled);

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
      {/* <img src={icon} alt="download" className={iconStyle}/> */}
      {icon ? <span className={iconStyle}>{icon}</span> : <></>}
      {name}
    </button>
  );
};

export default CustomButton;
