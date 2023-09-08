import React from 'react';
import "../../styles/prevbtn.css";

import { useNavigate } from 'react-router-dom';

const PreviousBTNComponent = ({ children }) => {
const navigate = useNavigate();

    const handleClick = () => {
        // window.location.href = route;
        navigate(-1);
    };
    return (
        <button onClick={handleClick}>{children}</button>
    );
};

export default PreviousBTNComponent;