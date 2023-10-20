import React, { useEffect, useState } from "react";
import {
  CustomCardTitle,
  EmployedRequirementComponent,
  SelfEmployedRequirementComponent,
} from "../../../components";

const RequiredDocumentsComponent = ({ 
  OnOptionChange,
  validId,
  employeeCert,
  paySlip,
  mayorCert,
  bankStatement
}) => {
  const [selectedOption, setSelectedOption] = useState("Employed");

  useEffect(() => {
    OnOptionChange(selectedOption);
  },[selectedOption])

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
        <label htmlFor="Employed">
          <input
            type="radio"
            value="Employed"
            checked={selectedOption === "Employed"}
            onChange={handleOptionChange}
          />
          Employed
        </label>
        <label htmlFor="Self-Employed">
          <input
            type="radio"
            value="Self-Employed"
            checked={selectedOption === "Self-Employed"}
            onChange={handleOptionChange}
          />
          Self-Employed
        </label>
      </div>

      {selectedOption === "Employed" ? (
        <EmployedRequirementComponent validId={validId} employeeCert={employeeCert} paySlip={paySlip}/>
      ) : (
        <SelfEmployedRequirementComponent validId={validId} mayorCert={mayorCert} bankStatement={bankStatement}/>
      )}
    </div>
  );
};

export default RequiredDocumentsComponent;
