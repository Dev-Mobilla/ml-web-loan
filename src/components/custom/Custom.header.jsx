import React from "react";
import "../../styles/customcomponent.css";

const CustomHeader = (props) => {
  const { title } = props;

  return (

    <header className="custom-header header">
      <div className="overlap">
        <div className="text-wrapper">{title}</div>
      </div>
    </header>
  );
};

export default CustomHeader;