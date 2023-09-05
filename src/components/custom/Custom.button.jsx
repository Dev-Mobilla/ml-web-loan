import React from "react";
import "../../styles/customcomponent.css";

const CustomButton = (props) => {
  const { name, styles } = props;

  return <button className={styles}>{name}</button>;
};

export default CustomButton;
