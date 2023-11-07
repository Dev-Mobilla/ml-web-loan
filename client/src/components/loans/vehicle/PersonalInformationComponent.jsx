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
    //   informationDetails.firstname !== "" &&
    //   informationDetails.lastname !== "" &&
    //   informationDetails.birthdate !== "" &&
    //   informationDetails.nationality !== "" &&
    //   informationDetails.civil_status !== "" &&
    //   informationDetails.employeer_business !== "" &&
    //   informationDetails.nature_business !== "" &&
    //   informationDetails.tenure !== "" &&
    //   informationDetails.office_address !== "" &&
    //   informationDetails.office_landline !== "" &&
    //   informationDetails.sourceOfIncome !== "" &&
    //   informationDetails.monthly_income !== "" &&
    //   informationDetails.countries !== "" &&
    //   informationDetails.provinces !== "" &&
    //   informationDetails.cities !== "" &&
    //   informationDetails.barangay !== "";
    // onValidationChange(isValid);
    // onInformationDetailsChange(informationDetails);
    // console.log(informationDetails);
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const getCountries = await GetCountries();
      const getProvinces = await GetProvinces();
      const getCities = await GetCities();
      setListOfCountries(await getCountries.data);
      setListOfProvinces(await getProvinces.data);
      setListOfCities(await getCities.data);
    } catch (error) {
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
    // Perform validation when the input field is unfocused (blurred)
    console.log("fieldName", fieldName);
    if (informationDetails[fieldName] === '') {
      const errorMessages = {
        civil_status: `Please enter your civil status`,
        employeer_business: `Please enter employeer business name`,
        office_address: `Please enter your office address`,
        office_landline: `Please enter your office landline`,
        nationality: `Please enter your nationality`,
        sourceOfIncome: `Please enter your source of income`,
        monthly_income: `Please enter your monthly income`,
        firstname: `Please enter your first name`,
        lastname: `Please enter your last name`,
        tenure: `Please enter length of tenure`,
        barangay: `Please enter your barangay`,
      };

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
          informationDetails[fieldName] ? informationDetails[fieldName].toLowerCase() : informationDetails[fieldName]
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
          onFocus={() => handleFocus("firstname")}
          onBlur={() => handleBlur("firstname")}
          style={{ border: fieldBorders.firstname }}
          readOnly={isEditable}
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
          readOnly={isEditable}
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
          placeholder={`${informationDetails.birthdate === "" || 
            informationDetails.birthdate == null ? "Birthdate" 
            : informationDetails.birthdate}`}
          value={informationDetails.birthdate || ''}
          onChange={handleInputChange}
          onFocus={() => handleFocus("birthdate")}
          onBlur={() => handleBlur("birthdate")}
          style={{ border: fieldBorders.birthdate }}
          readOnly={informationDetails.birthdate !== null && informationDetails.birthdate !== ""}
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
          <option value="Agriculture and Farming">Agriculture and Farming</option>
          <option value="Food and Beverage">Food and Beverage</option>
          <option value="Retail">Retail</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Construction and Engineering">Construction and Engineering</option>
          <option value="Professional Services">Professional Services</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Hospitality and Tourism">Hospitality and Tourism</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Education and Training">Education and Training</option>
          <option value="Financial Services">Financial Services</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Energy and Utilities">Energy and Utilities</option>
          <option value="Transportation and Logistics">Transportation and Logistics</option>
          <option value="Entertainment and Media">Entertainment and Media</option>
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
          value={informationDetails.office_address || ''}
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
