import React, {useEffect, useState} from 'react'
import LoanDataComponent from '../vehicle/LoanDataComponent';
import HousingCardsComponent from './HousingCardsComponent';
import HousingRadiosComponent from './HousingRadiosComponent';
import CustomCardTitle from '../../custom/Custom.cardTitle';
import {CustomButton, CustomHeader, CustomInput, CustomPrevBtn, LoanSelection, TopbarComponent} from '../..';
import '../../../styles/housing.css';
import "../../../styles/loantypes.css";

import { useLocation, useNavigate } from 'react-router-dom'
const HousingRequiredInfoComponent = () => {
    const availableTerms = [1, 2, 3, 4, 5];
    const availablePercentages = [20, 30, 40, 50];
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const buttonClassName = isSubmitDisabled ? "btn-disabled" : "btn-enabled";
    const [housingLoanType, setHousingLoanType] = useState("A loan for a housing lot");

    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
      const isValid = housingLoanType !== "";
      setIsSubmitDisabled(!isValid)
    })

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
  
    const requiredInfo = [
      {
        name: 'A loan for a housing lot'
      },
      {
        name: 'A loan for a condominium unit'
      },
      {
        name: 'Refinancing for my property'
      }
      
    ]
  
    const OnKeydownPriceHandler = (event) => {
      const isNumberOrBackspace =
        /^[0-9]*\.?[0-9]*$/.test(event.key) || event.key === "Backspace";
  
      if (isNumberOrBackspace) {
        return;
      }
  
      event.preventDefault();
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        // localStorage.setItem("firstStep", JSON.stringify(firstStepDetails));
        
        navigate("/housing-loan/personal-details", {
          state: {
            firstStepDetails:housingLoanType,
            loantype: location.state.loantype
          },
        });
      };
    const selectedOption = (e) => {
        const value = e.target.value;
        setHousingLoanType(value);
    }

  return (
  
  <div className="housing-loan">
    <div className="housing-container">
        <TopbarComponent />
        <CustomHeader title="Housing Loan" />
        <div className="housing-content">
            <CustomPrevBtn />
   
            <HousingCardsComponent>
              <CustomCardTitle
                title={'Required Information'}
                styles={'custom-card-title'}
                subTitle={
                  <>
                    I want to get: <span style={{ color:'red' }}>*</span>
                  </>
                }
              />
                <HousingRadiosComponent 
                    radioVal={requiredInfo}
                    onSelected={selectedOption}
                    defaultVal={housingLoanType}
                />
                </HousingCardsComponent>
                <div className="computation-card">
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
  )
}

export default HousingRequiredInfoComponent;