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
} from "./index";
import { useLocation, useNavigate } from "react-router-dom";
// import { Loans } from "../utils/ManageLoansMockData";
import { GetLoans, GetLoanDetails } from "../api/hatchit.api";

const ManageLoanComponent = () => {
  const Location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [referenceInput, setReferenceInput] = useState("");
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [inputErrorStyle, setInputErrorStyle] = useState("");
  const [loans, setLoans] = useState(null);

  const { Housing, Vehicle, QCL } = CustomIcon;

  const IsInputError = (errorMsg, errorStyle) => {
    setInputErrorMsg(errorMsg);
    setInputErrorStyle(errorStyle);
  };

  const GetAllLoans = async () => {
    try {
      const res = await GetLoans({ ckyc_id: "X221200006549K1" });
      console.log(res);
      if (res.status === 200) {
        const loanData = res.data.data.map((loan) => ({
          ...loan,
          isLoading: true,
        }));
        setLoans(loanData);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const updatedLoanData = loanData.map((loan) => ({
          ...loan,
          isLoading: false,
        }));
        setLoans(updatedLoanData);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.error(error);
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
      loanType: "Vehicle Loan",
      icon: <Vehicle />,
    },
  ];

  const LoansCards = ({ status }) => {
    const filteredLoans = loans?.filter((loan) => loan.status === status);

    if (filteredLoans?.length === 0) {
      return (
        <div className="loans-unavailable">
          <h1>
            You have no {status === "DISBURSED" ? "loans" : "past loans"}.
          </h1>
        </div>
      );
    }

    return filteredLoans?.map((loan, key) => (
      <ManageLoanCardComponent
        loanType={loan.loan_type.loan_type_name}
        referenceNo={loan.ref_num}
        key={key}
        icon={LoanTypeIconHandler(loan.loan_type.loan_type_name)}
        btnName={status === "DISBURSED" ? "Manage" : "Details"}
        btnStyle={`custom-button ${
          status === "DISBURSED" ? "manage-btn" : "details-btn"
        }`}
        loanCardName="loan-card"
        cardContainer={`loan-card-container ${
          status === "DISBURSED" ? "current-loan" : "past-loan"
        }`}
        loantypeTxt={`loan-type ${status === "DISBURSED" ? "current" : "past"}`}
        referenceTxt="reference-txt"
        OnBtnClick={() =>
          CardBtnClick(loan.ref_num, loan.loan_type.loan_type_name)
        }
        btnType="button"
      />
    ));
  };

  const ConditionalRender = ({ status }) => (
    <div>
      {loans?.some((loan) => loan.status === status && loan.isLoading) ? (
        <LoadingComponent />
      ) : (
        <LoansCards status={status} />
      )}
    </div>
  );

  const CurrentLoansCards = () => <ConditionalRender status="DISBURSED" />;
  const PastLoansCards = () => <ConditionalRender status="CLOSED" />;

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
    // setModal(false);
    // GetLoanDetails(referenceInput.toUpperCase())
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
      navigate(`/manage-loans/loan-details?reference=${referenceNo}`);
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
