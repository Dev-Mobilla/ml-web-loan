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
import {GetLoans} from "../api/hatchit.api";

const ManageLoanComponent = () => {
  const Location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [referenceInput, setReferenceInput] = useState("");
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [inputErrorStyle, setInputErrorStyle] = useState("");

  const { Housing, Vehicle, QCL } = CustomIcon;

  const IsInputError = (errorMsg, errorStyle) => {
    setInputErrorMsg(errorMsg);
    setInputErrorStyle(errorStyle);
  }

  useEffect(() => {

    GetLoansDetails();

    !modal ? IsInputError("", ""): IsInputError(inputErrorMsg, inputErrorStyle);
    
    window.addEventListener("click", setToggleModalOutside);
    
    return () => {
      window.removeEventListener("click", setToggleModalOutside);
    };
  }, [modal]);
  
  const GetLoansDetails = async () => {
    const res = await GetLoans({ckyc_id: "X220600001592K1"});
    // console.log('res', res);
    
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

  const CurrentLoansCards = () => {
    if (Loans.length !== 0) {
      let filteredLoans = Loans.filter((loan, key) => {
        if (loan.status.toLowerCase() === "current") {
          return loan
        }
      })

      return filteredLoans?.map((loan, key) => {
        return (
          <ManageLoanCardComponent
            loanType={loan.loanType}
            referenceNo={loan.referenceNo}
            key={key}
            icon={LoanTypeIconHandler(loan.loanType)}
            btnName="Manage"
            btnStyle="custom-button manage-btn"
            loanCardName="loan-card"
            cardContainer="loan-card-container current-loan"
            loantypeTxt="loan-type current"
            referenceTxt="reference-txt"
            OnBtnClick={() => CardBtnClick(loan.loanId, loan.loanType)}
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
    if (Loans.length !== 0) {
      let filteredLoans = Loans?.filter((loan, key) => {
        if (loan.status.toLowerCase().replaceAll(" ", "-") === "past-due") {
          return loan
        }
      })

      return filteredLoans?.map((loan, key) => {
        return (
          <ManageLoanCardComponent
            loanType={loan.loanType}
            referenceNo={loan.referenceNo}
            key={key}
            icon={LoanTypeIconHandler(loan.loanType)}
            btnName="Details"
            btnStyle="custom-button details-btn"
            loanCardName="loan-card"
            cardContainer="loan-card-container past-loan"
            loantypeTxt="loan-type past"
            referenceTxt="reference-txt"
            OnBtnClick={() => CardBtnClick(loan.loanId, loan.loanType)}
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

  const CardBtnClick = (loanId, type) => {
    let loanType = type.toLowerCase().replaceAll(" ", "-");

    if ("quick-cash-loan" === loanType) {
      navigate(`/manage-loans/${loanType}/${loanId}`);
    } else {
      navigate(`/manage-loans/loan-details?id=${loanId}`);
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
        <div className="body-bg">
          <div className="prev-btn">
            <CustomPrevBtn />
          </div>
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
