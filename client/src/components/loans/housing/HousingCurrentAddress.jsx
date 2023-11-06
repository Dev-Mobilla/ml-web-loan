import React, { useState, useEffect } from "react";


const HousingCurrentAddress = ({ informationDetails,
  setInformationDetails,
  theListOfCountries,
  styles
}) => {

  const [errors, setErrors] = useState({});


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInformationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleNoCountryChange = async (event) => {
    const selectedCountryId = event.target.value;

    setInformationDetails((prevState) => ({
      ...prevState,
      countries: selectedCountryId,
    }));
  };

  const handleProvinceChange = async (event) => {
    const selectedProvinceId = event.target.value;

    setInformationDetails((prevState) => ({
      ...prevState,
      provinces: selectedProvinceId,
    }));
  };

  const [fieldBorders, setFieldBorders] = useState({
    mobile_number: "1px solid #ccc",
    email: "1px solid #ccc",
  });

  const handleFocus = (fieldName) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const handleBlur = (fieldName) => {
    // Perform validation when the input field is unfocused (blurred)
    if (informationDetails[fieldName] === '') {
      const errorMessages = {
        country: `Please enter your current country`,
        province: `Please enter your current province`,
        city: `Please enter your current city`,
        barangay: `Please enter your current barangay`,
      };
      // if (fieldName === 'civil_status') {
      // } 
      // if (informationDetails[fieldName].trim() === "") {
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
    } else {
      setFieldBorders((prevBorders) => ({
        ...prevBorders,
        [fieldName]: "1px solid #ccc",
      }));
    }
  }

  return (
    <div className="c-details-input">
      <select
        className={styles}
        name="noCountries"
        value={informationDetails.countries}
        onChange={(event) => {
          handleNoCountryChange(event);
        }}
        onFocus={() => handleFocus('noCountries')}
        onBlur={() => handleBlur('noCountries')}
        style={{ border: fieldBorders.noCountries }}
      >
        <option value="">Country</option>
        {theListOfCountries.map((noCountry) => (
          <option key={noCountry.addressL0Id} value={`${noCountry.name}|${noCountry.addressL0Id}`}>
            {noCountry.name}
          </option>
        ))}
      </select>
      <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.noCountries}</div>

    </div>
  )
}

export default HousingCurrentAddress;