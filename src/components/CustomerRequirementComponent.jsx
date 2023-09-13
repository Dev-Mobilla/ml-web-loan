import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
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
  SuccessModal,
} from "./index";

const CustomerRequirementComponent = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const { modalOpen, modalTitle, modalDefaultGuideImage, closeModal } =
    useModal();
  const [showModal, setshowModal] = useState(false);
  // const { secondStepDetails } = location.state || {};

  // const thirdStepDetails = {
  //   secondStepDetails: secondStepDetails,
  // };

  // localStorage.setItem("SecondStepDetails", JSON.stringify(thirdStepDetails));


  return (
    <div className="customer-requirement">
      <div className="requirement-container">
        <TopbarComponent />
        <CustomHeader title="Vehicle Details" />
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

          <div
            className="apply-btn"
            onClick={() => {
              setshowModal(true);
            }}
          >
            <CustomButton
              type="submit"
              name="Submit"
              styles="btn-enabled"
            ></CustomButton>
          </div>
        </div>
      </div>
      {showModal && <SuccessModal hideModal={setshowModal} />}
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
