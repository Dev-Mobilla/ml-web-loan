import React, { useState, useEffect } from "react";

const VehicleNewDetailsComponent = ({ onValidationChange, onVehicleDetailsChange }) => {
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    variant: "",
  });

  useEffect(() => {
    const isValid =
      vehicleDetails.make.trim() !== "" &&
      vehicleDetails.model.trim() !== "" &&
      vehicleDetails.year.trim() !== "" &&
      vehicleDetails.color.trim() !== "" &&
      vehicleDetails.variant.trim() !== "";
    onValidationChange(isValid);

    onVehicleDetailsChange(vehicleDetails);
  }, [vehicleDetails, onValidationChange, onVehicleDetailsChange]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails({ ...vehicleDetails, [name]: value });
  };

  return (
    <div className="form">
      <div className="vehicle-details-form">
        <div className="form-group">
          <div className="form-row">
            <input
              type="text"
              id="year"
              name="year"
              placeholder="Year"
              value={vehicleDetails.year}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              id="make"
              name="make"
              placeholder="Make"
              value={vehicleDetails.make}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Model"
              value={vehicleDetails.model}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              id="color"
              name="color"
              placeholder="Color"
              value={vehicleDetails.color}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <input
            type="text"
            id="variant"
            name="variant"
            placeholder="Variant"
            value={vehicleDetails.variant}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleNewDetailsComponent;
