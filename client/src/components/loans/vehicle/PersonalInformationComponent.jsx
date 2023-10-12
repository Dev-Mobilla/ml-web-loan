import React, { useState, useEffect } from "react";
import { GetCountries, GetProvinces, GetCities } from "../../../api/symph.api";
import {
  LoadingComponent,
} from "../../index";

const PersonalInformationComponent = ({
  onValidationChange,
  onInformationDetailsChange,
  informationDetails,
  setInformationDetails,
  isEditable
}) => {
  const [ListOfCountries, setListOfCountries] = useState([]);
  const [ListOfProvinces, setListOfProvinces] = useState([]);
  const [ListOfCities, setListOfCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});
  useEffect(() => {
    const isValid =
      informationDetails.firstname !== "" &&
      informationDetails.lastname !== "" &&
      informationDetails.birthdate !== "" &&
      informationDetails.nationality !== "" &&
      informationDetails.civil_status !== "" &&
      informationDetails.employeer_business !== "" &&
      informationDetails.nature_business !== "" &&
      informationDetails.tenure !== "" &&
      informationDetails.office_address !== "" &&
      informationDetails.office_landline !== "" &&
      informationDetails.sourceOfIncome !== "" &&
      informationDetails.monthly_income !== "" &&
      informationDetails.countries !== "" &&
      informationDetails.provinces !== "" &&
      informationDetails.cities !== "" &&
      informationDetails.barangay !== "";
    onValidationChange(isValid);
    onInformationDetailsChange(informationDetails);
    fetchData();
    // console.log("information", informationDetails);
  }, [informationDetails, onValidationChange]);

  const fetchData = async () => {
    try {
      const getCountries = await GetCountries();
      const getProvinces = await GetProvinces();
      const getCities = await GetCities();
      setListOfCountries(await getCountries.data);
      setListOfProvinces(await getProvinces.data);
      setListOfCities(await getCities.data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };
  const handleCountryChange = async (event) => {
    const selectedCountryId = event.target.value;

    setInformationDetails((prevState) => ({
      ...prevState,
      countries: selectedCountryId,
    }));

    // setLoading(true); // Set loading state to true

    // try {
    //   // Fetch provinces and cities specific to the selected country
    //   const getProvinces = await GetProvinces(selectedCountryId);
    //   const getCities = await GetCities(selectedCountryId);

    //   setListOfProvinces(await getProvinces.data);
    //   setListOfCities(await getCities.data);
    // } catch (error) {
    //   console.error('Error:', error);
    // }

    // setLoading(false); // Set loading state to false after data is fetched
  };
  const handleProvinceChange = async (event) => {
    const selectedProvinceId = event.target.value;

    setInformationDetails((prevState) => ({
      ...prevState,
      provinces: selectedProvinceId
    }));
    // setLoading(true); // Set loading state to true
    // try {
    //   // Fetch provinces and cities specific to the selected country
    //   const getCities = await GetCities(selectedProvinceId);
    //   setListOfCities(await getCities.data);
    // } catch (error) {
    //   console.error('Error:', error);
    // }

    // setLoading(false); // Set loading state to false after data is fetched
  };

  const [fieldBorders, setFieldBorders] = useState({
    mobile_number: '1px solid #ccc',
    email: '1px solid #ccc',
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInformationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    if (name === 'nature_business' && value === 'defaultBusiness') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Please select the Nature of your Business`,
      }));
    } else if (name === 'nationality' && value === 'disabled') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Please select your Nationality`,
      }));

    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };
  const handleFocus = (fieldName) => {
    // Clear the error message for the corresponding input field
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));

  };
  const handleBlur = (fieldName) => {
    // Perform validation when the input field is unfocused (blurred)
    if (informationDetails[fieldName] === '') {
      if (fieldName === 'civil_status') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter your Civil Status`,
        }));
      }
      else if (fieldName === 'employeer_business') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter Employeer Business Name `,
        }));
      }
      else if (fieldName === 'office_address') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter your Office address `,
        }));
      }
      else if (fieldName === 'office_landline') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter your Office Landline `,
        }));
      }
      else if (fieldName === 'nationality') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter your Nationality`,
        }));
      }
      else if (fieldName === 'sourceOfIncome') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter the Type of your Source of Income`,
        }));
      }
      else if (fieldName === 'monthly_income') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter your Monthly Income`,
        }));
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter your ${fieldName}`,
        }));
      }
      setFieldBorders((prevBorders) => ({
        ...prevBorders,
        [fieldName]: '1px solid red',
      }));
    }
    else if (fieldName === 'birthdate') {
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
    }
    else if (fieldName === 'civil_status' && !['married', 'single', 'divorced', 'widowed'].includes(informationDetails[fieldName].toLowerCase())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Invalid Civil Status`,
      }));
      setFieldBorders((prevBorders) => ({
        ...prevBorders,
        [fieldName]: '1px solid red',
      }));
    }
    else {
      setFieldBorders((prevBorders) => ({
        ...prevBorders,
        [fieldName]: '1px solid #ccc',
      }));
    }
  }

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
          onFocus={() => handleFocus('firstname')}
          onBlur={() => handleBlur('firstname')}
          style={{ border: fieldBorders.firstname }}
          readOnly={isEditable}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.firstname}</div>
      </div>

      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={informationDetails.lastname}
          onChange={handleInputChange}
          onFocus={() => handleFocus('lastname')}
          onBlur={() => handleBlur('lastname')}
          style={{ border: fieldBorders.lastname }}
          readOnly={isEditable}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.lastname}</div>
      </div>
      <div className="c-details-input" style={{ margin: "10px 0px" }}>
        <input
          className="d-input"
          type="text"
          name="middlename"
          placeholder="Middle Name (Optional)"
          value={informationDetails.middlename}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input" style={{ margin: "10px 0px" }}>
        <input
          className="d-input"
          type="text"
          name="suffix"
          placeholder="Suffix (Optional)"
          value={informationDetails.suffix}
          onChange={handleInputChange}
        />
      </div>
      <div className="c-details-input">
        <input
          required
          className="d-input"
          type="date"
          name="birthdate"
          placeholder="Birthdate"
          value={informationDetails.birthdate || ''}
          onChange={handleInputChange}
          onFocus={() => handleFocus('birthdate')}
          onBlur={() => handleBlur('birthdate')}
          style={{ border: fieldBorders.birthdate }}
          readOnly={isEditable}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.birthdate}</div>
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
          onFocus={() => handleFocus('nationality')}
          onBlur={() => handleBlur('nationality')}
          style={{ border: fieldBorders.nationality }}
          readOnly={isEditable}
        />
        {/* <select
          className="d-select"
          name="nationality"
          value={informationDetails.nationality}
          onChange={handleInputChange}
          onFocus={() => handleFocus('nationality')}
          onBlur={() => handleBlur('nationality')}
          style={{ border: fieldBorders.nationality }}
        >
          <option value="disabled">Nationality</option>
          <option value="ph" >Philippines</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
        </select> */}
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.nationality}</div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="civil_status"
          placeholder="Civil Status"
          value={informationDetails.civil_status}
          onChange={handleInputChange}
          onFocus={() => handleFocus('civil_status')}
          onBlur={() => handleBlur('civil_status')}
          style={{ border: fieldBorders.civil_status }}
          readOnly={isEditable}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.civil_status}</div>

      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="employeer_business"
          placeholder="Employer/Business Name"
          value={informationDetails.employeer_business}
          onChange={handleInputChange}
          onFocus={() => handleFocus('employeer_business')}
          onBlur={() => handleBlur('employeer_business')}
          style={{ border: fieldBorders.employeer_business }}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.employeer_business}</div>
      </div>
      <div className="c-details-input">
        <select
          className="d-select"
          name="nature_business"
          value={informationDetails.nature_business}
          onChange={handleInputChange}
          onFocus={() => handleFocus('nature_business')}
          onBlur={() => handleBlur('nature_business')}
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
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.nature_business}</div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="tenure"
          placeholder="Length of Tenure"
          value={informationDetails.tenure}
          onChange={handleInputChange}
          onFocus={() => handleFocus('tenure')}
          onBlur={() => handleBlur('tenure')}
          style={{ border: fieldBorders.tenure }}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.tenure}</div>

      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="office_address"
          placeholder="Office Address"
          value={informationDetails.office_address || ''}
          onChange={handleInputChange}
          onFocus={() => handleFocus('office_address')}
          onBlur={() => handleBlur('office_address')}
          style={{ border: fieldBorders.office_address }}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.office_address}</div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="office_landline"
          placeholder="Office Landline"
          value={informationDetails.office_landline}
          onChange={handleInputChange}
          onFocus={() => handleFocus('office_landline')}
          onBlur={() => handleBlur('office_landline')}
          style={{ border: fieldBorders.office_landline }}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.office_landline}</div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="sourceOfIncome"
          placeholder="Source of Income"
          value={informationDetails.sourceOfIncome}
          onChange={handleInputChange}
          onFocus={() => handleFocus('sourceOfIncome')}
          onBlur={() => handleBlur('sourceOfIncome')}
          style={{ border: fieldBorders.sourceOfIncome }}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.sourceOfIncome}</div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="monthly_income"
          placeholder="Gross Monthly Income"
          value={informationDetails.monthly_income}
          onChange={handleInputChange}
          onFocus={() => handleFocus('monthly_income')}
          onBlur={() => handleBlur('monthly_income')}
          style={{ border: fieldBorders.monthly_income }}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.monthly_income}</div>

      </div>
      <div className="c-details-input">
        {loading && (
          <div className="overlay">
            <LoadingComponent containerStyle="container-loading" />
          </div>
        )}
        {isEditable ?
          <input className="d-select" type="text" value={informationDetails.countries} readOnly={isEditable} />
          :
          <select
            className="d-select"
            name="countries"
            value={informationDetails.countries}
            onChange={(event) => {
              handleInputChange(event);
              handleCountryChange(event);
            }}
            onFocus={() => handleFocus('countries')}
            onBlur={() => handleBlur('countries')}
            style={{ border: fieldBorders.countries }}
          >
            <option value="">Country</option>
            {ListOfCountries.map((country) => (
              <option key={country.addressL0Id} value={`${country.name}|${country.addressL0Id}`}>
                {country.name}
              </option>
            ))}
          </select>
        }

        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.countries}</div>
      </div>
      <div className="c-details-input">
        {isEditable ?
          <input className="d-select" type="text" value={informationDetails.provinces} readOnly={isEditable} />
          :
          <select
            className="d-select"
            name="provinces"
            value={informationDetails.provinces}
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
        }
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.provinces}</div>
      </div>
      <div className="c-details-input">
        {isEditable ?
          <input className="d-select" type="text" value={informationDetails.cities} readOnly={isEditable} />
          :
          <select
            className="d-select"
            name="cities"
            value={informationDetails.cities}
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
        }
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.cities}</div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="text"
          name="barangay"
          placeholder="Barangay"
          value={informationDetails.barangay}
          onChange={handleInputChange}
          onFocus={() => handleFocus('barangay')}
          onBlur={() => handleBlur('barangay')}
          style={{ border: fieldBorders.barangay }}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.barangay}</div>

      </div>
    </div>
  );
};

export default PersonalInformationComponent;
