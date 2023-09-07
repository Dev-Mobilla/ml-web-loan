import React, { useState } from "react";
import "../styles/customerdetails.css";
import {
  TopbarComponent,
  CustomHeader,
  CustomPrevBtn,
  CustomButton,
  CustomCardTitle,
} from "./index";

const CustomerDetailsComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="customer-details">
      <div className="customer-details-container">
        <TopbarComponent />
        <CustomHeader title="Personal Details" />
        <div className="customer-details-content">
          <CustomPrevBtn />
          <div className="card">
            <CustomCardTitle
              title="Contact Details"
              styles="custom-card-title"
            />
            <div className="customer-details-group">
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="mobile_number"
                  id="mobile_number"
                  placeholder="Mobile Number"
                />
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <CustomCardTitle
              title="Personal Details"
              styles="custom-card-title"
            />
            <div className="customer-details-group">
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  id="firstname"
                />
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                />
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="middle_name"
                  placeholder="Middle Name"
                />
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="birthdate"
                  placeholder="Birthdate"
                />
              </div>
              <div className="c-details-input">
                <select className="d-select" id="nationality" name="nationality">
                  <option disabled>Nationality</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                  <option value="ph">Philippines</option>
                </select>
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="civil-status"
                  placeholder="Civil Status"
                />
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="employeer-business_name"
                  placeholder="Employer/Business Name"
                />
              </div>
              <div className="c-details-input">
                <select className="d-select" id="sourceOfIncome" name="nature-business">
                  <option disabled>Nature of Business</option>
                  <option value="employment">Agriculture and Farming</option>
                  <option value="business">Food and Beverage</option>
                  <option value="investment">Retail</option>
                  <option value="retirement">Manufacturing</option>
                  <option value="CandE">Construction and Engineering</option>
                  <option value="PS">Professional Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="HandT">Hospitality and Tourism</option>
                  <option value="IT">Information Technology</option>
                  <option value="EandT">Education and Training</option>
                  <option value="FS">Financial Services</option>
                  <option value="RS">Real Estate</option>
                  <option value="EandU">Energy and Utilities</option>
                  <option value="TandL">Transportation and Logistics</option>
                  <option value="EandM">Entertainment and Media</option>
                </select>
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="tenure"
                  placeholder="Length of Tenure"
                />
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="office-address"
                  placeholder="Office Address"
                />
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="office-landline"
                  placeholder="Office Landline"
                />
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="SourceOfIncome"
                  placeholder="Source of Income"
                />
              </div>
              <div className="c-details-input">
                <input
                  className="d-input"
                  type="text"
                  name="monthly-income"
                  placeholder="Gross Monthly Income"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <CustomCardTitle
              title="Preffered Branch"
              subTitle="Select a branch nearest to you"
              styles="custom-card-title"
            />
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
              styles="btn"
            ></CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsComponent;
