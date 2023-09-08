import React, {useEffect} from "react";
import "../styles/manageloans.css";
import {
  TopbarComponent,
  CustomHeader,
  FooterComponent,
  CustomButton,
  CustomPrevBtn,
  ManageLoanCardComponent,
  CustomIcon,
} from "./index";
import {useLocation} from "react-router-dom";

const ManageLoanComponent = () => {

  const Location = useLocation();

  const { Housing, Vehicle, QCL } = CustomIcon;

  useEffect(() => {
    console.log(Location);
  })

  const currentLoans = [
    {
      loanType: 'Housing Loan',
      referenceNo: '00000000000'
    },
    {
      loanType: 'Quick Cash Loan',
      referenceNo: 'ABCDEFGHIJ'
    },
    {
      loanType: 'Vehicle Loan',
      referenceNo: 'VHCL12345789'
    }
  ]

  const pastLoans = [
    {
      loanType: 'Vehicle Loan',
      referenceNo: 'VHCL12345789'
    }
  ]

  const currentLoansIcon = [
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

  const PastLoansIcon = [
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
            referenceTxt="reference-txt"/>
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
           />
          )
        })
    )
  }

  const LoanTypeIconHandler = (loanType) => {
    return (
      currentLoansIcon?.map(( icon, key ) => {
        return icon.loanType === loanType ? icon.icon : <></>
      })
    )
  }

  return (
    <div className="manage-loans">
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
                <CustomButton name="Add" styles="custom-button add-btn" />
              </div>
              <CurrentLoansCards/>
              
            </div>
            <div className="past-loan-card">
              <div className="past-loan-btn-container">
                <div className="pastloanstxt">Past Loans</div>
              </div>
              <PastLoansCards/>
              {/* <div className="overlap">
                <div className="icon-content">
                  <img
                    className="pastloan-icon"
                    alt="Pastloan icon"
                    src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/v-icon@2x.png"
                  />
                  <div className="overlap-group">
                    <div className="pastloantxt">Vehicle Loan</div>
                    <div className="pastloantxtt">Ref. no. 0000000000</div>
                  </div>
                </div>
                <CustomButton
                  name="Details"
                  styles="custom-button details-btn"
                />
              </div> */}
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default ManageLoanComponent;
