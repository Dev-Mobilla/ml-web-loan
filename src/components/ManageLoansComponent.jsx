import React, {useEffect, useState} from "react";
import "../styles/manageloans.css";
import {
  TopbarComponent,
  CustomHeader,
  FooterComponent,
  CustomButton,
  CustomPrevBtn,
  ManageLoanCardComponent,
  CustomIcon,
  CustomSubmitModal,
} from "./index";
import {useLocation, useNavigate} from "react-router-dom";
import { currentLoans, pastLoans } from "../utils/ManageLoansMockData";

const ManageLoanComponent = () => {

  const Location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const { Housing, Vehicle, QCL } = CustomIcon;

  useEffect(() => {
    window.addEventListener('click', setToggleModalOutside);

    return () => {
      window.removeEventListener('click', setToggleModalOutside);
    }
  })

  const loansIcon = [
    {
      loanType: 'Housing Loan',
      icon: <Housing/>
    },
    {
      loanType: 'Quick Cash Loan',
      icon: <QCL/>
    },
    {
      loanType: 'Vehicle Loan',
      icon: <Vehicle/>
    }
  ]

  const CurrentLoansCards = () => {
    return (
      currentLoans.length === 0 ?
        <div className="loans-unavailable">
          <h1>You have no loans yet.</h1>
        </div>
      :
        currentLoans?.map((loan, key) => {
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
            OnBtnClick={() => CardBtnClick(loan.loanType, loan.referenceNo)}
            />
          )
        })
    )
  }

  const PastLoansCards = () => {
    return (
      pastLoans.length === 0 ?
        <div className="loans-unavailable">
          <h1>You have no closed loans.</h1>
        </div>
      :
        pastLoans?.map((loan, key) => {
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
            OnBtnClick={() => CardBtnClick(loan.loanType, loan.referenceNo)}
            btnType="button"
           />
          )
        })
    )
  }

  const LoanTypeIconHandler = (loanType) => {
    return (
      loansIcon?.map(( icon, key ) => {
        return icon.loanType === loanType ? icon.icon : <></>
      })
    )
  }

  const AddBtnHandler = () => {
    setModal(true)
  }

  const CardBtnClick = (type, referenceNo) => {

    let loanType = type.toLowerCase().replaceAll(" ", "-");
      
    if ('quick-cash-loan' === loanType) {

      navigate(`/manage-loans/${loanType}/${referenceNo}`);
      
    }else{
      navigate(`/manage-loans/loan-type?type=${loanType}&ref=${referenceNo}`);
    }
      
  }

  const setToggleModalOutside = (event) => {
    if (modal) {
      const classNameBtn =  event.target.className === 'submit-modal'

      setModal(!classNameBtn)
    }

  }

  return (
    <div className="manage-loans">
        {
          modal?
            <div className="submit-modal">
              <CustomSubmitModal
                label="Loan Reference Number"
                labelClass="modal-label"
                containerClass="modal-container"
                wrapperClass="modal-wrapper"
                inptBtnWrapper="modal-inputbtn-wrapper"
                inputWrapperClass="modal-input-wrapper"
                modalBtnWrapper="modal-btn-wrapper"
                modalBtn="modal-button"
                inputType="text"
                placeHolder="Ref. No"
                />
            </div>
          : <></>
      }
      <div className="div">
        <TopbarComponent />
        <CustomHeader title="Manage Existing Loans" />
        <div className="body-bg">
          <div className="prev-btn">
            <CustomPrevBtn/>
          </div>
          <div className="container">
            <div className="current-loan-card">
              <div className="current-loan-btn-container">
                <div className="currentloanstxt">Current Loans</div>
                <CustomButton name="Add" styles="custom-button add-btn" EventHandler={AddBtnHandler}/>
              </div>
              <CurrentLoansCards/>
              
            </div>
            <div className="past-loan-card">
              <div className="past-loan-btn-container">
                <div className="pastloanstxt">Past Loans</div>
              </div>
              <PastLoansCards/>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default ManageLoanComponent;
