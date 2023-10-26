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
  CustomAlert,
  CustomConfirmation,
  CustomLoadingModal,
} from "./index";
import { GetSessionDocument } from "../utils/DataFunctions";
import { CreateCustomerDetailsToSymph, SearchKyc } from "../api/symph.api";
import { AddLoan } from "../api/mlloan.api";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [confimationProps, setConfimationProps] = useState({});
  const [showLoading, setShowLoading] = useState({
    loading: false,
    text: "",
  });

  let vehicleKeys = [
    "Orginal OR/CR",
    "Set stencils",
    "Vehicle Insurance",
    "Front Side",
    "Back Side",
    "Right Side",
    "Left Side",
  ];

  useEffect(() => {
    if (location.state == null) {
      navigate(-1);
    }
    const storageLength = sessionStorage.length < 10;

    const isCheckEmpty =
      !CheckRequiredDocuments() &&
      !CheckVehicleDocuments(vehicleKeys) &&
      !storageLength;
    setIsSubmitButtonDisabled(!isCheckEmpty);
  }, [optionValue, isSubmitButtonDisabled, sessionStorage]);

  const VehicleJsonData = () => {
    return {
      original_or:
        JSON.parse(sessionStorage.getItem("Orginal OR/CR"))?.imageName || "",
      stencils: JSON.parse(sessionStorage.getItem("Set stencils"))?.imageName || "",
      car_insurance:
        JSON.parse(sessionStorage.getItem("Vehicle Insurance"))?.imageName || "",
      front_side: JSON.parse(sessionStorage.getItem("Front Side"))?.imageName || "",
      back_side: JSON.parse(sessionStorage.getItem("Back Side"))?.imageName || "",
      right_side: JSON.parse(sessionStorage.getItem("Right Side"))?.imageName || "",
      left_side: JSON.parse(sessionStorage.getItem("Left Side"))?.imageName || "",
    }
  }
  const EmploymentJsonData = () => {
    return {
      valid_id: JSON.parse(sessionStorage.getItem("Valid ID"))?.imageName || "",
      employee_cert:
        JSON.parse(sessionStorage.getItem("Employee Certificate"))?.imageName || "",
      payslip: JSON.parse(sessionStorage.getItem("Payslip/ITR"))?.imageName || "",
      mayor_cert:
        JSON.parse(sessionStorage.getItem("Mayor’s Certificate"))?.imageName || "",
      bank_cert:
        JSON.parse(sessionStorage.getItem("Bank Statement"))?.imageName || "",
    }
  }
  const CustomerDetailsJsonData = (details, ckyc) => {
    return {
      customer_id: ckyc.customer_id,
      ckyc_id: ckyc.ckyc_id,
      last_name: ckyc.lastname,
      first_name: ckyc.firstname,
      middle_name: ckyc.middlename,
      suffix: ckyc.suffix,
      birth_date: ckyc.birthdate,
      nationality: ckyc.nationality,
      civil_status: ckyc.civil_status,
      employer: details.employeer_business,
      nature_of_business: details.nature_business,
      tenure_length: details.tenure,
      office_address: details.office_address,
      office_landline: details.office_landline,
      source_of_income: details.sourceOfIncome,
      gross_monthly_income: details.monthly_income,
      current_address: details.current_address,
      mobile_number: ckyc.mobile_number,
      email: ckyc.email,
      
    }
  }
  const LoanApplicationJsonData = (vehicleDetails, loan_type, preferredBranch) => {
    
    const dateInstance = new Date();

    const year = dateInstance.getFullYear().toString();
    const month = (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString();
    const day = ("0" + dateInstance.getDate()).slice(-2).toString();

    const dateNow = `${year}-${month}-${day}`;

    const request = {
        vehicle_type:vehicleDetails.selectedVehicle,
        loan_type:vehicleDetails.type,
        application_loan_type: loan_type,
        application_date: dateNow,
        principal_amount:vehicleDetails.principalAmount,
        terms:vehicleDetails.terms,
        color: vehicleDetails.color,
        interest:vehicleDetails.interest,
        year:vehicleDetails.year,
        make:vehicleDetails.make,
        model:vehicleDetails.model,
        variant:vehicleDetails.variant ? vehicleDetails.variant : null,
        plate_number:vehicleDetails.plateNo ?vehicleDetails.plateNo : null,
        engine_number:vehicleDetails.engineNo ?vehicleDetails.engineNo : null,
        chassis_number:vehicleDetails.chassisNo ?vehicleDetails.chassisNo : null,
        preferred_branch: preferredBranch,
      
    };

    return request;
  };

  const CheckRequiredDocuments = () => {
    let requiredItems = [];
    let Keys = [];

    if (optionValue === "Self-Employed") {
      Keys = ["Valid ID", "Mayor’s Certificate", "Bank Statement"];
    } else if (optionValue === "Employed") {
      Keys = ["Valid ID", "Employee Certificate", "Payslip/ITR"];
    }

    for (let key of Keys) {
      const value = JSON.parse(sessionStorage.getItem(key));
      requiredItems.push(value?.url);
    }

    return (
      requiredItems?.includes("") ||
      requiredItems?.includes(null) ||
      requiredItems?.includes(undefined)
    );
  };

  const CheckVehicleDocuments = (Keys) => {
    let vehicleItems = [];

    for (let key of Keys) {
      const value = JSON.parse(sessionStorage.getItem(key));

      vehicleItems.push(value?.url);
    }
    return vehicleItems?.includes("");
  };

  const OnOptionChange = (optionVal) => {
    setOptionValue(optionVal);
  };

  const OnImageSubmitHandler = (imageName, documentName, url, imageContent) => {
    let imageItem = { imageName, url, documentName, imageContent };
    sessionStorage.setItem([modalTitle], JSON.stringify(imageItem));

    const storageLength = sessionStorage.length < 10;

    const isEmpty =
      !CheckRequiredDocuments() &&
      !CheckVehicleDocuments(vehicleKeys) &&
      !storageLength;
    setIsSubmitButtonDisabled(!isEmpty);
  };

  const AddKyc = async () => {
    // Symph DB
      try {
        const personalDetails =
          location.state.secondStepDetails.personalDetails;

        const { email, mobile_number } = personalDetails[0];
        const {
          firstname,
          lastname,
          suffix,
          middlename,
          countries,
          provinces,
          cities,
        } = personalDetails[1];

        const country = countries.split("|")[1].trim();
        const province = provinces.split("|")[1].trim();
        const city = cities.split("|")[1].trim();

        const customerDataToSymph = {
          mobileNumber: mobile_number,
          firstName: firstname,
          lastName: lastname,
          middleName: middlename !== '' ? middlename : "null",
          suffix: suffix !== '' ? suffix : "null",
          email: email,
          address: {
            addressL0Id: parseInt(country),
            addressL1Id: parseInt(province),
            addressL2Id: parseInt(city),
            // otherAddress: "",
            // zipCode: "",
          },
        };

       return await CreateCustomerDetailsToSymph(customerDataToSymph);

      } catch (error) {

        throw error
        // if (error.response && error.response.status === 401) {
        //   setShowAlert(true);
        //   setAlertProps({
        //     title: "Invalid JWT Token",
        //     text: "The access token passed in the authorization header is invalid or expired. Please obtain a new access token.",
        //     isError: true,
        //   });
        //   return;
        // } else if (error.response && error.response.status === 409) {
        //   setShowAlert(true);
        //   setAlertProps({
        //     title: "Customer Already Exists",
        //     text: "As an existing ML Wallet user, you can proceed by logging-in using this mobile number.",
        //     isError: true,
        //   });
        //   return;
        // } else {
        //   setShowAlert(true);
        //   setAlertProps({
        //     title: "Error",
        //     text: "Failed to add customer details.",
        //     isError: true,
        //   });
        //   return;
        // }
      }
  }
  const ConfirmApplication = () => {
    setShowConfirm(true)
    setConfimationProps({
      title: "Submit Application?",
      message: "Please make sure that all the details provided are correct.",
      confirmBtn: "Submit"
    })
  }

  const OnSubmitRequirementsHandler = async () => {
    setShowConfirm(false);
    setShowLoading({
      loading: true,
      text: "Just a moment",
    });

    if (sessionStorage.length !== 0 && location.state) {

      const mobileNumber = location.state.secondStepDetails.personalDetails[0].mobile_number;
      const email = location.state.secondStepDetails.personalDetails[0].email;
      const perDetails = location.state.secondStepDetails.personalDetails[1];
      // TODO: Check KYC

      try {
        let ckyc = {};
        let hatchitReqBody = {};

        const isKycExist = await SearchKyc(mobileNumber, email);

        // Details: If not existing Symph DB
        if (isKycExist.data.data == null && isKycExist.data.code == "SUCCESS") {
          
          await AddKyc();
          
          const responseSearchKyc = await SearchKyc(mobileNumber, email);

          const kyc = responseSearchKyc.data.data;

          // setTimeout(() => {
            ckyc = {
              customer_id: kyc.customerId,
              ckyc_id: kyc.ckycId,
              lastname: kyc.name.lastName,
              firstname: kyc.name.firstName,
              middlename: kyc.name.middleName,
              suffix: kyc.name.suffix,
              nationality: perDetails.nationality,
              civil_status: perDetails.civil_status,
              birthdate: perDetails.birthdate,
              mobile_number: kyc.cellphoneNumber,
              email: kyc.email,
              
            }
            hatchitReqBody = {
              country: kyc.addresses.current.addressL0Name,
              province: kyc.addresses.current.addressL1Name,
              city: kyc.addresses.current.addressL2Name,
              barangay: perDetails.barangay
            }
          // }, 1500);

        }else{
          const responseKyc = isKycExist.data.data;
          ckyc = {
            customer_id: responseKyc.customerId,
            ckyc_id: responseKyc.ckycId,
            lastname: responseKyc.name.lastName,
            firstname: responseKyc.name.firstName,
            middlename: responseKyc.name.middleName,
            suffix: responseKyc.name.suffix,
            nationality: perDetails.nationality,
            civil_status: perDetails.civil_status,
            birthdate: perDetails.birthdate,
            mobile_number: responseKyc.cellphoneNumber,
            email: responseKyc.email
          }

          hatchitReqBody = {
            country: responseKyc.addresses.current.addressL0Name,
            province: responseKyc.addresses.current.addressL1Name,
            city: responseKyc.addresses.current.addressL2Name,
            barangay: perDetails.barangay
          }
        }
        
        //   //Details: If not, proceed ML DB
        const baseData = location.state.secondStepDetails;
        const address = baseData.personalDetails[3];
        const customer = baseData.personalDetails[1];
        customer.current_address = address;
        
        const preferredBranch = baseData.personalDetails[2];
        
        const vehicleDetails = baseData.vehicleDetails
        
        let loan_type = null;

        if (vehicleDetails?.selectedVehicle === "Car/Pickup/SUV" || vehicleDetails?.selectedVehicle === "Truck/Commercial") {
          loan_type = "Car Loan"
        }else{
          loan_type = "Motorcycle Loan"
        }

        const vehicleDocsData = VehicleJsonData();
        const employmentDocsData = EmploymentJsonData();
        const customerData = CustomerDetailsJsonData(customer, ckyc);
        const loanApplicationData = LoanApplicationJsonData(vehicleDetails, loan_type, preferredBranch)
        
        setShowLoading({
          loading: true,
          text: "We're almost there!",
        });
        
      //   // ML DB
        const  AddMLLoan = await AddLoan(
            vehicleDocsData,
            employmentDocsData, 
            customerData, 
            loanApplicationData,
            hatchitReqBody
        );

          location.state = null
          // sessionStorage.clear();
          
          setTimeout(() => {
            setShowLoading({
              loading: false,
              text: "Just a moment",
            });
            navigate(`/vehicle-loan/receipt`, {
              state: {
                LoanDetails: {
                    Loan: JSON.stringify(AddMLLoan),
                    LoanType: loan_type
                  }
              },
              replace: true
            })
       }, 2000);


      } catch (error) {
        setShowLoading({
          loading: false,
          text: "Just a moment",
        });
        if (error.status == 409) {
          
          setShowAlert(true);
          setAlertProps({
            title: error.statusText,
            text: error.data.message || "An error occurred",
            subTitle: error.data.subtitle || "",
            isError: true
          });
        }else{
          setShowAlert(true);
          setAlertProps({
            title: "Error",
            text: error.message || "An error occurred",
            subTitle: "",
            isError: true
          });
        }
      }
    }
  };
  const LoadingIcon = (
    <div className="spinner-icon">
      <svg viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
          stroke="var(--red)"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 100;100 100;100 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );

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

          <div className="apply-btn">
            <CustomButton
              btnType="submit"
              name="Submit"
              styles={isSubmitButtonDisabled ? "btn-disabled" : "btn-enabled"}
              disabled={isSubmitButtonDisabled}
              EventHandler={ConfirmApplication}
            ></CustomButton>
          </div>
        </div>
      </div>
      {showModal && (
        <SuccessModal
          hideModal={setshowModal}
          title={modalProps.title}
          message={modalProps.message}
        />
      )}

      {showAlert && (
        <CustomAlert
          title={alertProps.title}
          text={alertProps.text}
          subtitle={alertProps.subTitle ? alertProps.subTitle : ""}
          isError={alertProps.isError}
          onClose={() => setShowAlert(false)}
        />
      )}
      {
        showConfirm && (
          <CustomConfirmation
          title={confimationProps.title}
          message={confimationProps.message}
          onClose={() => setShowConfirm(false)}
          onConfirm={OnSubmitRequirementsHandler}
          confirmBtn={confimationProps.confirmBtn}
          />
        )
      }
      {showLoading.loading ? (
        <CustomLoadingModal
          loadingText={showLoading.text}
          loadingIcon={LoadingIcon}
        />
      ) : (
        <></>
      )}
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
