import React from "react";
import "../styles/requireddocuments.css";
import {
  CustomButton,
  CustomHeader,
  CustomPrevBtn,
  CustomStatus,
  FooterComponent,
  RequiredDocumentsComponent,
  TopbarComponent,
  VehicleDocumentsComponent,
} from "./index";

const CustomerRequirementsComponent = () => {
  return (
    <div className="customer-requirement">
      <div className="div">
        <TopbarComponent />
        <CustomHeader title="Vehicle Details" />
        <div className="body-bg">
          <CustomPrevBtn />
          <VehicleDocumentsComponent/>
          <RequiredDocumentsComponent/>
          <div className="submit-btn">
            <div className="text-wrapper-7">Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRequirementsComponent;