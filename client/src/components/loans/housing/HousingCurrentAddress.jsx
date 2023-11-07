import React, { useState, useEffect } from "react";


const HousingCurrentAddress = ({ currentAdd,
  setCurrentAdd,
  theListOfCountries,
  styles,
  ListOfProvinces,
  ListOfCities
}) => {

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentAdd((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleNoCountryChange = async (event) => {
    const selectedCountryId = event.target.value;

    setCurrentAdd((prevState) => ({
      ...prevState,
      countries: selectedCountryId,
    }));
  };

  const handleProvinceChange = async (event) => {
    const selectedProvinceId = event.target.value;

    setCurrentAdd((prevState) => ({
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
    console.log("fieldName", fieldName);
    console.log(currentAdd[fieldName]);
    if (currentAdd[fieldName] === '') {
      const errorMessages = {
        countries: `Please select your current country`,
        provinces: `Please select your current province`,
        cities: `Please select your current city`,
        barangay: `Please enter your current barangay`,
      };
      if (errorMessages.hasOwnProperty(fieldName)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: errorMessages[fieldName],
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
    <div>
      <div className="current-address--col">
      <div className="c-details-input current-address-country">
        <select
          className="d-select"
          name="countries"
          value={currentAdd.countries}
          onChange={(event) => {
            handleInputChange(event);
            handleNoCountryChange(event);
          }}
          onFocus={() => handleFocus('countries')}
          onBlur={() => handleBlur('countries')}
          style={{ border: fieldBorders.countries }}
        >
          <option value="">Country</option>
          {theListOfCountries.map((country) => (
            <option key={country.addressL0Id} value={`${country.name}|${country.addressL0Id}`}>
              {country.name}
            </option>
          ))}
        </select>
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 0px 0' }}>{errors.countries}</div>
      </div>
      <div className="c-details-input current-address-provinces">

          <select
            className="d-select"
            name="provinces"
            value={currentAdd.provinces}
            onChange={(event) => {
              handleInputChange(event);
              handleProvinceChange(event);
            }}
            onFocus={() => handleFocus('provinces')}
            onBlur={() => handleBlur('provinces')}
            style={{ border: fieldBorders.provinces }}
          >
            <option value="">Province</option>
            {ListOfProvinces.map((province) => (
              <option key={province.addressL1Id} value={`${province.name}|${province.addressL1Id}`}>
                {province.name}
              </option>
            ))}
          </select>
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 0px 0' }}>{errors.provinces}</div>
      </div>
      </div>
      <div className="c-details-input">
        <select
          className="d-select"
          name="cities"
          value={currentAdd.cities}
          onChange={(event) => {
            handleInputChange(event);
          }}
          onFocus={() => handleFocus('cities')}
          onBlur={() => handleBlur('cities')}
          style={{ border: fieldBorders.cities }}
        >
          <option value="">City</option>
          {ListOfCities.map((city) => (
            <option key={city.addressL2Id} value={`${city.name}|${city.addressL2Id}`}>
              {city.name}
            </option>
          ))}
        </select>
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 15px 0' }}>{errors.cities}</div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="barangay"
          placeholder="Barangay"
          value={currentAdd.barangay}
          onChange={handleInputChange}
          onFocus={() => handleFocus('barangay')}
          onBlur={() => handleBlur('barangay')}
          style={{ border: fieldBorders.barangay }}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 10px 0' }}>{errors.barangay}</div>
      </div>
    </div>
  )
}

export default HousingCurrentAddress;