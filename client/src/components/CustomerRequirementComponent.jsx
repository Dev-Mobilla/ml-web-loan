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
  OTPModalComponent,
} from "./index";
import { GetSessionDocument } from "../utils/DataFunctions";
import { CreateCustomerDetailsToSymph, SearchKyc, GetOTP } from "../api/symph.api";
import { AddLoan } from "../api/mlloan.api";

const CustomerRequirementComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { modalOpen, modalTitle, modalDefaultGuideImage, closeModal } =
    useModal();
  const [mobileNumber, setMobileNumber] = useState(null);

  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOtpCorrect, setIsOtpCorrect] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);
  const [modalProps, setModalProps] = useState(null);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLoading, setShowLoading] = useState({
    loading: false,
    text: "",
  });

  let ckycBody = {};
  let hatchitReqBody = {};

  let vehicleKeys = [
    "Orginal OR/CR",
    "Set stencils",
    "Vehicle Insurance",
    "Front Side",
    "Back Side",
    "Right Side",
    "Left Side",
  ];

  const handleCancel = () => {
    setShowConfirm(false);
    setShowOTP(false);
    setShowLoading(false)
  };

  useEffect(() => {
    if (location.state == null) {
      navigate(-1);
    }
    setMobileNumber(location.state.loan.personalDetails.contactDetails.mobile_number)
    const storageLength = sessionStorage.length < 10;

    const isCheckEmpty =
      !CheckRequiredDocuments() &&
      !CheckVehicleDocuments(vehicleKeys) &&
      !storageLength;
    setIsSubmitButtonDisabled(!isCheckEmpty);
  }, [optionValue, isSubmitButtonDisabled, sessionStorage]);

  const LoanDocsJsonData = () => {
    return {
      original_or:
        JSON.parse(sessionStorage.getItem("Orginal OR/CR"))?.imageName || "",
      stencils:
        JSON.parse(sessionStorage.getItem("Set stencils"))?.imageName || "",
      car_insurance:
        JSON.parse(sessionStorage.getItem("Vehicle Insurance"))?.imageName ||
        "",
      front_side:
        JSON.parse(sessionStorage.getItem("Front Side"))?.imageName || "",
      back_side:
        JSON.parse(sessionStorage.getItem("Back Side"))?.imageName || "",
      right_side:
        JSON.parse(sessionStorage.getItem("Right Side"))?.imageName || "",
      left_side:
        JSON.parse(sessionStorage.getItem("Left Side"))?.imageName || "",
      cct_no: "",
      property_map: "",
      land_title: "",
      property_description: "",
      
    };
  };
  const EmploymentJsonData = () => {
    return {
      valid_id: JSON.parse(sessionStorage.getItem("Valid ID"))?.imageName || "",
      employee_cert:
        JSON.parse(sessionStorage.getItem("Employee Certificate"))?.imageName ||
        "",
      payslip:
        JSON.parse(sessionStorage.getItem("Payslip/ITR"))?.imageName || "",
      mayor_cert:
        JSON.parse(sessionStorage.getItem("Mayor’s Certificate"))?.imageName ||
        "",
      bank_cert:
        JSON.parse(sessionStorage.getItem("Bank Statement"))?.imageName || "",
    };
  };
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
    };
  };
  const LoanApplicationJsonData = (
    vehicleDetails,
    loan_type,
    preferredBranch
  ) => {
    const dateInstance = new Date();

    const year = dateInstance.getFullYear().toString();
    const month = ("0" + (dateInstance.getMonth() + 1)).slice(-2).toString();
    const day = ("0" + dateInstance.getDate()).slice(-2).toString();

    const dateNow = `${year}-${month}-${day}`;

    const request = {
      vehicle_type: vehicleDetails.selectedVehicle,
      loan_type: vehicleDetails.loantype,
      application_loan_type: loan_type,
      application_date: dateNow,
      principal_amount: vehicleDetails.principalAmount,
      terms: vehicleDetails.terms,
      color: vehicleDetails.color,
      interest: 0.015,
      year: vehicleDetails.year,
      make: vehicleDetails.make,
      model: vehicleDetails.model,
      variant: vehicleDetails.variant ? vehicleDetails.variant : null,
      plate_number: vehicleDetails.plateNo ? vehicleDetails.plateNo : null,
      engine_number: vehicleDetails.engineNo ? vehicleDetails.engineNo : null,
      chassis_number: vehicleDetails.chassisNo
        ? vehicleDetails.chassisNo
        : null,
      preferred_branch: preferredBranch,
      residence_type: "",
      stay_length: "",
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

  const personalDetails = location.state.loan.personalDetails;

  const contactDetails = personalDetails.contactDetails;
  const {
    firstname,
    lastname,
    suffix,
    middlename,
    countries,
    provinces,
    cities,
  } = personalDetails.informationDetails;

  const AddKyc = async (otpCode) => {
    // Symph DB
    try {

      const country = countries.split("|")[1].trim();
      const province = provinces.split("|")[1].trim();
      const city = cities.split("|")[1].trim();

      const customerDataToSymph = {
        mobileNumber: contactDetails.mobile_number,
        otpCode: otpCode,
        firstName: firstname,
        lastName: lastname,
        middleName: middlename !== "" ? middlename : "",
        suffix: suffix !== "" ? suffix : "",
        email:  contactDetails.email,
        address: {
          addressL0Id: parseInt(country),
          addressL1Id: parseInt(province),
          addressL2Id: parseInt(city),
        },
      };

      return await CreateCustomerDetailsToSymph(customerDataToSymph);
    } catch (error) {
      throw error;
    }
  };

  const GetOTPCode = async () => {
    try {
      const response = await GetOTP(mobileNumber);

      return response
    } catch (error) {
      throw error
    }
  }

  const GetResendOTPCode = async () => {
    try {
      const response = await GetOTP(mobileNumber);

      return response
    } catch (error) {
      setShowLoading(false);
      setShowOTP(false)
      if (error.response.status == 500) {
        if (error.response.data.error.code === "ERR_SMS_OTP") {
          setShowAlert(true);
          setAlertProps({
            title: error.response.data.error.message.title,
            text: error.response.data.error.message.body,
            subTitle: "",
            isError: true,
          });
        }else{
          setShowAlert(true);
          setAlertProps({
            title: "Request Failed",
            text: "We're sorry, something went wrong on our end. Please try again later or contact our support team.",
            subTitle: "",
            isError: true,
          });
        }
      }else{
        setShowAlert(true);
        setAlertProps({
          title: "Request Failed",
          text: "We're sorry, something went wrong on our end. Please try again later or contact our support team.",
          subTitle: "",
          isError: true,
        });
      }
      
    }
  }

  const ConfirmApplication = () => {
    setShowConfirm(true);
  };

  const handleOtpSubmit = async (optionVal) => {

    try {
      if (!optionVal) {
        setShowOTP(false);
  
        let error = {
          status: 400,
          code: "INVALID_OTP_PROVIDED",
          data: {
            message: {
              title: "Invalid OTP",
              body: "Looks like you've entered an invalid OTP. Please try again."
            }
          }
        }
        throw error
      }else{
        setShowOTP(false);
        setShowLoading({
          loading: true,
          text: "Just a moment",
        });

        await AddKyc(optionVal);
  
        const responseSearchKyc = await SearchKyc({
          cellphoneNumber: mobileNumber,
        });
  
        const kyc = responseSearchKyc.data.data;

        const baseData = location.state.loan;

        const vehicle_details = baseData.loanDetails.vehicleDetails;
        vehicle_details.loantype = baseData.loanDetails.loantype.replace("-", " ");

        const customer = personalDetails.informationDetails;
        customer.current_address = `${vehicle_details.otherAddress} ${vehicle_details.barangay} ${vehicle_details.city} ${vehicle_details.province} ${vehicle_details.country}`;

        const preferredBranch = personalDetails.selectedOption;

        let loan_type = null;

        if (
          vehicle_details?.selectedVehicle === "Car/Pickup/SUV" ||
          vehicle_details?.selectedVehicle === "Truck/Commercial"
        ) {
          loan_type = "Car Loan";
        } else if (vehicle_details?.selectedVehicle === "Motorcycle") {
          loan_type = "Motor Loan";
        }
  
        ckycBody = {
          customer_id: kyc.customerId,
          ckyc_id: kyc.ckycId,
          lastname: kyc.name.lastName,
          firstname: kyc.name.firstName,
          middlename: kyc.name.middleName,
          suffix: kyc.name.suffix,
          nationality: customer.nationality,
          civil_status: customer.civil_status,
          birthdate: customer.birthdate,
          mobile_number: kyc.cellphoneNumber,
          email: kyc.email,
        };

        hatchitReqBody = {
          country: kyc.addresses.current.addressL0Name,
          province: kyc.addresses.current.addressL1Name,
          city: kyc.addresses.current.addressL2Name,
          barangay: customer.barangay,
        };

        const loanDocsData = LoanDocsJsonData();
        const employmentDocsData = EmploymentJsonData();
        const customerData = CustomerDetailsJsonData(customer, ckycBody);
        const loanApplicationData = LoanApplicationJsonData(
          vehicle_details,
          loan_type,
          preferredBranch
        );

        // ML DB
        const AddMLLoan = await AddLoan(
          loanDocsData,
          employmentDocsData,
          customerData,
          loanApplicationData,
          hatchitReqBody
        );

        location.state = null;
        sessionStorage.clear();

        setTimeout(() => {
          setShowLoading({
            loading: false,
            text: "Just a moment",
          });
          navigate(`/apply-loan/receipt`, {
            state: {
              LoanDetails: {
                Loan: JSON.stringify(AddMLLoan),
                LoanType: loan_type,
              },
            },
            replace: true,
          });
        }, 1500);
      }
    } catch (error) {
      setShowOTP(false);
      setShowLoading({
        loading: false,
        text: "Just a moment",
      });
      if (error.status == 401 && error.data?.code == "INVALID_OTP") {
        error.code = "INVALID_OTP"
        ErrorHandler(error);
      }else if (error.status == 500 && error.data?.code == "INVALID_OTP") {
        error.code = "INVALID_OTP"
        ErrorHandler(error);
      }
      else if (error.status == 409) {
          ErrorHandler(error);
      }else if (error.code == "ERR_NETWORK") {
        ErrorHandler(error);
      }
      else{
        ErrorHandler(error.response);
      }
    }
  };

  const ErrorHandler = (error) => {
    if (error.status == 409) {
      setShowAlert(true);
      setAlertProps({
        title: "Request Failed",
        text: error.data.message || "An error occurred",
        subTitle: error.data.subtitle || "",
        subLink: true,
        isError: true,
      });
    }else if (error.status == 502) {
      setShowAlert(true);
      setAlertProps({
        title: "Request Failed",
        text:
          "We're sorry, something went wrong on our end. Please try again later or contact our support team." ||
          "An error occurred",
        subTitle: "",
        isError: true,
      });
    }
    else {
      if (error.code == "ERR_BAD_RESPONSE") {
        setShowAlert(true);
        setAlertProps({
          title: error.response.data.error.message.title,
          text:
            error.response.data.error.message.body || "An error occurred",
          subTitle: "",
          isError: true,
        });
      } else if (error.code == "ERR_NETWORK") {
        setShowAlert(true);
        setAlertProps({
          title: "Request Failed",
          text:
            "We're sorry, something went wrong on our end. Please try again later or contact our support team." ||
            "An error occurred",
          subTitle: "",
          isError: true,
        });
      } else if (error.code == "INVALID_OTP") {
          setShowAlert(true);
          setAlertProps({
            title: "Invalid OTP",
            text: error.data.message,
            subTitle: "",
            isError: true,
          });
      }
      else if (error.data.error.code == "INTERNAL_SERVER_ERROR") {
        setShowAlert(true);
        setAlertProps({
          title: error.data.error.message.title,
          text: error.data.error.message.body || "An error occurred",
          subTitle: "",
          isError: true,
        });
      } else if (error.code === "INVALID_OTP_PROVIDED") {
        setShowAlert(true);
        setAlertProps({
          title: error.data.message.title,
          text: error.data.message.body,
          subTitle: "",
          isError: true,
        });
      }else {
        
        setShowAlert(true);
        setAlertProps({
          title: "Error",
          text: error.data.message || "An error occurred",
          subTitle: "",
          isError: true,
        });
      }
    }
  }

  const OnSubmitRequirementsHandler = async () => {
    setShowConfirm(false);
    setShowLoading({
      loading: true,
      text: "Just a moment",
    });

    if (sessionStorage.length !== 0 && location.state) {
      const mobileNumber = contactDetails.mobile_number;
      const email = contactDetails.email;
      // TODO: Check KYC

      try {

        const isKycExist = await SearchKyc({
          cellphoneNumber: mobileNumber,
          email,
        });
        //   //Details: If not, proceed ML DB
        const baseData = location.state.loan;

        const vehicle_details = baseData.loanDetails.vehicleDetails;
        vehicle_details.loantype = baseData.loanDetails.loantype.replace("-", " ");

        const customer = personalDetails.informationDetails;
        customer.current_address = `${vehicle_details.otherAddress} ${vehicle_details.barangay} ${vehicle_details.city} ${vehicle_details.province} ${vehicle_details.country}`;

        const preferredBranch = personalDetails.selectedOption;

        let loan_type = null;

        if (
          vehicle_details?.selectedVehicle === "Car/Pickup/SUV" ||
          vehicle_details?.selectedVehicle === "Truck/Commercial"
        ) {
          loan_type = "Car Loan";
        } else if (vehicle_details?.selectedVehicle === "Motorcycle") {
          loan_type = "Motor Loan";
        }

        setShowLoading({
          loading: true,
          text: "We're almost there!",
        });

        // Details: If not existing Symph DB
        if (isKycExist.data.data == null && isKycExist.data.code == "SUCCESS") {
          setShowOTP(true);
          await GetOTPCode();

        } else {
          const responseKyc = isKycExist.data.data;

          ckycBody = {
            customer_id: responseKyc.customerId,
            ckyc_id: responseKyc.ckycId,
            lastname: responseKyc.name.lastName,
            firstname: responseKyc.name.firstName,
            middlename: responseKyc.name.middleName,
            suffix: responseKyc.name.suffix,
            nationality: customer.nationality,
            civil_status: customer.civil_status,
            birthdate: customer.birthdate,
            mobile_number: responseKyc.cellphoneNumber,
            email: responseKyc.email,
          };

          hatchitReqBody = {
            country: responseKyc.addresses.current.addressL0Name,
            province: responseKyc.addresses.current.addressL1Name,
            city: responseKyc.addresses.current.addressL2Name,
            barangay: customer.barangay,
            address: customer.current_address
          };

          const loanDocsData = LoanDocsJsonData();
          const employmentDocsData = EmploymentJsonData();
          const customerData = CustomerDetailsJsonData(customer, ckycBody);
          const loanApplicationData = LoanApplicationJsonData(
            vehicle_details,
            loan_type,
            preferredBranch
          );

          // ML DB
          const AddMLLoan = await AddLoan(
            loanDocsData,
            employmentDocsData,
            customerData,
            loanApplicationData,
            hatchitReqBody
          );

          location.state = null;
          sessionStorage.clear();

          setTimeout(() => {
            setShowLoading({
              loading: false,
              text: "Just a moment",
            });
            navigate(`/apply-loan/receipt`, {
              state: {
                LoanDetails: {
                  Loan: JSON.stringify(AddMLLoan),
                  LoanType: loan_type,
                },
              },
              replace: true,
            });
          }, 1500);
        }
        
      } catch (error) {
        setShowOTP(false);
        setShowLoading({
          loading: false,
          text: "Just a moment",
        });
        if (error.status == 401 && error.data?.code == "INVALID_OTP") {
          error.code = "INVALID_OTP"
          ErrorHandler(error);
        }else if (error.code == "ERR_NETWORK") {
          ErrorHandler(error);
        }
        else{
          ErrorHandler(error.response);
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
      {showAlert && (
        <CustomAlert
          title={alertProps.title}
          text={alertProps.text}
          subtitle={alertProps.subTitle ? alertProps.subTitle : ""}
          isError={alertProps.isError}
          subLink={alertProps.subLink}
          onClose={() => setShowAlert(false)}
        />
      )}

      {showConfirm && (
        <CustomConfirmation
          title="Submit Application?"
          message="Please make sure that all the details provided are correct."
          onClose={() => setShowConfirm(false)}
          onConfirm={OnSubmitRequirementsHandler}
          confirmBtn="Submit"
        />
      )}

      {showOTP && (
        <OTPModalComponent
          time={60}
          HandleSubmitOTP={handleOtpSubmit}
          HandleCancel={handleCancel}
          number={mobileNumber}
          HandleResendOTP={GetResendOTPCode}
        />
      )}

      {showSuccess && (
        <SuccessModal
          hideModal={() => setShowSuccess(false)}
          title={modalProps.title}
          message={modalProps.message}
        />
      )}

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
