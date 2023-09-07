import React, { useState, useEffect } from "react";
import "../styles/customerdetails.css";
import {
  TopbarComponent,
  CustomerDetailsHeader,
  CustomHeader,
  CustomPrevBtn,
} from "./index";

const CustomerDetailsComponent = () => {
  const [placeholder, setPlaceholder] = useState('Mobile Number');
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    function updatePlaceholder() {
      if (
        window.matchMedia("(min-width: 360px)").matches &&
        window.matchMedia("(max-width: 768px)").matches
      ) {
        setPlaceholder("+63 912 345 6789");
      } else {
        setPlaceholder("Mobile Number");
      }
    }

    window.addEventListener("resize", updatePlaceholder);
    updatePlaceholder();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updatePlaceholder);
    };
  }, []);
  return (
    <div className="customer-details">
      <div className="div">
        <TopbarComponent />
        <CustomHeader title="Personal Details" />
        {/* <CustomerDetailsHeader /> */}
        <div className="body">
          <div className="prev-btn">
            <CustomPrevBtn />
          </div>
          <div className="overlap1">
            <div className="contactdetailstxt"></div>
            <input
              type="text"
              name="mobile_number"
              id="mobile_number"
              placeholder={placeholder}
            />
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="overlap2">
            <div className="personal">Personal Details</div>

            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              id="firstname"
            />
            <input type="text" name="last_name" placeholder="Last Name" />
            <input type="text" name="middle_name" placeholder="Middle Name" />
            <input type="text" name="birthdate" placeholder="Birthdate" />
            <br />
            <select id="nationality" name="nationality">
              <option disabled>Nationality</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="ph">Philippines</option>
            </select>
            <br />
            <input type="text" name="civil-status" placeholder="Civil Status" />
            <input type="text" name="employeer-business_name" placeholder="Employer/Business Name" />
            <br />
            <select id="sourceOfIncome" name="nature-business">
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
            <input type="text" name="tenure" placeholder="Length of Tenure" />
            <input type="text" name="office-address" placeholder="Office Address" />
            <input type="text" name="office-landline" placeholder="Office Landline" />
            <input type="text" name="SourceOfIncome" placeholder="Source of Income" />
            <br />
            <input
              type="text"
              name="monthly-income"
              placeholder="Gross Monthly Income"
            />
          </div>
          <div className="overlap3">
            <div className="preferred-title">Preferred Branch</div>
            <div className="sub-preferred-title">Select a branch nearest you</div><br/>
            <input type="text" id="search_address" name="current_address" placeholder="Current Address" />
            <input type="submit" id="search-btn" value="Search"/>
            <div className="near_branch"><br />
              <label>
                <input
                  type="radio"
                  value="option1"
                  checked={selectedOption === 'option1'}
                  onChange={handleOptionChange}
                />
                Danao 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">(see map)</a><br />
              </label>

              <label>
                <input
                  type="radio"
                  value="option2"
                  checked={selectedOption === 'option2'}
                  onChange={handleOptionChange}
                />
                Danao 2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">(see map)</a><br />
              </label>

              <label>
                <input
                  type="radio"
                  value="option3"
                  checked={selectedOption === 'option3'}
                  onChange={handleOptionChange}
                />
                Sogod &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">(see map)</a><br />
              </label>
            </div>
          </div>
          <input type="submit" id="submit-btn"/>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsComponent;
