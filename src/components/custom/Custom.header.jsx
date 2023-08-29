import React from 'react';
import "../../styles/customcomponent.css";

const CustomHeader = (props) => {
    const { title } = props;

  return (
    <header className="custom-header header">
        <div className="overlap-5">
            <div className="text-wrapper-3">{title}</div>
        </div>
    </header>
  )
}

export default CustomHeader;