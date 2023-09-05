import React from "react";
import "../../styles/customcomponent.css";

const CustomStatus = (props) => {
  const { status, styles } = props;

  return <div className={styles}>{status}</div>;
};

export default CustomStatus;