import React, { useState, useEffect } from "react";
import { GetCountries, GetProvinces, GetCities } from "../../../api/symph.api";
import { LoadingComponent } from "../../index";

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
    employeer_business: "",
    nature_business: "",
    tenure: "",
    office_address: "",
    office_landline: "",
    sourceOfIncome: "",
    monthly_income: "",
    countries: "",
    provinces: "",
    cities: "",
    suffix: "",
    barangay: "",
  });
  const [ListOfCountries, setListOfCountries] = useState([]);
  const [ListOfProvinces, setListOfProvinces] = useState([]);
  const [ListOfCities, setListOfCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});
  useEffect(() => {
    const isValid =
      informationDetails.firstname?.trim() !== "" &&
      informationDetails.lastname?.trim() !== "" &&
      informationDetails.birthdate?.trim() !== "" &&
      informationDetails.nationality?.trim() !== "" &&
      informationDetails.civil_status?.trim() !== "" &&
      informationDetails.employeer_business?.trim() !== "" &&
      informationDetails.nature_business?.trim() !== "" &&
      informationDetails.tenure.trim() !== "" &&
      informationDetails.office_address?.trim() !== "" &&
      informationDetails.office_landline?.trim() !== "" &&
      informationDetails.sourceOfIncome?.trim() !== "" &&
      informationDetails.monthly_income?.trim() !== "" ;
    onValidationChange(isValid);
    onInformationDetailsChange(informationDetails);
    fetchData();
  }, [informationDetails, onValidationChange, onInformationDetailsChange]);

  const fetchData = async () => {
    try {
      const getCountries = await GetCountries();
      const getProvinces = await GetProvinces();
      const getCities = await GetCities();
      setListOfCountries(await getCountries.data);
      setListOfProvinces(await getProvinces.data);
      setListOfCities(await getCities.data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleCountryChange = async (event) => {
    const selectedCountryId = event.target.value;

    setInformationDetails((prevState) => ({
      ...prevState,
      countries: selectedCountryId,
    }));
  };

  const handleProvinceChange = async (event) => {
    const selectedProvinceId = event.target.value;

    console.log("Selected Province ID:", selectedProvinceId);
    setInformationDetails((prevState) => ({
      ...prevState,
      provinces: selectedProvinceId,
    }));
  };

  const [fieldBorders, setFieldBorders] = useState({
    mobile_number: "1px solid #ccc",
    email: "1px solid #ccc",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInformationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    const errorMessages = {
      nature_business: `Please select the Nature of your Business`,
      nationality: `Please select your Nationality`,
    };

    if (errorMessages.hasOwnProperty(name) && value === "disabled") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessages[name],
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleFocus = (fieldName) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const handleBlur = (fieldName) => {
    const errorMessages = {
      civil_status: `Please enter your Civil Status`,
      employeer_business: `Please enter Employeer Business Name`,
      office_address: `Please enter your Office address`,
      office_landline: `Please enter your Office Landline`,
      nationality: `Please select your Nationality`,
      sourceOfIncome: `Please enter the Type of your Source of Income`,
      monthly_income: `Please enter your Monthly Income`,
    };

    if (informationDetails[fieldName].trim() === "") {
      if (errorMessages.hasOwnProperty(fieldName)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: errorMessages[fieldName],
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please select your ${fieldName}`,
        }));
      }
      setFieldBorders((prevBorders) => ({
        ...prevBorders,
        [fieldName]: "1px solid red",
      }));
    } else if (fieldName === "birthdate") {
      const enteredDate = new Date(informationDetails[fieldName]);
      const currentDate = new Date();
      const ageDiffMs = currentDate - enteredDate;
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (isNaN(enteredDate.getTime()) || age < 18 || age >= 60) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `You must be at least 18 years old and below 60 years old to proceed`,
        }));
      }
    } else if (
      fieldName === "civil_status" &&
      !["married", "single", "divorced", "widowed"].includes(
        informationDetails[fieldName].toLowerCase()
      )
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Invalid Civil Status`,
      }));
      setFieldBorders((prevBorders) => ({
        ...prevBorders,
        [fieldName]: "1px solid red",
      }));
    } else {
      setFieldBorders((prevBorders) => ({
        ...prevBorders,
        [fieldName]: "1px solid #ccc",
      }));
    }
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
          onFocus={() => handleFocus("firstname")}
          onBlur={() => handleBlur("firstname")}
          style={{ border: fieldBorders.firstname }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.firstname}
        </div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="middlename"
          placeholder="Middle Name (Optional)"
          value={informationDetails.middlename}
          onChange={handleInputChange}
          onBlur={() => handleBlur("middlename")}
          style={{ border: fieldBorders.middlename }}
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
          onFocus={() => handleFocus("lastname")}
          onBlur={() => handleBlur("lastname")}
          style={{ border: fieldBorders.lastname }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.lastname}
        </div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="suffix"
          placeholder="Suffix (Optional)"
          value={informationDetails.suffix}
          onChange={handleInputChange}
          onBlur={() => handleBlur("suffix")}
          style={{ border: fieldBorders.suffix }}
        />
      </div>
      <div className="c-details-input">
        <input
          required
          className="d-input"
          type="date"
          name="birthdate"
          placeholder="Birthdate"
          value={informationDetails.birthdate}
          onChange={handleInputChange}
          onFocus={() => handleFocus("birthdate")}
          onBlur={() => handleBlur("birthdate")}
          style={{ border: fieldBorders.birthdate }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.birthdate}
        </div>
      </div>
      <div className="c-details-input">
        <input
          required
          className="d-input"
          type="text"
          name="nationality"
          placeholder="Nationality"
          value={informationDetails.nationality}
          onChange={handleInputChange}
          onFocus={() => handleFocus("nationality")}
          onBlur={() => handleBlur("nationality")}
          style={{ border: fieldBorders.nationality }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.nationality}
        </div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="civil_status"
          placeholder="Civil Status"
          value={informationDetails.civil_status}
          onChange={handleInputChange}
          onFocus={() => handleFocus("civil_status")}
          onBlur={() => handleBlur("civil_status")}
          style={{ border: fieldBorders.civil_status }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.civil_status}
        </div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="employeer_business"
          placeholder="Employer/Business Name"
          value={informationDetails.employeer_business}
          onChange={handleInputChange}
          onFocus={() => handleFocus("employeer_business")}
          onBlur={() => handleBlur("employeer_business")}
          style={{ border: fieldBorders.employeer_business }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.employeer_business}
        </div>
      </div>
      <div className="c-details-input">
        <select
          className="d-select"
          name="nature_business"
          value={informationDetails.nature_business}
          onChange={handleInputChange}
          onFocus={() => handleFocus("nature_business")}
          onBlur={() => handleBlur("nature_business")}
          style={{ border: fieldBorders.nature_business }}
        >
          <option value="defaultBusiness">Nature of Business</option>
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
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.nature_business}
        </div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="tenure"
          placeholder="Length of Tenure"
          value={informationDetails.tenure}
          onChange={handleInputChange}
          onFocus={() => handleFocus("tenure")}
          onBlur={() => handleBlur("tenure")}
          style={{ border: fieldBorders.tenure }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.tenure}
        </div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="office_address"
          placeholder="Office Address"
          value={informationDetails.office_address}
          onChange={handleInputChange}
          onFocus={() => handleFocus("office_address")}
          onBlur={() => handleBlur("office_address")}
          style={{ border: fieldBorders.office_address }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.office_address}
        </div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="office_landline"
          placeholder="Office Landline"
          value={informationDetails.office_landline}
          onChange={handleInputChange}
          onFocus={() => handleFocus("office_landline")}
          onBlur={() => handleBlur("office_landline")}
          style={{ border: fieldBorders.office_landline }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.office_landline}
        </div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="sourceOfIncome"
          placeholder="Source of Income"
          value={informationDetails.sourceOfIncome}
          onChange={handleInputChange}
          onFocus={() => handleFocus("sourceOfIncome")}
          onBlur={() => handleBlur("sourceOfIncome")}
          style={{ border: fieldBorders.sourceOfIncome }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.sourceOfIncome}
        </div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="monthly_income"
          placeholder="Gross Monthly Income"
          value={informationDetails.monthly_income}
          onChange={handleInputChange}
          onFocus={() => handleFocus("monthly_income")}
          onBlur={() => handleBlur("monthly_income")}
          style={{ border: fieldBorders.monthly_income }}
        />
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.monthly_income}
        </div>
      </div>
      <div className="c-details-input">
        {loading && (
          <div className="overlay">
            <LoadingComponent containerStyle="container-loading" />
          </div>
        )}
        <select
          className="d-select"
          name="countries"
          value={informationDetails.countries}
          onChange={(event) => {
            handleInputChange(event);
            handleCountryChange(event);
          }}
          onFocus={() => handleFocus("countries")}
          onBlur={() => handleBlur("countries")}
          style={{ border: fieldBorders.countries }}
        >
          <option value="">Country</option>
          {ListOfCountries.map((country) => (
            <option
              key={country.addressL0Id}
              value={`${country.name}|${country.addressL0Id}`}
            >
              {country.name}
            </option>
          ))}
        </select>
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.countries}
        </div>
      </div>
      <div className="c-details-input">
        <select
          className="d-select"
          name="provinces"
          value={informationDetails.provinces}
          onChange={(event) => {
            handleInputChange(event);
            handleProvinceChange(event);
          }}
          onFocus={() => handleFocus("provinces")}
          onBlur={() => handleBlur("provinces")}
          style={{ border: fieldBorders.provinces }}
        >
          <option value="">Province</option>
          {ListOfProvinces.map((province) => (
            <option
              key={province.addressL1Id}
              value={`${province.name}|${province.addressL1Id}`}
            >
              {province.name}
            </option>
          ))}
        </select>
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.provinces}
        </div>
      </div>
      <div className="c-details-input">
        <select
          className="d-select"
          name="cities"
          value={informationDetails.cities}
          onChange={(event) => {
            handleInputChange(event);
          }}
          onFocus={() => handleFocus("cities")}
          onBlur={() => handleBlur("cities")}
          style={{ border: fieldBorders.cities }}
        >
          <option value="">City</option>
          {ListOfCities.map((city) => (
            <option
              key={city.addressL2Id}
              value={`${city.name}|${city.addressL2Id}`}
            >
              {city.name}
            </option>
          ))}
        </select>
        <div
          style={{ color: "red", fontSize: "12px", margin: "10px 20px 20px 0" }}
        >
          {errors.cities}
        </div>
        <div className="c-details-input">
          <input
            className="d-input"
            type="text"
            name="barangay"
            placeholder="Barangay"
            value={informationDetails.barangay}
            onChange={handleInputChange}
            onFocus={() => handleFocus("barangay")}
            onBlur={() => handleBlur("barangay")}
            style={{ border: fieldBorders.barangay }}
          />
          <div
            style={{
              color: "red",
              fontSize: "12px",
              margin: "10px 20px 20px 0",
            }}
          >
            {errors.barangay}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationComponent;
