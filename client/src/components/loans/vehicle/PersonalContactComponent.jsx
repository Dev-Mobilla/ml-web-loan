import React, { useState, useEffect } from "react";

const PersonalContactComponent = ({
  onValidationChange,
  onContactDetailsChange,
  performSearch,
  contactDetails,
  setContactDetails,
  isEditable,
}) => {
 

  useEffect(() => {
    
     const isValid =
      contactDetails.mobile_number !== "" &&
      contactDetails.email !== "" &&
      !isEmailValid(contactDetails.email) &&
      !isPhoneValid(contactDetails.mobile_number)

    onValidationChange(isValid);
    onContactDetailsChange(contactDetails);

  }, [contactDetails, onValidationChange]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s()-]{7,15}$/;
    const phRegex = /^(09|\+639)\d{9}$/

    const isEmailValid = (email) => emailRegex.test(email);
    const isPhoneValid = (phone) => phRegex.test(phone);

  const handleSearch = () => {
    const isValid =
      contactDetails.mobile_number !== "" &&
      contactDetails.email !== "" &&
      isEmailValid(contactDetails.email) &&
      isPhoneValid(contactDetails.mobile_number)

      console.log("isvalid", isValid);

    if (isValid) {
      performSearch(contactDetails.mobile_number, contactDetails.email);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };
  const [errors, setErrors] = useState({});
  const [fieldBorders, setFieldBorders] = useState({
    mobile_number: '1px solid #ccc',
    email: '1px solid #ccc',

  });
  const handleFocus = (fieldName) => {
    // Clear the error message for the corresponding input field
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
  };
  const handleBlur = (fieldName) => {
    // Perform validation when the input field is unfocused (blurred)
    console.log(fieldName);
    if (contactDetails[fieldName] === '') {
      if (fieldName === 'mobile_number') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter your mobile number`,
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
    else if (fieldName === 'mobile_number' && !isPhoneValid(contactDetails[fieldName])) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Please enter a valid mobile number`,
      }));
    }else if (fieldName === 'email' && !isEmailValid(contactDetails[fieldName])) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Please enter a valid email address`,
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
          name="mobile_number"
          id="mobile_number"
          placeholder="Mobile Number"
          value={contactDetails.mobile_number}
          onChange={handleInputChange}
          onFocus={() => handleFocus('mobile_number')}
          onBlur={() => {
            handleBlur('mobile_number');
            handleSearch(contactDetails.mobile_number, contactDetails.email);
          }}
          style={{ border: fieldBorders.mobile_number }}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.mobile_number}</div>
      </div>
      <div className="c-details-input">
        <input
          className="d-input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={contactDetails.email}
          onChange={handleInputChange}
          onFocus={() => handleFocus('email')}
          onBlur={() => {
            handleBlur('email')
            handleSearch(contactDetails.mobile_number, contactDetails.email);
          }}
          style={{ border: fieldBorders.email }}
          // readOnly={isEditable}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.email}</div>
      </div>
    </div>
  );
};

export default PersonalContactComponent;