import React from "react";
import "../../styles/customcomponent.css";

const CustomButton = (props) => {
  const { name, styles, EventHandler, disabled, inline, icon, iconStyle } = props;
  // console.log(disabled);

  return (
    // <div className="custom-button add-btn">
    //     <div className="addtxt-wrapper">
    //         <div className="addtxt">{name}</div>
    //     </div>
    // </div>
    <button
      className={styles}
      onClick={EventHandler}
      disabled={disabled}
      style={{ inline }}
    >
     {/* <img src={icon} alt="download" className={iconStyle}/> */}
     {
        icon?
          <span className={iconStyle}>{icon}</span>
        : <></>
      }
      {name}
    </button>
  );
};

export default CustomButton;
