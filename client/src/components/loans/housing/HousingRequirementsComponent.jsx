import React, {useEffect, useState} from 'react'
import RequiredDocumentsComponent from '../vehicle/RequiredDocumentsComponent';

import { useNavigate, useLocation } from "react-router-dom";
import {GetSessionDocument} from '../../../utils/DataFunctions';
import {useModal} from '../../../utils/modalContext';
import CustomButton from '../../custom/Custom.button';
import TopbarComponent from '../../layout/TopbarComponent';
import CustomHeader from '../../custom/Custom.header';
import CustomPrevBtn from '../../custom/Custom.prevbtn';
import CustomCardTitle from '../../custom/Custom.cardTitle';
import AddPhotoModal from '../AddPhotoModalComponent';

import PropertyMap from '../../../assets/icons/housing/placeholder.png';
import LandTitle from '../../../assets/icons/housing/key.png';
import PropertyDesc from '../../../assets/icons/housing/magnifying.png';
import {CustomAlert, CustomConfirmation, CustomLoadingModal, CustomRequirementDocsComponent, OTPModalComponent} from '../..';
import {CreateCustomerDetailsToSymph, GetOTP, SearchKyc} from '../../../api/symph.api';
import {AddLoan} from '../../../api/mlloan.api';


const HousingRequirementsComponent = () => {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confimationProps, setConfimationProps] = useState({});
  const { modalOpen, modalTitle, modalDefaultGuideImage, closeModal } =
  useModal();
  const [showLoading, setShowLoading] = useState({
    loading: false,
    text: "",
  });

  const [showOTP, setShowOTP] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  let ckycBody = {};
  let hatchitReqBody = {};

  const [housingDocument, setHousingDocument] = useState([
      {
          name: "TCT No. & CCT",
          icon: "https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64f13348e9f50c7315603815/img/or-cricon@2x.png",
          key: "orDoc",
          value: null
          // value: sessionStorage.getItem("TCT No. & CCT") ? JSON.parse(sessionStorage.getItem("TCT No. & CCT")) : null
      },

      {
          name: "Map of Property",
          icon: PropertyMap,
          key: "mapProperty",
          value: null
          // value: sessionStorage.getItem("Map of Property") ? JSON.parse(sessionStorage.getItem("Map of Property")) : null

      },
      {
          name: "Land Title",
          icon: LandTitle,
          key: "landTitle",
          // value: sessionStorage.getItem("Land Title") ? JSON.parse(sessionStorage.getItem("Land Title")) : null
          value: null
      },
      {
          name: "Property Description",
          icon: PropertyDesc,
          key: "propertyDesc",
          value: null
      }
  ])

  const handleCancel = () => {
    setShowConfirm(false);
    setShowOTP(false);
    setShowLoading(false)
  };
  
  useEffect(() => {

    setHousingDocument((currState) => (
      currState?.map((item, key) => {
        item.value = GetSessionDocument(item.name)
        return item
      })
    ))
  },[setHousingDocument])

  useEffect(() => {
      if (location.state == null) {
        navigate(-1);
      }
      const storageLength = sessionStorage.length < 7;
  
      const isCheckEmpty =
        !CheckRequiredDocuments() &&
        !CheckHousingDocuments(housingDocument) &&
        !storageLength;
        setIsSubmitButtonDisabled(!isCheckEmpty);

    }, [optionValue, isSubmitButtonDisabled, sessionStorage]);

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

  const CheckHousingDocuments = (Keys) => {

      const isComplete = Object.keys(Keys).map(key => housingDocument[key].value?.imageName != "" && housingDocument[key].value != null )
    
      return isComplete?.includes(false);
  };

  const OnOptionChange = (optionVal) => {
      setOptionValue(optionVal);
  };

  const ConfirmApplication = () => {
      setShowConfirm(true)
      setConfimationProps({
        title: "Submit Application?",
        message: "Please make sure that all the details provided are correct.",
        confirmBtn: "Submit"
      })
  }

  const OnImageSubmitHandler = (imageName, documentName, url, imageContent) => {
    let imageItem = { imageName, url, documentName, imageContent };

    sessionStorage.setItem([modalTitle], JSON.stringify(imageItem));

    setHousingDocument((currState) => (
      currState?.map((item, key) => {
        item.value = GetSessionDocument(item.name)
        return item
      })
    ))

    const storageLength = sessionStorage.length < 7;

    const isCheckEmpty =
      !CheckRequiredDocuments() &&
      !CheckHousingDocuments(housingDocument) &&
      !storageLength;

    setIsSubmitButtonDisabled(!isCheckEmpty);
};

