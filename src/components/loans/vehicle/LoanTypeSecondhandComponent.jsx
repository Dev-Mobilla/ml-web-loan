import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "../../../styles/loantypes.css";
import {
  CustomButton,
  CustomCardTitle,
  CustomInput,
  LoanSelection,
  VehicleSecondHandDetailsComponent,
  LoanDataComponent,
} from "../..";

const LoanTypeSecondHandComponent = () => {
  const { type } = useParams();
  const availableTerms = [1, 2, 3];
  const availablePercentages = [30, 40, 50];
  const availableVehicles = [
    "Car/Pickup/SUV",
    "Motorcycle",
    "Truck/Commercial",
  ];

  const {
    setLoanAmount,
    estimatedVehiclePrice,
    setEstimatedVehiclePrice,
    downPayment,
    setDownPayment,
    selectedTerm,
    selectTerm,
    selectedPercentage,
    selectPercentage,
    selectedVehicle,
    selectVehicle,
    monthlyPayment,
  } = LoanDataComponent(3, 50);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleValidationChange = (isValid) => {
    setIsSubmitDisabled(!isValid);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const buttonClassName = isSubmitDisabled ? "btn-disabled" : "btn-enabled";

  return (
    <div className="loan-type">
      <div className="second-hand-container">
        <div className="second-hand-content">
          <div className="card">
            <CustomCardTitle
              title="Sample Computation"
              styles="custom-card-title"
            />
            <div className="loan-content">
              <CustomInput
                styles="loan-ammount"
                label="Estimated Vehicle Price"
                placeholder="1,000,000.00"
                value={estimatedVehiclePrice}
                onChange={(e) => setEstimatedVehiclePrice(e.target.value)}
              />
              <CustomInput
                styles="loan-amount disable-data"
                label="Downpayment"
                placeholder="300,000.00"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                disabled
              />
              <div className="second-hand-percent">
                <LoanSelection
                  availableOptions={availablePercentages}
                  selectedOption={selectedPercentage}
                  onSelect={selectPercentage}
                  containerClassName="percentage-selection"
                  circleClassName="percentage-circle"
                  valueClassName="value"
                  subOption="%"
                />
              </div>
              <CustomInput
                styles="loan-amount disable-data"
                label="Loan Ammount"
                placeholder="700,000.00"
                onChange={(e) => setLoanAmount(parseFloat(e))}
                disabled
              />
              <LoanSelection
                loanType={type}
                availableOptions={availableTerms}
                selectedOption={selectedTerm}
                onSelect={selectTerm}
                label="Term (yrs.)"
                containerClassName="loan-term-selection"
                circleClassName="term-circle"
                valueClassName="value"
              />
              <CustomInput
                styles="labels disable-data"
                label="Monthly Payment"
                sublabel="* Subject to Approval & Appraisal"
                placeholder="35,000.00"
                value={monthlyPayment}
                disabled
              />
            </div>
          </div>
          <div className="card">
            <CustomCardTitle
              title="Vehicle Details"
              styles="custom-card-title"
            />
            <div className="loan-content">
              <LoanSelection
                loanType={type}
                availableOptions={availableVehicles}
                selectedOption={selectedVehicle}
                onSelect={selectVehicle}
                containerClassName="loan-vehicle-selection"
                circleClassName="vehicle-circle"
                valueClassName="value"
              />
              <form onSubmit={handleFormSubmit}>
                <VehicleSecondHandDetailsComponent
                  onValidationChange={handleValidationChange}
                />
              </form>
            </div>
          </div>
          <div className="apply-btn">
            <CustomButton
              type="submit"
              name="Apply Online"
              styles={buttonClassName}
              disabled={isSubmitDisabled}
            ></CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanTypeSecondHandComponent;
