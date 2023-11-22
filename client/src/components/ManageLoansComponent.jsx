import React, { useEffect, useState } from "react";
import "../styles/manageloans.css";
import {
  TopbarComponent,
  CustomHeader,
  CustomButton,
  CustomPrevBtn,
  ManageLoanCardComponent,
  CustomIcon,
  CustomSubmitModal,
  LoadingComponent,
  AlertModalComponent,
  CustomAlert,
} from "./index";
import { useNavigate } from "react-router-dom";
import { GetLoans } from "../api/hatchit.api";
import { GetCookieByName } from "../utils/DataFunctions";
import {GetAllApplications} from "../api/api";
import Separator from '../assets/icons/sep.png'

const ManageLoanComponent = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [referenceInput, setReferenceInput] = useState("");
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [inputErrorStyle, setInputErrorStyle] = useState("");
  const [loans, setLoans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertModal, setAlertModal] = useState(false);
  const [alertProps, setAlertProps] = useState({});
  const [pendingLoans, setPendingLoans] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const { Vehicle, QCL, HousingLoan, Pension, SBL } = CustomIcon;

  const IsInputError = (errorMsg, errorStyle) => {
    setInputErrorMsg(errorMsg);
    setInputErrorStyle(errorStyle);
  };
  const GetllApplication = async () => {
    try {
      const getCkycId = GetCookieByName(process.env.REACT_APP_ACCOUNT_COOKIE_NAME);

      const getApplications = await GetAllApplications(getCkycId?.ckycId)

      if (getApplications.data.length !== 0) {
        const applications = getApplications.data

        const newApplications = applications?.map((item, key) => {
          item.status = "PENDING"

          return item
        })

        setPendingLoans(newApplications);
        
      }
    } catch (error) {
      setLoading(false);
      setAlertModal(false)
      setShowAlert(true);
      setAlertProps({
        title: error.response.data.error.message.title,
        text: error.response.data.error.message.body || "An error occurred",
        subTitle: "",
        subLink: false,
        isError: true
      });
    }
  }

  const GetAllLoans = async () => {
      const getCkycId = GetCookieByName(process.env.REACT_APP_ACCOUNT_COOKIE_NAME);

      const response = await GetLoans({ckyc_id: getCkycId?.ckycId});

      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const displayError = (message, title) => {
        setLoading(false);
        setAlertModal(false);
        setShowAlert(true);
        setAlertProps({
          title: title,
          text: message || "An error occurred",
          subTitle: "",
          subLink: false,
          isError: true
        });
      }

      switch (response.status) {
        case 200:

          setTimeout(async () => {
            try {
              const loanData = response.data.data.map((loan) => ({
                ...loan,
                // isLoading: true,
              }));
              setLoans(loanData);
              setLoading(false);
              // await new Promise((resolve) => setTimeout(resolve, 1000));

          // const updatedLoanData = loanData.map((loan) => ({
          //   ...loan,
          //   isLoading: false,
          // }));
          // setLoans(updatedLoanData);
              
            } catch (error) {
              displayError("An error occurred while fetching the loan details.", "Request Failed");
            }
            setLoading(false);
          }, 3000);

          break;
        case 404:
          displayError("Loan does not exist", "Not Found");
          break;
        case 401:
          displayError("Session expired please login again.", "Session Expired")
          break;
        case 500:
          displayError("An error occurred while fetching loan details.", "Request Failed")
          break;
        default:
          displayError("An error occurred while fetching loan details.", "Request Failed")
          break;
      }
  };

  useEffect(() => {
    setTimeout(() => {
      GetAllLoans();
      GetllApplication();
    }, 1500);
  }, [])

  useEffect(() => {

    !modal
      ? IsInputError("", "")
      : IsInputError(inputErrorMsg, inputErrorStyle);

    window.addEventListener("click", setToggleModalOutside);

    return () => {
      window.removeEventListener("click", setToggleModalOutside);
    };
  }, [modal]);

  const loansIcon = [
    {
      loanType: "Real Estate Loan",
      icon: <HousingLoan />,
    },
    {
      loanType: "Quick Cash Loan",
      icon: <QCL />,
    },
    {
      loanType: "Car Loan",
      icon: <Vehicle />,
    },
    {
      loanType: "Motor Loan",
      icon: <Vehicle />,
    },
    {
      loanType: "Small Business Loan",
      icon: <SBL />,
    },
    {
      loanType: "Pensioner's Loan",
      icon: <Pension />,
    },
  ];

  const OnModalCloseHandler = () => {
    setAlertModal(false);
    navigate("/dashboard");
  };

  const LoanStatusChecker = (status) => {
    if (status?.toLowerCase() === "approved") {
      return {
        btnName: "Processing",
        isDisabled: true,
        btnStyle: "custom-button approved-btn",
      };
    } else if (status?.toLowerCase() === "disbursed") {
      return {
        btnName: "Manage",
        isDisabled: false,
        btnStyle: "custom-button manage-btn",
      };
    } else if (status?.toLowerCase() === "closed") {
      return {
        btnName: "Details",
        isDisabled: false,
        btnStyle: "custom-button details-btn",
      };
    }else if (status?.toLowerCase() === "pending") {
      return {
        btnName: "Pending",
        isDisabled: true,
        btnStyle: "custom-button pending-btn",
      };
    }
  };

  const LoansCards = ({ status }) => {
    const filteredLoans = loans?.filter((loan) => loan.status === status);

    if (filteredLoans?.length === 0) {
      return (
        <></>
      );
    }

    return filteredLoans?.map((loan, key) => {
      let statusChecker = LoanStatusChecker(loan.status);

      return (
        <ManageLoanCardComponent
          loanType={loan.loan_type.loan_type_name}
          referenceNo={loan.ref_num}
          key={key}
          icon={LoanTypeIconHandler(loan.loan_type.loan_type_name)}
          btnName={statusChecker.btnName}
          btnStyle={statusChecker.btnStyle}
          disabled={statusChecker.isDisabled}
          loanCardName="loan-card"
          cardContainer={`loan-card-container ${
            status === "DISBURSED" || status === "APPROVED"
              ? "current-loan"
              : "past-loan"
          }`}
          loantypeTxt={`loan-type ${
            status === "DISBURSED" || status === "APPROVED" ? "current" : "past"
          }`}
          referenceTxt="reference-txt"
          OnBtnClick={() =>
            CardBtnClick(loan.ref_num, loan.loan_type.loan_type_name)
          }
          btnType="button"
        />
      );
    });
  };

  const PendingLoans = () => {

    if (pendingLoans?.length === 0) {
      return (
       <></>
      );
    }

    const compareRefNumber = (loan_1, loan_2) => {
      let newPendingLoan = [];
      if (loan_1.length != 0) {
        
        for (let index = 0; index < loan_2.length; index++) {
          const element = loan_2[index];
          if (loan_1[index].ref_num !== element.ref_num) {
           newPendingLoan.push(loan_2[index]) 
          }
        }
        return newPendingLoan
      }
      return loan_2
    }

    let pend = compareRefNumber(loans, pendingLoans)

    
    return pend?.map((pendLoan, key) => {
      let statusChecker = LoanStatusChecker(pendLoan.status);

      return (
        <ManageLoanCardComponent
          loanType={pendLoan.loan_type_name}
          referenceNo={pendLoan.ref_num}
          key={key}
          icon={LoanTypeIconHandler(pendLoan.loan_type_name)}
          btnName={statusChecker.btnName}
          btnStyle={statusChecker.btnStyle}
          disabled={statusChecker.isDisabled}
          loanCardName="loan-card"
          cardContainer={`loan-card-container current-loan`}
          loantypeTxt={`loan-type pending`}
          referenceTxt="reference-txt"
          OnBtnClick={() =>
            CardBtnClick(pendLoan.ref_num, pendLoan.loan_type_name)
          }
          btnType="button"
        />
      );
    })
  }

  const CurrentLoansCards = () => <LoansCards status="DISBURSED" />;
  const ApprovedLoansCards = () => <LoansCards status="APPROVED" />;
  const PastLoansCards = () => <LoansCards status="CLOSED" />;

  const LoanTypeIconHandler = (loanType) => {
    return loansIcon?.map((icon) => {
      return icon.loanType === loanType ? icon.icon : <></>;
    });
  };

  const AddBtnHandler = () => {
    setModal(true);
  };

  const ContinueBtnHandler = () => {
    if (referenceInput === "") {
      IsInputError("Please input reference number", "border-red");
    } else {
      // console.log("dfsfdg");
    }
  };

  const OnInpputChange = (e) => {
    setReferenceInput(e.target.value);
    IsInputError("", "");
  };

  const CardBtnClick = (referenceNo, type) => {
    let loanType = type.toLowerCase().replaceAll(" ", "-");

    if ("quick-cash-loan" === loanType) {
      navigate(`/manage-loans/${loanType}/${referenceNo}`);
    } else {
      navigate(
        `/manage-loans/loan-details?reference=${referenceNo}&loan-type=${type}`, {
          state: {
            referenceNo,
            type
          }
        }
      );
    }
  };

  const setToggleModalOutside = (event) => {
    if (modal) {
      const classNameBtn = event.target.className === "submit-modal";

      setModal(!classNameBtn);
    }
  };

  return (
    <div className="manage-loans">
      {alertModal ? (
        <AlertModalComponent
          message={alertProps.message}
          onClose={OnModalCloseHandler}
        />
      ) : null}
      {showAlert && (
        <CustomAlert
          title={alertProps.title}
          text={alertProps.text}
          subtitle={alertProps.subTitle ? alertProps.subTitle : ""}
          isError={alertProps.isError}
          subLink = {alertProps.subLink}
          onClose={() => setShowAlert(false)}
        />
      )}
      {modal ? (
        <div className="submit-modal">
          <CustomSubmitModal
            label="Loan Reference Number"
            labelClass="modal-label"
            containerClass="modal-container"
            wrapperClass="modal-wrapper"
            inptBtnWrapper="modal-inputbtn-wrapper"
            inputWrapperClass={`modal-input-wrapper ${inputErrorStyle}`}
            modalBtnWrapper="modal-btn-wrapper"
            modalBtn="modal-button"
            inputType="text"
            inputValue={referenceInput}
            placeHolder="Ref. No"
            onclickHandler={ContinueBtnHandler}
            onInputChange={OnInpputChange}
            inputError={inputErrorMsg}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="div">
        <TopbarComponent />
        <CustomHeader title="Manage Existing Loans" />
        <div className="prev-btn">
          <CustomPrevBtn />
        </div>
        <div className="body-bg">
          <div className="container">
            <div className="current-loan-card">
              <div className="current-loan-btn-container">
                <div className="currentloanstxt">Current Loans</div>
                <CustomButton
                  name="Add"
                  styles="custom-button add-btn"
                  EventHandler={AddBtnHandler}
                />
              </div>
              {loading ? (
                <LoadingComponent containerStyle="container-loading" />
              ) : (
                loans.length != 0 || pendingLoans.length != 0 ?
                <>
                  <CurrentLoansCards />
                  <ApprovedLoansCards />
                  <PendingLoans/>
                </>
                : 
                <div className="loans-unavailable">
                  <img src={Separator} alt="ml-sep" style={{ marginBottom: '10px' }}/>
                  <h1>
                    You have no current loans.
                  </h1>
               </div>
              )}
            </div>
            <div className="past-loan-card">
              <div className="past-loan-btn-container">
                <div className="pastloanstxt">Past Loans</div>
              </div>

              {loading ? (
                <LoadingComponent containerStyle="container-loading" />
              ) : (
                loans.length != 0 ?
                <>
                  <PastLoansCards />
                </>
                : 
                <div className="loans-unavailable">
                  <img src={Separator} alt="ml-sep" style={{ marginBottom: '10px' }}/>
                  <h1>
                    You have no past loans.
                  </h1>
               </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLoanComponent;
