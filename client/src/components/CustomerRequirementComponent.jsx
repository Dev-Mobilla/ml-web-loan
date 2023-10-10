import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import AddCarLoan from "../api/mlloan.api";


const CustomerRequirementComponent = () => {
  const navigate = useNavigate();
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
    "Vehicle Insurance", 
    "Front Side", 
    "Back Side", 
    "Right Side", 
    "Left Side"
  ]
  
  useEffect(() => {

    // setIsSubmitButtonDisabled(isSubmitButtonDisabled);
    if (location.state == null) {
      navigate(-1);
    }

    const storageLength = sessionStorage.length < 10;
    
    const isCheckEmpty = !CheckRequiredDocuments() && !CheckVehicleDocuments(vehicleKeys) && !storageLength;
    console.log(storageLength);
    setIsSubmitButtonDisabled(!isCheckEmpty);
    console.log(location.state.secondStepDetails);
    // handleSubmitDocuments();
  }, [ optionValue, isSubmitButtonDisabled, sessionStorage, ]);
  
  const RequestBody = () => {
    const baseData = location.state.secondStepDetails;
    const firstArray = baseData.personalDetails[0];
    const secondArray = baseData.personalDetails[1];
    const request = {
      'vehicle_type': baseData.vehicleDetails.selectedVehicle,
      'loan_type': baseData.vehicleDetails.type,
      'year': baseData.vehicleDetails.year,
      'make': baseData.vehicleDetails.make,
      'model': baseData.vehicleDetails.model,
      'variant': baseData.vehicleDetails.variant,
      'plate_number': baseData.vehicleDetails.plateNo,
      'engine_number': baseData.vehicleDetails.engineNo,
      'chassis_number': baseData.vehicleDetails.chassisNo,
      'preferred_branch': baseData.preffered_branch,
      'last_name': secondArray.lastname,
      'first_name': secondArray.firstname,
      'middle_name': secondArray.middlename,
      'birth_date': secondArray.birthdate,
      'nationality': secondArray.nationality,
      'civil_status': secondArray.civil_status,
      'employer': secondArray.employeer_business,
      'nature_of_business': secondArray.nature_business,
      'tenure_length': secondArray.tenure,
      'office_address': secondArray.office_address,
      'office_landline': secondArray.office_landline,
      'source_of_income': secondArray.sourceOfIncome,
      'gross_monthly_income': secondArray.monthly_income,
      'current_address': baseData.current_address,
      'mobile_number': firstArray.mobile_number,
      'email': firstArray.email,
      'valid_id': JSON.parse(sessionStorage.getItem('Valid ID'))?.url || '',
      'employee_cert': JSON.parse(sessionStorage.getItem('Employee Certificate'))?.url || '',
      'payslip': JSON.parse(sessionStorage.getItem('Payslip/ITR'))?.url || '',
      'mayor_cert': JSON.parse(sessionStorage.getItem('Mayor’s Certificate'))?.url || '',
      'bank_cert': JSON.parse(sessionStorage.getItem('Bank Statement'))?.url || '',
      'original_or': JSON.parse(sessionStorage.getItem('Orginal OR/CR'))?.url || '',
      'stencils': JSON.parse(sessionStorage.getItem('Set stencils'))?.url || '',
      'car_insurance': JSON.parse(sessionStorage.getItem('Car Insurance'))?.url || '',
      'front_side': JSON.parse(sessionStorage.getItem('Front Side'))?.url || '',
      'back_side': JSON.parse(sessionStorage.getItem('Back Side'))?.url || '',
      'right_side': JSON.parse(sessionStorage.getItem('Right Side'))?.url || '',
      'left_side': JSON.parse(sessionStorage.getItem('Left Side'))?.url || '',
    };
    AddCarLoan(request);
  }
  // useEffect(() => {
  //   console.log(location);
  //   if (location.state == null) {
  //     navigate('/vehicle-loan/loan-type/new');
  //   }
  //   let isAllImagesUploaded = false;
  //   if (optionValue === "Self-Employed") {
  //     Keys = ["Valid ID", "Mayor’s Certificate", "Bank Statement"];
  //   }
  //   else if (optionValue === "Employed") {
  //     Keys = ["Valid ID", "Employee Certificate", "Payslip/ITR"];
  //   }

  //   for (let key of Keys) {
  //     const value = JSON.parse(sessionStorage.getItem(key));
  //     requiredItems.push(value?.url);
  //   }
  //   return requiredItems?.includes("");

  // }
  }, [ optionValue, isSubmitButtonDisabled, sessionStorage]);

   const CheckRequiredDocuments = () => {
      let requiredItems = []
      let Keys = []

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

      return requiredItems?.includes("") || requiredItems?.includes(null) || requiredItems?.includes(undefined);
    
  };

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
    console.log(location.state);
    console.log(location.state.employeeCert);
    let imageItem = { imageName, url, documentName };
    sessionStorage.setItem([modalTitle], JSON.stringify(imageItem));

    const storageLength = sessionStorage.length < 10;

    const isEmpty = !CheckRequiredDocuments() && !CheckVehicleDocuments(vehicleKeys) && !storageLength;
    setIsSubmitButtonDisabled(!isEmpty);
  };

  const OnSubmitRequirementsHandler = () => {
    if (sessionStorage.length !== 0 && location.state) {
      RequestBody();
      for (const key in sessionStorage) {
        if (Object.hasOwnProperty.call(sessionStorage, key)) {
          const element = sessionStorage[key];
          setshowModal(true)
          setModalProps({
            title:"We have received your application",
            message: `Our ML Loans Team will be reviewing the information submitted. You
            will receive a message from us in 3-5 business days.`
          });
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
              carInsurance={GetSessionDocument("Vehicle Insurance")}
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
