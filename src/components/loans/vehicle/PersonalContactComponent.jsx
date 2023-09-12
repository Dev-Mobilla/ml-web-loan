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
        />
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
        />
      </div>
    </div>
  );
};

export default PersonalContactComponent;