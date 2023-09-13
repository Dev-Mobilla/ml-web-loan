import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/customerdetails.css";
import {
  TopbarComponent,
  CustomHeader,
  CustomPrevBtn,
  CustomButton,
  CustomCardTitle,
  PersonalContactComponent,
  PersonalInformationComponent,
} from "./index";

const CustomerDetailsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { type, selectedVehicle, vehicleDetails } = location.state || {};

  const [contactDetails, setContactDetails] = useState({
    mobile_number: "",
    email: "",
  });

  const [informationDetails, setInformationDetails] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    birthdate: "",
    nationality: "",
    civil_status: "",
    employeer_business_name: "",
    tenure: "",
    office_address: "",
    office_landline: "",
    sourceOfIncome: "",
    monthly_income: "",
  });

  useEffect(() => {
    const isValid =
      contactDetails.mobile_number.trim() !== "" &&
      contactDetails.email.trim() !== "";
    setIsSubmitDisabled(!isValid);
  }, [contactDetails]);

  const handleValidationChange = (isValid) => {
    setIsSubmitDisabled(!isValid);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const secondStepDetails = {
      loanType: type,
      selectedVehicle: selectedVehicle,
      vehicleDetails: vehicleDetails,
      personalDetails: [contactDetails, informationDetails],
    };

    localStorage.setItem("SecondStepDetails", JSON.stringify(secondStepDetails));

    navigate("/vehicle-loan/requirements");
  };

  const handleContactDetailsChange = (newContactDetails) => {
    setContactDetails(newContactDetails);
  };

  const handleInformationDetailsChange = (newInformationDetails) => {
    setInformationDetails(newInformationDetails);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const buttonClassName = isSubmitDisabled ? "btn-disabled" : "btn-enabled";

  return (
    <div className="customer-details">
      <div className="customer-details-container">
        <TopbarComponent />
        <CustomHeader title="Personal Details" />
        <div className="customer-details-content">
          <CustomPrevBtn />
          <form onSubmit={handleFormSubmit}>
            <div className="card">
              <CustomCardTitle
                title="Contact Details"
                styles="custom-card-title"
              />
              <div className="customer-details-group">
                <PersonalContactComponent
                  onContactDetailsChange={handleContactDetailsChange}
                  onValidationChange={handleValidationChange}
                />
              </div>
            </div>

            <div className="card">
              <CustomCardTitle
                title="Personal Details"
                styles="custom-card-title"
              />
              <div className="customer-details-group">
                <PersonalInformationComponent
                  onInformationDetailsChange={handleInformationDetailsChange}
                  onValidationChange={handleValidationChange}
                />
              </div>
            </div>
            <div className="card">
              <CustomCardTitle
                title="Preferred Branch"
                subTitle="Select a branch nearest to you"
                styles="custom-card-title"
              />
              <div className="search-address-bar">
                <input type="text" id="search_address" name="current_address" placeholder="Current Address" />
                <input type="submit" id="search-btn" value="Search" />
              </div>
              <div className="customer-details-group">
                <div className="near-branch">
                  <div className="c-details-radio">
                    <input
                      type="radio"
                      value="option1"
                      checked={selectedOption === "option1"}
                      onChange={handleOptionChange}
                    />
                  </div>
                  <div className="c-details-address">Danao 1</div>
                  <div className="c-details-map">
                    <a href="#">(see map)</a>
                  </div>
                </div>
                <div className="near-branch">
                  <div className="c-details-radio">
                    <input
                      type="radio"
                      value="option2"
                      checked={selectedOption === "option2"}
                      onChange={handleOptionChange}
                    />
                  </div>
                  <div className="c-details-address">Danao 2 </div>
                  <div className="c-details-map">
                    <a href="#">(see map)</a>
                  </div>
                </div>
                <div className="near-branch">
                  <div className="c-details-radio">
                    <input
                      type="radio"
                      value="option3"
                      checked={selectedOption === "option3"}
                      onChange={handleOptionChange}
                    />
                  </div>
                  <div className="c-details-address">Sogod</div>
                  <div className="c-details-map">
                    <a href="#">(see map)</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="apply-btn">
              <CustomButton
                type="submit"
                name="Submit"
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

export default CustomerDetailsComponent;
