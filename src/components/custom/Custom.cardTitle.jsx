import React from "react";
import "../../styles/customcomponent.css";

const CustomCardTitle = (props) => {
  const { title, styles } = props;

  return <div className={styles}>{title}</div>;
};

export default CustomCardTitle;
