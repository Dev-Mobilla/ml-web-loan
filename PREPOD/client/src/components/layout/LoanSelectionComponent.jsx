import React from "react";
import "../../styles/selection.css";

const LoanSelection = ({
  label,
  subOption,
  availableOptions,
  selectedOption,
  onSelect,
  containerClassName,
  circleClassName,
  valueClassName,
}) => {
  return (
    <div className={containerClassName}>
      <div className="content-header">
        <div className="input-label">{label}</div>
        <div className="main-content">
          {availableOptions.map((option) => (
            <div
              key={option}
              className={`${circleClassName} ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => onSelect(option)}
            >
              <div className={valueClassName}>
                {option}
                {subOption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanSelection;
