import React from "react";
import "../../styles/customcomponent.css";

const CustomCardTitle = (props) => {
  const { title, subTitle, styles } = props;

  return (
    <div className="content">
      <div className={`custom-card-title ${styles}`}>
        {title}
        {subTitle && <span className="custom-card-subtitle">{subTitle}</span>}
      </div>
    </div>
  );
};

export default CustomCardTitle;