const LoanDocsJsonData = () => {
  return {
    original_or: "",
    stencils: "",
    car_insurance: "",
    front_side: "",
    back_side: "",
    right_side: "",
    left_side: "",
    cct_no:
      JSON.parse(sessionStorage.getItem("TCT No. & CCT"))?.imageName || "",
    property_map:
      JSON.parse(sessionStorage.getItem("Map of Property"))?.imageName || "",
    land_title:
      JSON.parse(sessionStorage.getItem("Land Title"))?.imageName || "",
    property_description:
      JSON.parse(sessionStorage.getItem("Property Description"))?.imageName || "",
    
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
  loanDocs,
  loan_type,
  preferredBranch
) => {
  const dateInstance = new Date();

  const year = dateInstance.getFullYear().toString();
  const month = ("0" + (dateInstance.getMonth() + 1)).slice(-2).toString();
  const day = ("0" + dateInstance.getDate()).slice(-2).toString();

  const dateNow = `${year}-${month}-${day}`;

  const request = {
    vehicle_type: "",
    loan_type: loanDocs.loantype,
    application_loan_type: loan_type,
    application_date: dateNow,
    principal_amount: loanDocs.principalAmount,
    terms: loanDocs.terms,
    color: "",
    interest: 0.02,
    year: "",
    make: "",
    model: "",
    variant: "",
    plate_number: "",
    engine_number: "",
    chassis_number: "",
    preferred_branch: preferredBranch,
    residence_type: loanDocs.residenceType,
    stay_length: loanDocs.lenghtOfStay,
  };

  return request;
};

const personalDetails = location.state.loan.personalDetails;

const contactDetails = personalDetails.contactDetails;

const mobileNumber = contactDetails.mobile_number;

  const AddKyc = async (otpCode) => {
    // Symph DB
    try {

      const {
        firstname,
        lastname,
        suffix,
        middlename,
        countries,
        provinces,
        cities,
      } = personalDetails.informationDetails;

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
        email: contactDetails.email,
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

        const houisngLoanDetails = baseData.loanDetails.housingDetails;
        houisngLoanDetails.loantype = baseData.loanDetails.loantype;
        const currentAdd = houisngLoanDetails.currentAddress;

        const customer = personalDetails.informationDetails;
        customer.current_address = `${houisngLoanDetails.otherAddress} ${houisngLoanDetails.barangay} ${houisngLoanDetails.city} ${houisngLoanDetails.province} ${houisngLoanDetails.country}`;

        const preferredBranch = personalDetails.selectedOption;

        const loan_type = "Real Estate Loan";


        // switch (baseData.loantype) {
        //   case "Housing Loan":
        //     loan_type = "Real Estate Loan"
        //     break;
        //   case "Vehicle Loan":
        //     if (
        //       vehicleDetails?.selectedVehicle === "Car/Pickup/SUV" ||
        //       vehicleDetails?.selectedVehicle === "Truck/Commercial"
        //     ) {
        //       loan_type = "Car Loan";
        //     } else if (vehicleDetails?.selectedVehicle === "Motorcycle") {
        //       loan_type = "Motor Loan";
        //     }
        //     break;
        //   case "Quick Cash Loan":
        //     loan_type = "Quick Cash Loan";
        //     break;
        //   case "Small Business Loan":
        //     loan_type = "Small Business Loan";
        //     break;
        //   case "Pensioner's Loan":
        //     loan_type = "Pensioner's Loan";
        //     break;
        //   case "Salary Loan":
        //     loan_type = "Salary Loan";
        //     break;
        //   default:
        //     let error = {
        //       status: 404,
        //       code: "ERR_LOAN_TYPE",
        //       data: {
        //         message: {
        //           title: "Request Failed",
        //           body:"We're sorry, something went wrong on our end. Please try again later or contact our support team." || "An error occurred",
        //         }
        //       }
        //     }
        //     throw error
        // }
  
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
          country: currentAdd.country,
          province: currentAdd.province,
          city: currentAdd.city,
          barangay: currentAdd.otherAddress + " " + currentAdd.barangay,
        };

        const loandDocsData = LoanDocsJsonData();
        const employmentDocsData = EmploymentJsonData();
        const customerData = CustomerDetailsJsonData(customer, ckycBody);
        const loanApplicationData = LoanApplicationJsonData(
          houisngLoanDetails,
          loan_type,
          preferredBranch
        );

        // ML DB
        const AddMLLoan = await AddLoan(
          loandDocsData,
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
      if (error.code == "ERR_NETWORK") {
        ErrorHandler(error);
      }
      else if (error.status == 401 && error.data?.code == "INVALID_OTP") {
        error.code = "INVALID_OTP"
        ErrorHandler(error);
      }else if (error.status == 409) {
        ErrorHandler(error);
      }
      else if (error.status == 502) {
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
        
      } else if (error.code === "ERR_LOAN_TYPE") {
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

        //Details: If not, proceed ML DB
        const baseData = location.state.loan;

        const houisngLoanDetails = baseData.loanDetails.housingDetails;
        houisngLoanDetails.loantype = baseData.loanDetails.loantype;
        const currentAdd = houisngLoanDetails.currentAddress;

        const customer = personalDetails.informationDetails;
        customer.current_address = `${houisngLoanDetails.otherAddress} ${houisngLoanDetails.barangay} ${houisngLoanDetails.city} ${houisngLoanDetails.province} ${houisngLoanDetails.country}`;

        const preferredBranch = personalDetails.selectedOption;

        const loan_type = "Real Estate Loan";

        
        // switch (baseData.loantype) {
        //   case "Housing Loan":
        //     loan_type = "Real Estate Loan"
        //     break;
        //     case "Vehicle Loan":
        //     const vehicleDetails = baseData.vehicleDetails;
        //     if (
        //       vehicleDetails?.selectedVehicle === "Car/Pickup/SUV" ||
        //       vehicleDetails?.selectedVehicle === "Truck/Commercial"
        //     ) {
        //       loan_type = "Car Loan";
        //     } else if (vehicleDetails?.selectedVehicle === "Motorcycle") {
        //       loan_type = "Motor Loan";
        //     }
        //     break;
        //   case "Quick Cash Loan":
        //     loan_type = "Quick Cash Loan";
        //     break;
        //   case "Small Business Loan":
        //     loan_type = "Small Business Loan";
        //     break;
        //   case "Pensioner's Loan":
        //     loan_type = "Pensioner's Loan";
        //     break;
        //   case "Salary Loan":
        //     loan_type = "Salary Loan";
        //     break;
        //   default:
        //     let error = {
        //       status: 404,
        //       code: "ERR_LOAN_TYPE",
        //       data: {
        //         message: {
        //           title: "Request Failed",
        //           body:"We're sorry, something went wrong on our end. Please try again later or contact our support team." || "An error occurred",
        //         }
        //       }
        //     }
        //     throw error
        // }

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
            country: currentAdd.country,
            province: currentAdd.province,
            city: currentAdd.city,
            barangay: currentAdd.otherAddress + " " + currentAdd.barangay,
          };

          const loanDocsData = LoanDocsJsonData();
          const employmentDocsData = EmploymentJsonData();
          const customerData = CustomerDetailsJsonData(customer, ckycBody);
          const loanApplicationData = LoanApplicationJsonData(
            houisngLoanDetails,
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
        if (error.code == "ERR_NETWORK") {
          ErrorHandler(error);
        }
        ErrorHandler(error.response);
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
    <div className="customer-requirement housing-loan">
        <div className="requirement-container">
            <TopbarComponent />
            <CustomHeader title="Housing Details" />
            <div className="requirement-content">
            <CustomPrevBtn />
            <div className="card">
                <CustomCardTitle
                title="Housing Loan Documents"
                styles="custom-card-title"
                />
                <CustomRequirementDocsComponent availableDocuments={housingDocument}/>
                
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
            {
                showLoading.loading ? (
                <CustomLoadingModal
                  loadingText={showLoading.text}
                  loadingIcon={LoadingIcon}
                />
              ) : (
              <></>
              )
            }
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
            {showOTP && (
              <OTPModalComponent
                time={60}
                HandleSubmitOTP={handleOtpSubmit}
                HandleCancel={handleCancel}
                number={mobileNumber}
                HandleResendOTP={GetResendOTPCode}
              />
            )}
        </div>
        <AddPhotoModal
            isOpen={modalOpen}
            onClose={closeModal}
            modalTitle={modalTitle}
            modalDefaultGuideImage={modalDefaultGuideImage}
            OnImageSubmitHandler={OnImageSubmitHandler}
        />
    </div>
  )
}

export default HousingRequirementsComponent;