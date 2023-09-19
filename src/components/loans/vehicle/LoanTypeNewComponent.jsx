import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../../../styles/loantypes.css";
import {
  CustomButton,
  CustomCardTitle,
  CustomInput,
  LoanSelection,
  VehicleNewDetailsComponent,
  LoanDataComponent,
} from "../..";

const LoanTypeNewComponent = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const availableTerms = [1, 2, 3, 4, 5];
  const availablePercentages = [20, 30, 40, 50];
  const availableVehicles = [
    "Car/Pickup/SUV",
    "Motorcycle",
    "Truck/Commercial",
  ];

  const {
    loanAmount,
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
    setMonthlyPayment,
  } = LoanDataComponent(3, 20);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    variant: "",
  });

  const handleValidationChange = (isValid) => {
    setIsSubmitDisabled(!isValid);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const firstStepDetails = {
      type: type,
      selectedVehicle: selectedVehicle,
      ...vehicleDetails,
    };

    // localStorage.setItem("firstStep", JSON.stringify(firstStepDetails));

    navigate("/vehicle-loan/personal-details", {
      state: {
        firstStepDetails: firstStepDetails,
      },
    });
  };

  const handleVehicleDetailsChange = (newVehicleDetails) => {
    setVehicleDetails(newVehicleDetails);
  };

  const OnKeydownPriceHandler = (event) => {
    const isNumberOrBackspace =
      /^[0-9]*\.?[0-9]*$/.test(event.key) || event.key === "Backspace";

    if (isNumberOrBackspace) {
      return;
    }

    event.preventDefault();
  };

  const buttonClassName = isSubmitDisabled ? "btn-disabled" : "btn-enabled";

  return (
    <div className="loan-type new-loan">
      <div className="new-loan-container">
        <div className="new-loan-content">
          <div className="card">
            <CustomCardTitle
              title="Sample Computation"
              styles="custom-card-title"
            />
            <div className="loan-content">
              <CustomInput
                styles="loan-ammount"
                label="Estimated Vehicle Price"
                placeholder="0.00"
                inputVal={estimatedVehiclePrice}
                onChangeHandler={(e) =>
                  setEstimatedVehiclePrice(e.target.value)
                }
                onKeyDownHandler={OnKeydownPriceHandler}
              />
              <CustomInput
                styles="loan-amount disable-data"
                label="Downpayment"
                placeholder="0.00"
                inputVal={downPayment}
                onChangeHandler={(e) => setDownPayment(e.target.value)}
                disabled
              />
              <div className="new-loan-percent">
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
                placeholder="0.00"
                onChangeHandler={(e) => setLoanAmount(parseFloat(e))}
                inputVal={loanAmount}
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
                placeholder="0.00"
                inputVal={monthlyPayment}
                onChangeHandler={(e) => setMonthlyPayment(parseFloat(e))}
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

              <VehicleNewDetailsComponent
                onValidationChange={handleValidationChange}
                onVehicleDetailsChange={handleVehicleDetailsChange}
              />
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="apply-btn">
              <CustomButton
                type="submit"
                name="Apply Online"
                styles={buttonClassName}
                disabled={isSubmitDisabled}
              ></CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanTypeNewComponent;
