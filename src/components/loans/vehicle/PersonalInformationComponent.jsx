import React, { useState, useEffect } from "react";

const PersonalInformationComponent = ({
  onValidationChange,
  onInformationDetailsChange,
}) => {
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
      informationDetails.firstname.trim() !== "" &&
      informationDetails.lastname.trim() !== "" &&
      informationDetails.birthdate.trim() !== "" &&
      informationDetails.nationality.trim() !== "" &&
      informationDetails.civil_status.trim() !== "" &&
      informationDetails.employeer_business_name.trim() !== "" &&
      informationDetails.tenure.trim() !== "" &&
      informationDetails.office_address.trim() !== "" &&
      informationDetails.office_landline.trim() !== "" &&
      informationDetails.sourceOfIncome.trim() !== "" &&
      informationDetails.monthly_income.trim() !== "";
    onValidationChange(isValid);

    onInformationDetailsChange(informationDetails);
  }, [informationDetails, onValidationChange, onInformationDetailsChange]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInformationDetails({ ...informationDetails, [name]: value });
  };

  return (
    <div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="firstname"
          placeholder="First Name"
          id="firstname"
          value={informationDetails.firstname}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={informationDetails.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="middlename"
          placeholder="Middle Name (Optional)"
          value={informationDetails.middlename}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="birthdate"
          placeholder="Birthdate"
          value={informationDetails.birthdate}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <select
          className="d-select"
          id="nationality"
          name="nationality"
          value={informationDetails.nationality}
          onChange={handleInputChange}
        >
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
          name="civil_status"
          placeholder="Civil Status"
          value={informationDetails.civil_status}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="employeer_business_name"
          placeholder="Employer/Business Name"
          value={informationDetails.employeer_business_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <select
          className="d-select"
          id="sourceOfIncome"
          name="nature_business"
          value={informationDetails.nature_business}
          onChange={handleInputChange}
        >
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
          value={informationDetails.tenure}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="office_address"
          placeholder="Office Address"
          value={informationDetails.office_address}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="office_landline"
          placeholder="Office Landline"
          value={informationDetails.office_landline}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="sourceOfIncome"
          placeholder="Source of Income"
          value={informationDetails.sourceOfIncome}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="monthly_income"
          placeholder="Gross Monthly Income"
          value={informationDetails.monthly_income}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default PersonalInformationComponent;
