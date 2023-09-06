import React, { useState } from "react";
import {
  CustomCardTitle,
  EmployedRequirementComponent,
  SelfEmployedRequirementComponent,
} from "../../../components";

const RequiredDocumentsComponent = () => {
  const [selectedOption, setSelectedOption] = useState("Employed");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="card">
      <CustomCardTitle
        title="Required Documents"
        styles="custom-card-title"
        subTitle="Note: All documents are required to be uploaded"
      />

      <div className="required-radio-buttons">
        <label>
          <input
            type="radio"
            value="Employed"
            checked={selectedOption === "Employed"}
            onChange={handleOptionChange}
          />
          Employed
        </label>
        <label>
          <input
            type="radio"
            value="SelfEmployed"
            checked={selectedOption === "SelfEmployed"}
            onChange={handleOptionChange}
          />
          Self-Employed
        </label>
      </div>

      {selectedOption === "Employed" ? (
        <EmployedRequirementComponent />
      ) : (
        <SelfEmployedRequirementComponent />
      )}
    </div>
  );
};

export default RequiredDocumentsComponent;
