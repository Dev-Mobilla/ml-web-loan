import React from "react";

const VehicleNewDetailsComponent = () => {
  return (
    <div className="form">
      <div className="vehicle-details-form">
        <div className="form-group">
          <div className="form-row">
            <input type="text" id="year" name="year" placeholder="Year" />
          </div>
          <div className="form-row">
            <input type="text" id="make" name="make" placeholder="Make" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <input type="text" id="model" name="model" placeholder="Model" />
          </div>
          <div className="form-row">
            <input type="text" id="color" name="color" placeholder="Color" />
          </div>
        </div>
        <div className="form-row">
          <input
            type="text"
            id="chassisNo"
            name="chassisNo"
            placeholder="Variant"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleNewDetailsComponent;
