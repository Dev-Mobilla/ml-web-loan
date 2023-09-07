import React from "react";
import "../styles/requirements.css";
import { useModal } from "../utils/modalContext";
import {
  AddPhotoModal,
  CustomButton,
  CustomHeader,
  CustomPrevBtn,
  TopbarComponent,
  CustomCardTitle,
  VehicleRequirementComponent,
  RequiredDocumentsComponent,
} from "./index";

const CustomerRequirementComponent = () => {
  const { modalOpen, modalTitle, modalDefaultGuideImage, closeModal } =
    useModal();

  return (
    <div className="customer-requirement">
      <div className="requirement-container">
        <TopbarComponent />
        <CustomHeader title="Manage Existing Loan" />
        <div className="requirement-content">
          <CustomPrevBtn />
          <div className="card">
            <CustomCardTitle
              title="Vehicle Documents"
              styles="custom-card-title"
            />
            <VehicleRequirementComponent />
          </div>

          <RequiredDocumentsComponent />

          <div className="apply-btn">
            <CustomButton
              type="submit"
              name="Submit"
              styles="btn"
            ></CustomButton>
          </div>
        </div>
      </div>
      <AddPhotoModal
        isOpen={modalOpen}
        onClose={closeModal}
        modalTitle={modalTitle}
        modalDefaultGuideImage={modalDefaultGuideImage}
      />
    </div>
  );
};

export default CustomerRequirementComponent;
