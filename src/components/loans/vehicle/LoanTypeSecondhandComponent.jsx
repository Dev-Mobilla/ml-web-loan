import React from "react";
import { useParams } from "react-router-dom";

import "../../../styles/loantypes.css";
import {
  CustomButton,
  CustomCardTitle,
  CustomInput,
  LoanSelection,
  SecondHandVehicleForm,
  LoanDataComponent,
} from "../../../components";

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
    // loanAmount,
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
    formData,
    // setFormData,
    handleSubmit,
    handleChange,
  } = LoanDataComponent(3, 50);

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
                styles="loan-amount"
                label="Downpayment"
                placeholder="300,000.00"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
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
                styles="loan-amount"
                label="Loan Ammount"
                placeholder="700,000.00"
                onChange={(value) => setLoanAmount(parseFloat(value))}
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
                styles="labels"
                label="Monthly Payment"
                sublabel="* Subject to Approval & Appraisal"
                placeholder="35,000.00"
                value={monthlyPayment}
                readOnly
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
              <form onSubmit={handleSubmit}>
                <SecondHandVehicleForm
                  formData={formData}
                  handleChange={handleChange}
                />
              </form>
            </div>
          </div>
          <div className="apply-btn">
            <CustomButton
              type="submit"
              name="Apply Online"
              styles="btn"
            ></CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanTypeSecondHandComponent;
