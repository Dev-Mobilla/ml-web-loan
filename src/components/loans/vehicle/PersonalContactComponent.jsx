import React, { useState, useEffect } from "react";

const PersonalContactComponent = ({
  onValidationChange,
  onContactDetailsChange,
}) => {
  const [contactDetails, setContactDetails] = useState({
    mobile_number: "",
    email: "",
  });

  useEffect(() => {
    const isValid =
      contactDetails.mobile_number.trim() !== "" &&
      contactDetails.email.trim() !== "";
    onValidationChange(isValid);

    onContactDetailsChange(contactDetails);

  }, [contactDetails, onValidationChange]);

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
    if (contactDetails[fieldName].trim() === '') {
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
          onBlur={() => handleBlur('mobile_number')}
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
          onBlur={() => handleBlur('email')}
          style={{ border: fieldBorders.email }}
        />
        <div style={{ color: 'red', fontSize: '12px', margin: '10px 20px 20px 0' }}>{errors.email}</div>
      </div>
    </div>
  );
};

export default PersonalContactComponent;