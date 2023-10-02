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
} from "./index";
import { useLocation, useNavigate } from "react-router-dom";
import { Loans } from "../utils/ManageLoansMockData";
import {GetLoans, GetLoanDetails} from "../api/hatchit.api";
import {GetCookieByName} from "../utils/DataFunctions";

const ManageLoanComponent = () => {
  const Location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [referenceInput, setReferenceInput] = useState("");
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [inputErrorStyle, setInputErrorStyle] = useState("");
  const [loans, setLoans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertModal, setAlertModal] = useState(false);
  const [alertProps, setAlertProps] = useState({});

  const { Housing, Vehicle, QCL } = CustomIcon;

  const IsInputError = (errorMsg, errorStyle) => {
    setInputErrorMsg(errorMsg);
    setInputErrorStyle(errorStyle);
  };

  const GetAllLoans = async () => {
      const getCkycId = GetCookieByName(process.env.REACT_APP_ACCOUNT_COOKIE_NAME);

      const response = await GetLoans({ckyc_id: getCkycId?.ckycId});

      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const displayError = (message) => {
        setAlertModal(true);
        setAlertProps({
          message: message
        })
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
              displayError("An error occurred while fetching the loan details.");
            }
            setLoading(false);
          }, 3000);

          break;
        case 404:
          displayError("Loan does not exist");
          break;
        case 401:
          displayError("Session Expired. Please Login again")
          break;
        case 500:
          displayError("An error occurred while fetching loan details.")
          break;
        default:
          displayError("An error occurred while fetching loan details.")
          break;
      }
  };

  useEffect(() => {
    GetAllLoans();

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
      loanType: "Housing Loan",
      icon: <Housing />,
    },
    {
      loanType: "Quick Cash Loan",
      icon: <QCL />,
    },
    {
      loanType: "Car Loan",
      icon: <Vehicle />,
    },
  ];

  const OnModalCloseHandler = () => {
    setAlertModal(false);
    navigate("/dashboard");
  };

  const LoanStatusChecker = (status) => {
    if (status?.toLowerCase() === "approved") {
      return {
        btnName: "Pending",
        isDisabled: true,
        btnStyle: "custom-button approved-btn"
      };
      
    }else if (status?.toLowerCase() === "disbursed") {
      return {
        btnName: "Manage",
        isDisabled: false,
        btnStyle: "custom-button manage-btn"
      };
    }else if (status?.toLowerCase() === "closed") {
      return {
        btnName: "Details",
        isDisabled: false,
        btnStyle: "custom-button details-btn"
      };
    }
  }

  const LoansCards = ({ status }) => {
    const filteredLoans = loans?.filter((loan) => loan.status === status);

    if (filteredLoans?.length === 0) {
      return (
        <div className="loans-unavailable">
          <h1>
            You have no {status === "DISBURSED" || status === "APPROVED" ? `${LoanStatusChecker(status).btnName} loans` : "past loans"}.
          </h1>
        </div>
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
            status === "DISBURSED" || status === "APPROVED" ? "current-loan" : "past-loan"
          }`}
          loantypeTxt={`loan-type ${status === "DISBURSED" || status === "APPROVED" ? "current" : "past"}`}
          referenceTxt="reference-txt"
          OnBtnClick={() =>
            CardBtnClick(loan.ref_num, loan.loan_type.loan_type_name)
          }
          btnType="button"
        />
      )
    });
  };


  // const ConditionalRender = ({ status }) => (
  //   <div>
  //     {loans?.some((loan) => loan.status === status && loan.isLoading) ? (
  //       <LoadingComponent />
  //     ) : (
  //       <LoansCards status={status} />
  //     )}
  //   </div>
  // );

  // const CurrentLoansCards = () => <ConditionalRender status="DISBURSED" />;
  // const ApprovedLoansCards = () => <ConditionalRender status="APPROVED" />;
  // const PastLoansCards = () => <ConditionalRender status="CLOSED" />;

  const CurrentLoansCards = () => <LoansCards status="DISBURSED" />;
  const ApprovedLoansCards = () => <LoansCards status="APPROVED" />;
  const PastLoansCards = () => <LoansCards status="CLOSED" />;

  const LoanTypeIconHandler = (loanType) => {
    return loansIcon?.map((icon, key) => {
      return icon.loanType === loanType ? icon.icon : <></>;
    });
  };

  const AddBtnHandler = () => {
    setModal(true);
  };

  const ContinueBtnHandler = () => {
    console.log("continue", referenceInput);
    if (referenceInput === "") {
      IsInputError("Please input reference number", "border-red");
    } else {
      console.log("dfsfdg");
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
      navigate(`/manage-loans/loan-details?reference=${referenceNo}&loan-type=${type}`);
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
              {
                loading ? <LoadingComponent containerStyle="container-loading"/> 
                : 
                <>
                  <CurrentLoansCards />
                  <ApprovedLoansCards/>
                </>
              }
            </div>
            <div className="past-loan-card">
              <div className="past-loan-btn-container">
                <div className="pastloanstxt">Past Loans</div>
              </div>

              {
                loading ? <LoadingComponent containerStyle="container-loading"/> : <PastLoansCards />
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLoanComponent;
