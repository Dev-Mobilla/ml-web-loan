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
  const [loans, setLoans] = useState(null)
  const [disabled, setDisabled] = useState(null)
  const [btnName, setBtnName] = useState(null)

  const { Housing, Vehicle, QCL } = CustomIcon;

  const IsInputError = (errorMsg, errorStyle) => {
    setInputErrorMsg(errorMsg);
    setInputErrorStyle(errorStyle);
  }

  useEffect(() => {

    GetAllLoans();

    !modal ? IsInputError("", ""): IsInputError(inputErrorMsg, inputErrorStyle);
    
    window.addEventListener("click", setToggleModalOutside);
    
    return () => {
      window.removeEventListener("click", setToggleModalOutside);
    };
  }, [modal]);
  
  const GetAllLoans = async () => {
    const getCkycId = GetCookieByName(process.env.REACT_APP_ACCOUNT_COOKIE_NAME);

    const res = await GetLoans({ckyc_id: getCkycId?.ckycId});
    console.log(res);
    if (res.status === 200) {
      setLoans(res.data.data)
    }
    else{
      console.log(res.status);
    }
  }

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
      loanType: "Vehicle Loan",
      icon: <Vehicle />,
    },
  ];
  const LoanStatusChecker = (status) => {
    if (status?.toLowerCase() === "approved") {
      return {
        status: "Approved",
        isDisabled: true,
        btnStyle: "custom-button approved-btn"
      };
      
    }else if (status?.toLowerCase() === "disbursed") {
      return {
        status: "Manage",
        isDisabled: false,
        btnStyle: "custom-button manage-btn"
      };
    }
  }

  const CurrentLoansCards = () => {
    if (loans?.length !== 0) {
      let filteredLoans = loans?.filter((loan, key) => {
        // console.log(loan);
        if (loan.status === "DISBURSED" || loan.status === "APPROVED") {
          return loan
        }
      })

      return filteredLoans?.map((loan, key) => {

        let statusChecker = LoanStatusChecker(loan.status);

        return (
          <ManageLoanCardComponent
            loanType={loan.loan_type.loan_type_name}
            referenceNo={loan.ref_num}
            key={key}
            icon={LoanTypeIconHandler(loan.loan_type.loan_type_name)}
            btnName={statusChecker.status}
            btnStyle={statusChecker.btnStyle}
            disabled={statusChecker.isDisabled}
            loanCardName="loan-card"
            cardContainer="loan-card-container current-loan"
            loantypeTxt="loan-type current"
            referenceTxt="reference-txt"
            OnBtnClick={() => CardBtnClick(loan.ref_num, loan.loan_type.loan_type_name)}
          />
        );
      })
    }
    else{
      return (
        <div className="loans-unavailable">
          <h1>You have no loans yet.</h1>
         </div>
      )
    }
  };

  const PastLoansCards = () => {
    if (loans?.length !== 0) {
      let filteredLoans = loans?.filter((loan, key) => {
        if (loan.status === "CLOSED") {
          return loan
        }
      })

      return filteredLoans?.map((loan, key) => {
        return (
          <ManageLoanCardComponent
            loanType={loan.loan_type.loan_type_name}
            referenceNo={loan.ref_num}
            key={key}
            icon={LoanTypeIconHandler(loan.loan_type.loan_type_name)}
            btnName="Details"
            btnStyle="custom-button details-btn"
            loanCardName="loan-card"
            cardContainer="loan-card-container past-loan"
            loantypeTxt="loan-type past"
            referenceTxt="reference-txt"
            OnBtnClick={() => CardBtnClick(loan.ref_num, loan.loan_type.loan_type_name)}
            btnType="button"
          />
        );
      })

    }
    else{
      return (
        <div className="loans-unavailable">
          <h1>You have no closed loans.</h1>
         </div>
      )
    }
  };

  const LoanTypeIconHandler = (loanType) => {
    return (
      loansIcon?.map(( icon, key ) => {
        return icon.loanType === loanType ? icon.icon : <></>
      })
    )
  }

  const AddBtnHandler = () => {
    setModal(true);
  }

  const ContinueBtnHandler = () => {
    console.log('continue', referenceInput);
    // setModal(false);
    // GetLoanDetails(referenceInput.toUpperCase())
    if (referenceInput === "") {
      IsInputError("Please input reference number", "border-red")
    }else{
      console.log("dfsfdg")
    }
  };

  const OnInpputChange = (e) => {
    setReferenceInput(e.target.value);
    IsInputError("", "")
  }

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
              <CurrentLoansCards />
            </div>
            <div className="past-loan-card">
              <div className="past-loan-btn-container">
                <div className="pastloanstxt">Past Loans</div>
              </div>
              <PastLoansCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLoanComponent;
