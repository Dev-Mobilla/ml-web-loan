import React from "react";

const LoadingComponent = () => {
  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: "50px",
  };

  const spinnerStyle = {
    width: "50px",
    height: "50px",
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}>
        <svg viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
            stroke="var(--red)"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0 100;100 100;100 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
};

export default LoadingComponent;
