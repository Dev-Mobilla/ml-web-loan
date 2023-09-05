import React from "react";
import { useState } from "react";
import "../styles/requireddocuments.css";
import SuccessModal from "./loans/vehicle/SuccessModalComponent";
import {
  CustomHeader,
  CustomPrevBtn,
  RequiredDocumentsComponent,
  TopbarComponent,
  VehicleDocumentsComponent,
} from "./index";
const CustomerRequirementsComponent = () => {
  const[openModal, setOpenModal] = useState(false);
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
            <div className="text-wrapper-7" onClick={()=> {
              setOpenModal(true)
            }}
            >Submit</div>
          </div>
          {openModal && <SuccessModal closeModal={setOpenModal}/>}
        </div>
      </div>
    </div>
  );
};

export default CustomerRequirementsComponent;