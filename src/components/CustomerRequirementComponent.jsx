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
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [orginalORCRUploaded, setOrginalORCRUploaded] = useState(false);
  const [stencilsUploaded, setSetStencilsUploaded] = useState(false);
  const [carInsuranceUploaded, setCarInsuranceUploaded] = useState(false);
  const [frontSideUploaded, setFrontSideUploaded] = useState(false);
  const [backSideUploaded, setBackSideUploaded] = useState(false);
  const [leftSideUploaded, setLeftSideUploaded] = useState(false);
  const [rightSideUploaded, setRightSideUploaded] = useState(false);
  const [validIdUploaded, setValidIdUploaded] = useState(false);
  const [employeeCertificateUploaded, setEmployeeCertificateUploaded] = useState(false);
  const [paySlipUploaded, setPaySlipUploaded] = useState(false);
  const [mayorCertificateUploaded, setMayorCertificateUploaded] = useState(false);
  const [bankStatementUploaded, setBankStatementUploaded] = useState(false);
  const [mayorCertificateRequired, setMayorCertificateRequired] = useState(true); 
  const [bankStatementRequired, setBankStatementRequired] = useState(true);
  const [optionValue, setOptionValue] = useState("");

  // const { secondStepDetails } = location.state || {};

  // const thirdStepDetails = {
  //   secondStepDetails: secondStepDetails,
  // };

  // localStorage.setItem("SecondStepDetails", JSON.stringify(thirdStepDetails));

    // Check if all required images are uploaded
    useEffect(() => {
      let isAllImagesUploaded = false;
  
      if (optionValue === "Self-Employed") {
        isAllImagesUploaded =
          orginalORCRUploaded &&
          stencilsUploaded &&
          carInsuranceUploaded &&
          frontSideUploaded &&
          backSideUploaded &&
          leftSideUploaded &&
          rightSideUploaded &&
          validIdUploaded &&
          mayorCertificateUploaded &&
          bankStatementUploaded
      } else if (optionValue === "Employed") {
        isAllImagesUploaded =
          orginalORCRUploaded &&
          stencilsUploaded &&
          carInsuranceUploaded &&
          frontSideUploaded &&
          backSideUploaded &&
          leftSideUploaded &&
          rightSideUploaded &&
          validIdUploaded &&
          employeeCertificateUploaded &&
          paySlipUploaded;
      }
    
      setIsSubmitButtonDisabled(!isAllImagesUploaded);
    }, [
      orginalORCRUploaded,
      stencilsUploaded,
      carInsuranceUploaded,
      frontSideUploaded,
      backSideUploaded,
      leftSideUploaded,
      rightSideUploaded,
      validIdUploaded,
      employeeCertificateUploaded,
      paySlipUploaded,
      mayorCertificateUploaded,
      bankStatementUploaded,
      optionValue,
      mayorCertificateRequired,
      bankStatementRequired,
    ]);

  // useEffect(() => {
  //   checkAllImagesUploaded();
  // }, []);

  const OnImageSubmitHandler = (imageName, documentName, url) => {

    let imageItem = { imageName, url, documentName };

    sessionStorage.setItem([modalTitle], JSON.stringify(imageItem));
    if (documentName === "Orginal OR/CR") {
      setOrginalORCRUploaded(true);
    } else if (documentName === "Set stencils") {
      setSetStencilsUploaded(true);
    } else if (documentName === "Car Insurance") {
      setCarInsuranceUploaded(true);
    } else if (documentName === "Front Side") {
      setFrontSideUploaded(true);
    } else if (documentName === "Back Side") {
      setBackSideUploaded(true);
    } else if (documentName === "Right Side") {
      setRightSideUploaded(true);
    } else if (documentName === "Left Side") {
      setLeftSideUploaded(true);
    } else if (documentName === "Valid ID") {
      setValidIdUploaded(true);
    } else if (documentName === "Employee Certificate") {
      setEmployeeCertificateUploaded(true);
    } else if (documentName === "Payslip/ITR") {
      setPaySlipUploaded(true);
    }
      else if (documentName === "Mayor's Certificate") {
      setMayorCertificateUploaded(true);
    } else if (documentName === "Bank Statement") {
      setBankStatementUploaded(true);
    }
  };

  const OnSubmitRequirementsHandler = () => {
    console.log('requirements');

        const isAllImagesUploaded =
        orginalORCRUploaded &&
        stencilsUploaded &&
        carInsuranceUploaded &&
        frontSideUploaded &&
        backSideUploaded &&
        leftSideUploaded &&
        rightSideUploaded &&
        validIdUploaded &&
        (employeeCertificateUploaded || !mayorCertificateRequired) &&
        (paySlipUploaded || !bankStatementRequired) &&
        (mayorCertificateUploaded || !employeeCertificateUploaded) &&
        (bankStatementUploaded || !paySlipUploaded);

      if (isAllImagesUploaded) {
        console.log("Successfully submitted"); // Display success modal
      } else {
        console.log("Fail"); // Handle submission failure
      }
  }
  const OnOptionChange = (optionVal) => {
    setOptionValue(optionVal);
    if (optionVal === "Self-Employed") {
      setMayorCertificateRequired(true);
      setBankStatementRequired(true);
    } else if (optionVal === "Employed") {
      setMayorCertificateRequired(false);
      setBankStatementRequired(false);
    }
  }

  const buttonClassName = isSubmitButtonDisabled ? "btn-disabled" : "btn-enabled";
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
              styles={buttonClassName}
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
