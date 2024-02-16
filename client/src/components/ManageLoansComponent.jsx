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
  // const [loans, setLoans] = useState([
  //   {
  //   loan_type: {loan_type_name: 'Car Loan'},
  //   ref_num: "MCROTKECGVQ",
  //   status: "CLOSED"
  // },
  //   {
  //     loan_type: {loan_type_name: 'Car Loan'},
  //     ref_num: "MCROTKECGVQ",
  //     status: "APPROVED"
  //   },
  //   {
  //     loan_type: {loan_type_name: 'Car Loan'},
  //     ref_num: "MCROTKECGVQ",
  //     status: "DISBURSED"
  //   },
  //   {
  //     loan_type: {loan_type_name: 'Car Loan'},
  //     ref_num: "MCROTKECGVQ",
  //     status: "PENDING"
  //   }
  // ]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [alertProps, setAlertProps] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const { Vehicle, QCL, HousingLoan, Pension, SBL } = CustomIcon;

  const Loanstatus = ["DISBURSED", "APPROVED", "PENDING"];

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
              displayError("We're sorry, something went wrong on our end. Please try again later.", "Request Failed");
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
          displayError("We're sorry, something went wrong on our end. Please try again later.", "Request Failed")
          break;
        case 502:
          displayError("We're sorry, something went wrong on our end. Please try again later.", "Request Failed")
          break;
        default:
          displayError("We're sorry, something went wrong on our end. Please try again later.", "Request Failed")
          break;
      }
  };

  useEffect(() => {
      GetAllLoans();
  }, [])


  useEffect(() => {

    const setToggleModalOutside = (event) => {
      if (modal) {
        const classNameBtn = event.target.className === "submit-modal";
  
        setModal(!classNameBtn);
      }
    };

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

    return loans?.filter((loan) => loan.status === status).map((loan, key) =>{
      let statusChecker = LoanStatusChecker(loan.status);
      return (
        <ManageLoanCardComponent
          loanType={loan.loan_type.loan_type_name}
          referenceNo={loan.ref_num}
          componentKey={loan.ref_num}
          key={loan.ref_num}
          icon={LoanTypeIconHandler(loan.loan_type.loan_type_name)}
          btnName={statusChecker.btnName}
          btnStyle={statusChecker.btnStyle}
          disabled={statusChecker.isDisabled}
          loanCardName="loan-card"
          cardContainer={`loan-card-container ${
            Loanstatus.includes(status)
              ? "current-loan"
              : "past-loan"
          }`}
          loantypeTxt={`loan-type ${
            Loanstatus.includes(status) ? "current" : "past"
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

  const CurrentLoansCards = () => <LoansCards status="DISBURSED" />;
  const ApprovedLoansCards = () => <LoansCards status="APPROVED" />;
  const PastLoansCards = () => <LoansCards status="CLOSED" />;
  const PendingLoansCards = () => <LoansCards status="PENDING" />;

  const LoanTypeIconHandler = (loanType) => {
    return loansIcon?.map((icon) => {
      return icon.loanType === loanType ? icon.icon : <></>;
    });
  };

  const AddBtnHandler = () => {
    setModal(true);
  };
  
  const ContinueBtnHandler = () => {
    window.open("https://forms.gle/fn9F2wG1RBT64Mga6", "_blank");
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

  const HasCurrentLoanDisplay = () => {

    return loans?.length !== 0 && loans?.filter((loan) => Loanstatus.includes(loan.status)).length !== 0;
  }

  const LoanUnavailable = (status) => {
    return (
      <div className="loans-unavailable">
        <img src={Separator} alt="ml-sep" style={{ marginBottom: '10px' }}/>
        <h1>
          You have no {status} loans.
        </h1>
      </div> 
    )
  }

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
            label="Note:"
            labelClass="modal-label"
            containerClass="modal-container"
            wrapperClass="modal-wrapper"
            inptBtnWrapper="modal-inputbtn-wrapper"
            inputWrapperClass={`modal-input-wrapper`}
            modalBtnWrapper="modal-btn-wrapper"
            modalBtn="modal-button"
            inputType="text"
            inputValue={`If your loan is not listed here, kindly fill out the provided form after clicking the “Continue” button. Thank you`}
            placeHolder=""
            onclickHandler={ContinueBtnHandler}
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
                HasCurrentLoanDisplay() ?
                <>
                  <CurrentLoansCards />
                  <ApprovedLoansCards />
                  <PendingLoansCards/>
                </>
                : 
                LoanUnavailable("current")
              )}
            </div>
            <div className="past-loan-card">
              <div className="past-loan-btn-container">
                <div className="pastloanstxt">Past Loans</div>
              </div>

              {loading ? (
                <LoadingComponent containerStyle="container-loading" />
              ) : (
                loans?.length !== 0 && loans?.filter(loan => loan.status === "CLOSED").length !== 0?
                <>
                  <PastLoansCards />
                </>
                : 
                LoanUnavailable("past")
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLoanComponent;
