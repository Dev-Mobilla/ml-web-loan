import React, { useEffect, useState } from "react";
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
import {CheckSessionStorage, GetSessionDocument } from "../utils/DataFunctions";

const CustomerRequirementComponent = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const { modalOpen, modalTitle, modalDefaultGuideImage, closeModal } =
    useModal();
  const [showModal, setshowModal] = useState(false);

  const [optionValue, setOptionValue] = useState("");

  // const { secondStepDetails } = location.state || {};

  // const thirdStepDetails = {
  //   secondStepDetails: secondStepDetails,
  // };

  // localStorage.setItem("SecondStepDetails", JSON.stringify(thirdStepDetails));

  const OnImageSubmitHandler = (imageName, documentName, url) => {

    let imageItem = { imageName, url, documentName };

    sessionStorage.setItem([modalTitle], JSON.stringify(imageItem));
    
  }

  const OnSubmitRequirementsHandler = () => {
    console.log('requirements');
    console.log(CheckSessionStorage());
  }
  const OnOptionChange = (optionVal) => {
    setOptionValue(optionVal);
  }

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
            <VehicleRequirementComponent 
              session={GetSessionDocument("Orginal OR/CR")}
              orDoc={GetSessionDocument("Orginal OR/CR")}
              stencils={GetSessionDocument("Set stencils")}
              carInsurance={GetSessionDocument("Car Insurance")}
              front={GetSessionDocument("Front Side")}
              back={GetSessionDocument("Back Side")}
              right={GetSessionDocument("Right Side")}
              left={GetSessionDocument("Left Side")}
            />
          </div>

          <RequiredDocumentsComponent 
            OnOptionChange={OnOptionChange}
            validId={GetSessionDocument("Valid ID")}
            employeeCert={GetSessionDocument("Employee Certificate")}
            paySlip={GetSessionDocument("Payslip/ITR")}
            mayorCert={GetSessionDocument("Mayor’s Certificate")}
            bankStatement={GetSessionDocument("Bank Statement")}
            // validId={validId}
            // employeeCert={employeeCert}
            // paySlip={paySlip}
            // mayorCert={mayorCert}
            // bankStatement={bankStatement}
          />

          <div
            className="apply-btn"
            // onClick={() => {
            //   setshowModal(true);
            // }}
          >
            <CustomButton
              btnType="submit"
              name="Submit"
              styles="btn-enabled"
              EventHandler={OnSubmitRequirementsHandler}
            ></CustomButton>
          </div>
        </div>
      </div>
      {showModal && <SuccessModal hideModal={setshowModal} />}
      {/* <AddPhotoModal
        isOpen={modalOpen}
        onClose={closeModal}
        modalTitle={modalTitle}
        modalDefaultGuideImage={modalDefaultGuideImage}

      /> */}
      <AddPhotoModal
        isOpen={modalOpen}
        onClose={closeModal}
        modalTitle={modalTitle}
        modalDefaultGuideImage={modalDefaultGuideImage}
        OnImageSubmitHandler={OnImageSubmitHandler}
      />
    </div>
  );
};

export default CustomerRequirementComponent;
