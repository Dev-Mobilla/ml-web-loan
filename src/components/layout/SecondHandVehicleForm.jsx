import React from "react";
import "../../styles/loanTypeSecondHand.css";
const SecondHandVehicleForm = () => {
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
              
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              id="make"
              name="make"
              placeholder="Make"
              
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
              
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              id="color"
              name="color"
              placeholder="Color"
              
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <input
              type="text"
              id="plateNo"
              name="plateNo"
              placeholder="Plate No."
              
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              id="engineNo"
              name="engineNo"
              placeholder="Engine No."
              
            />
          </div>
        </div>
        <div className="form-row">
          <input
            type="text"
            id="chassisNo"
            name="chassisNo"
            placeholder="Chassis No. / VIN"
            
          />
        </div>
      </div>
    </div>
  );
};

export default SecondHandVehicleForm;
