import React, { useEffect, useState } from "react";

const CustomMessage = (props) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setShowMessage(false);
  };

  const customMessageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: showMessage ? 1 : 0,
    pointerEvents: showMessage ? "initial" : "none",
    transition: "opacity 0.3s ease",
  };

  const customMessageCardStyle = {
    backgroundColor: "var(--white)",
    border: "1px solid grey",
    width: "800px",
    padding: "20px",
    borderRadius: "var(--radius)",
  };

  const customMessageTitleStyle = {
    textAlign: "start",
    color: "rgb(0, 173, 0)",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const customMessageTextStyle = {
    fontSize: "16px",
    lineHeight: "22px",
  };

  const customMessageButtonContainerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const customMessageButtonStyle = {
    marginTop: "20px",
    padding: "8px 16px",
    backgroundColor: "var(--red)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius)",
    cursor: "pointer",
  };

  const mediaQuery480px = {
    width: "90%",
    maxWidth: "360px",
  };

  const mediaQuery768px = {
    width: "90%",
    maxWidth: "480px",
  };

  const mediaQuery1024px = {
    width: "90%",
    maxWidth: "768px",
  };

  const mediaQuery1200px = {
    width: "90%",
    maxWidth: "1024px",
  };

  const mediaQuery1201px = {
    width: "90%",
    maxWidth: "1200px",
  };

  return (
    <div style={customMessageStyle}>
      <div
        style={{
          ...customMessageCardStyle,
          ...mediaQuery480px,
          ...mediaQuery768px,
          ...mediaQuery1024px,
          ...mediaQuery1200px,
          ...mediaQuery1201px,
        }}
      >
        <h1 style={customMessageTitleStyle}>{props.title}</h1>
        <p style={customMessageTextStyle}>{props.text}</p>
        <div style={customMessageButtonContainerStyle}>
          <button style={customMessageButtonStyle} onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomMessage;
