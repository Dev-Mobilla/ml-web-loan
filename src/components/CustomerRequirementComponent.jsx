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
import { CheckSessionStorage, GetSessionDocument } from "../utils/DataFunctions";

const CustomerRequirementComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { modalOpen, modalTitle, modalDefaultGuideImage, closeModal } =
    useModal();
  const [showModal, setshowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);
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
  const [mayorCertificateRequired, setMayorCertificateRequired] = useState(false);
  const [bankStatementRequired, setBankStatementRequired] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  let Keys = [];

  const OnImageSubmitHandler = (imageName, documentName, url) => {

    let imageItem = { imageName, url, documentName };

    sessionStorage.setItem([modalTitle], JSON.stringify(imageItem));
    if (documentName === "Orginal OR/CR") {
      setOrginalORCRUploaded(true);
    } if (documentName === "Set stencils") {
      setSetStencilsUploaded(true);
    } if (documentName === "Car Insurance") {
      setCarInsuranceUploaded(true);
    } if (documentName === "Front Side") {
      setFrontSideUploaded(true);
    } if (documentName === "Back Side") {
      setBackSideUploaded(true);
    } if (documentName === "Right Side") {
      setRightSideUploaded(true);
    } if (documentName === "Left Side") {
      setLeftSideUploaded(true);
    } if (documentName === "Valid ID") {
      setValidIdUploaded(true);
    } if (documentName === "Employee Certificate" || documentName === "Payslip/ITR") {
      setEmployeeCertificateUploaded(false);
      setPaySlipUploaded(true);
    } if (documentName === "Bank Statement" || documentName === "Mayor's Certificate") {
      setBankStatementUploaded(true);
      setMayorCertificateUploaded(true);
    }
  };
  useEffect(() => {
    console.log(location);
    if (location.state == null) {
      navigate('/vehicle-loan/loan-type/new');
    }
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
        bankStatementUploaded;
      Keys = ["Valid ID", "Mayor’s Certificate", "Bank Statement"];
    }
    if (optionValue === "Employed") {
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
      Keys = ["Valid ID", "Employee Certificate", "Payslip/ITR"];
    }
    isDIsabledSubmitButton(Keys);
    setIsSubmitButtonDisabled(isDisabled);
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
    isDisabled,
    isSubmitButtonDisabled,
  ]);

  const isDIsabledSubmitButton = (Keys) => {
    try {
      for (let key of Keys) {
        const value = sessionStorage.getItem(key);
        if (value == null) {
          setIsDisabled(true);
        } else {
          const sessionObj = JSON.parse(value);
          if (sessionObj && sessionObj.url === "") {
            setIsDisabled(true);
            break;
          } else {
            setIsDisabled(false);
          }
        }
      }
    } catch (error) {
      setIsDisabled(true);
    }
  }

  const OnSubmitRequirementsHandler = () => {

    const isAllImagesUploaded =
      orginalORCRUploaded &&
      stencilsUploaded &&
      carInsuranceUploaded &&
      frontSideUploaded &&
      backSideUploaded &&
      leftSideUploaded &&
      rightSideUploaded &&
      validIdUploaded;

    if (isAllImagesUploaded) {

    } else {
      const props = {
        title: "Requirements",
        text: "Please put the Required Documents",
        isError: true,
      };
      setAlertProps(props);
      setShowAlert(true);
    }
  }

  const OnOptionChange = (optionVal) => {
    setOptionValue(optionVal);
    if (optionVal === "Self-Employed") {
      setMayorCertificateRequired(true);
      setBankStatementRequired(true);
    }
    if (optionVal === "Employed") {
      setPaySlipUploaded(true);
      setEmployeeCertificateUploaded(true);
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
              disabled={isSubmitButtonDisabled}
              EventHandler={OnSubmitRequirementsHandler}
            ></CustomButton>
          </div>
        </div>
      </div>
      {showModal && <SuccessModal hideModal={setshowModal} />}
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
