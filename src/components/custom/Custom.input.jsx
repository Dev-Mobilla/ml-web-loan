import React from "react";
import "../../styles/customcomponent.css";

const InputGroup = ({ label, sublabel, styles, placeholder }) => {
  return (
    <div className="inputs">
      <div className="loan-input-wrapper">
        <input className={styles} placeholder={placeholder} />
      </div>
      <div className="labels">
      <div className="loan-input-label">{label}</div>
        <h6 className="loan-input-sublabel">{sublabel}</h6>
      </div>
    </div>
  );
};

export default InputGroup;
