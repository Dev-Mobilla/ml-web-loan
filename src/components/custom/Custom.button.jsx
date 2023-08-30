import React from 'react';
import "../../styles/customcomponent.css";

const CustomButton = (props) => {

    const { name, styles } = props;

    return (
        // <div className="custom-button add-btn">
        //     <div className="addtxt-wrapper">
        //         <div className="addtxt">{name}</div>
        //     </div>
        // </div>
        <button className={styles}>
            {name}
        </button>
        
    )
}

export default CustomButton;