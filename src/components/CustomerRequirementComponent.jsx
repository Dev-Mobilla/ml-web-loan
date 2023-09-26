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
  CustomAlert
} from "./index";
import { GetSessionDocument } from "../utils/DataFunctions";
import {useLocation} from "react-router-dom";

const CustomerRequirementComponent = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { modalOpen, modalTitle, modalDefaultGuideImage, closeModal } =
    useModal();
  const [showModal, setshowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);
  const [modalProps, setModalProps] = useState(null);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  
  let vehicleKeys = [
    "Orginal OR/CR", 
    "Set stencils", 
    "Car Insurance", 
    "Front Side", 
    "Back Side", 
    "Right Side", 
    "Left Side"
  ]
  
  useEffect(() => {

    setIsSubmitButtonDisabled(isSubmitButtonDisabled);

    const storageLength = sessionStorage.length < 10;
    
    const isCheckEmpty = !CheckRequiredDocuments() && !CheckVehicleDocuments(vehicleKeys) && !storageLength;
    console.log(storageLength);
    setIsSubmitButtonDisabled(!isCheckEmpty);

  }, [ optionValue, isSubmitButtonDisabled, sessionStorage]);

  const CheckRequiredDocuments = () => {
    let requiredItems = []
    let Keys = [];

    if (optionValue === "Self-Employed") {
      Keys = ["Valid ID", "Mayor’s Certificate", "Bank Statement"];
    }
    else if (optionValue === "Employed") {
      Keys = ["Valid ID", "Employee Certificate", "Payslip/ITR"];
    }

    for (let key of Keys) {
      const value = JSON.parse(sessionStorage.getItem(key));
      requiredItems.push(value?.url);
    }
    return requiredItems?.includes("");

  }

  const CheckVehicleDocuments = (Keys) => {
    let vehicleItems = []

    for (let key of Keys) {
      const value = JSON.parse(sessionStorage.getItem(key));
      
      vehicleItems.push(value?.url);
    }
    return vehicleItems?.includes("");

  }

  const OnOptionChange = (optionVal) => {
    setOptionValue(optionVal);
  }

  const OnImageSubmitHandler = (imageName, documentName, url) => {
    let imageItem = { imageName, url, documentName };
    sessionStorage.setItem([modalTitle], JSON.stringify(imageItem));

    const storageLength = sessionStorage.length < 10;

    const isEmpty = !CheckRequiredDocuments() && !CheckVehicleDocuments(vehicleKeys) && !storageLength;
    setIsSubmitButtonDisabled(!isEmpty);
  };

  const OnSubmitRequirementsHandler = () => {
    if (sessionStorage.length !== 0 && location.state) {
      // console.log(location.state);
      for (const key in sessionStorage) {
        if (Object.hasOwnProperty.call(sessionStorage, key)) {
          const element = sessionStorage[key];

          // console.log(JSON.parse(element));
          setshowModal(true)
          setModalProps({
            title:"We have received your application",
            message: `Our ML Loans Team will be reviewing the information submitted. You
            will receive a message from us in 3-5 business days.`
          })
        }
      }
    }
    else{
      setShowAlert(true)
      setAlertProps({
        title: "Upload Required",
        text: "Make sure to upload all required documents.",
        isError: true
      })
    }
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
          />

          <div
            className="apply-btn"
          >
            <CustomButton
              btnType="submit"
              name="Submit"
              styles={isSubmitButtonDisabled ? "btn-disabled" : "btn-enabled"}
              disabled={isSubmitButtonDisabled}
              EventHandler={OnSubmitRequirementsHandler}
            ></CustomButton>
          </div>
        </div>
      </div>
      {showModal && <SuccessModal 
      hideModal={setshowModal} 
      title={modalProps.title}
      message={modalProps.message}/>}

      {showAlert && <CustomAlert
        title={alertProps.title}
        text={alertProps.text}
        isError={alertProps.isError}
        onClose={() => setShowAlert(false)}
      />}
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
