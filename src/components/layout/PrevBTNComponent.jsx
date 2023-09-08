import React from 'react';
import "../../styles/prevbtn.css";

const PreviousBTNComponent = ({ route, children }) => {
    const handleClick = () => {
        window.location.href = route;
    };
    return (
        <button onClick={handleClick}>{children}</button>
    );
};

export default PreviousBTNComponent;