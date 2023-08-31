import React from "react";
import "../styles/Personal-Details-Style.css";
import "../styles/PersonalDetailsFooter.css";

import { FooterComponent, TopbarComponent, PersonalDetailsHeaderComponent } from "./index";


const PersonalDetailsComponent = () => {
  return (
    <div className="personal-details">
      <div className="div">
        <TopbarComponent />
        <PersonalDetailsHeaderComponent />
        <div className="body">
          <div className="overlap1">
            <div className="contactdetailstxt">Contact Details</div>
            <input type="text" name="mobile_number" id="mobile_number" placeholder="Mobile Number" /><br />
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="overlap2">
            <div className="personal">Personal Details</div>

            <input type="text" name="first_name" placeholder="First Name" id="firstname" />
            <input type="text" name="last_name" placeholder="Last Name" />
            <input type="text" name="middle_name" placeholder="Middle Name" />
            <input type="text" name="birthdate" placeholder="Birthdate" /><br />
            <select id="nationality" name="nationality">
              <option disabled selected>Nationality</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="ph">Philippines</option>
            </select><br />
            <input type="text" name="civil-status" placeholder="Civil Status" />
            <input type="text" name="employeer-business_name" placeholder="Employer/Business Name" />
            <input type="text" name="nature-business" placeholder="Nature of Business" />
            <input type="text" name="tenure" placeholder="Length of Tenure" />
            <input type="text" name="office-address" placeholder="Office Address" />
            <input type="text" name="office-landline" placeholder="Office Landline" />
            <br />
            <select id="sourceOfIncome" name="sourceOfIncome">
              <option disabled selected>Source of income</option>
              <option value="employment">Employment</option>
              <option value="business">Business</option>
              <option value="investment">Investment</option>
              <option value="retirement">Retirement</option>
              <option value="other">Other</option>
            </select>
            <br />
            <input type="text" name="monthly-income" placeholder="Gross Monthly Income" />
          </div>
          <div className="overlap3">
            <div className="preferred-title">Preferred Branch</div>
            <div className="sub-preferred-title">Select a branch nearest you</div>
            <div className="radius-options">
              <label>
                <input type="radio" value="1">Danao 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<a href="#">see map</a>)</input>
              </label>
               
            </div>
          </div>
          <div className="prevpagebtn">
            <img
              className="arrow"
              alt="Arrow"
              src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e492714fd92dc35e55a22f/img/arrow-2-2@2x.png"
            />
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default PersonalDetailsComponent;