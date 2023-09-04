import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../../styles/selection.css";
import { CustomCardTitle } from "../index";

const LoanTypeSelection = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [selectedType, setSelectedType] = useState(type);

  const selectType = (type) => {
    setSelectedType(type === selectedType ? "" : type);
    navigate(`/manage-loans/loan-type/${type}`);
  };

  return (
    <div className="loan-type">
      <CustomCardTitle title="Loan Type" styles="custom-card-title" />
      <div className="loan-type-selection">
        <div className="type" onClick={() => selectType("new")}>
          <div
            className={`loan-type-circle ${
              selectedType === "new" ? "selected" : ""
            }`}
          ></div>
          <div className="value">New</div>
        </div>
        <div className="type" onClick={() => selectType("second-hand")}>
          <div
            className={`loan-type-circle ${
              selectedType === "second-hand" ? "selected" : ""
            }`}
          ></div>
          <div className="value">Second Hand</div>
        </div>
        <div className="type" onClick={() => selectType("refinance")}>
          <div
            className={`loan-type-circle ${
              selectedType === "refinance" ? "selected" : ""
            }`}
          ></div>
          <div className="value">Refinance</div>
        </div>
      </div>
    </div>
  );
};

export default LoanTypeSelection;
