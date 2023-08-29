import React from 'react';
import "../../styles/customcomponent.css";

const CustomButton = (props) => {

    const { name } = props;

    return (
        <div className="custom-button add-btn">
            <div className="addtxt-wrapper">
                <div className="addtxt">{name}</div>
            </div>
        </div>
    )
}

export default CustomButton;