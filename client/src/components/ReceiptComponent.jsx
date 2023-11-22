import React, { useEffect, useState } from "react";
import "../styles/receipt.css";
import {
  CustomHeader,
  LoadingComponent,
  TopbarComponent,
} from "./index";
import { useNavigate, useLocation  } from "react-router-dom";


const ReceiptComponent = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [receiptDetails, setReceiptDetails] = useState({
    fullname: "",
    ref_num:"",
    terms: "",
    loan_amount: "",
    isHousing: false
  });
  const [loanType, setLoanType] = useState();
  const [showReceipt, setShowReceipt] = useState(true);

  useEffect(() => {
    if (location.state == null) {
      navigate('/');
    }else{
      let loan = JSON.parse(location.state.LoanDetails.Loan);
      let data = loan.data.data
      let loan_type = location.state.LoanDetails.LoanType;
      let isHousingLoan = loan_type === "Real Estate Loan";

      setReceiptDetails({
        fullname: data.full_name ? data.full_name.replace(/NULL|null/g, "") : data.full_name,
        ref_num: data.ref_num,
        terms: data.term,
        loan_amount: data.principal_amount,
        isHousing: isHousingLoan
      });
      setLoanType(loan_type);
      setTimeout(() => {
        setShowReceipt(false)
      }, 1500);
    }

  },[]);

  const BackToDashBoardHandler = () => {
    navigate('/');
  }
  const LoadingModalComponent = () => {
    return (
      <div className="alertbackground">
        <LoadingComponent />
      </div>
    );
  };

  return (
   <div>
     {
        showReceipt ? <LoadingModalComponent /> :
        <div className="receipt">
        <div className="receipt-div">
          <TopbarComponent />
          <CustomHeader title="Loan Applied" />
            <div className="receipt-body-bg">
            <div className="receipt-content">
              <div className="receipt-overlap-group-2">
                <p className="receipttitle">Loan request awaiting for approval</p>
                <div className="receiptdetails">
                  <div className="receipt-details--property-name">
                    <p>Applicant Name:</p>
                    <p>Reference No:</p>
                    <p>Loan Type:</p>

                    {
                      !receiptDetails.isHousing ? 
                      (
                        <>
                          <p>Terms:</p>
                          <p>Monthly Payment:</p>
                          <p>Loan Amount:</p>
                        </>
                    )
                      : <></>
                    }
                  </div>
                  <div className="receipt-details--property-value">
                    <p>{receiptDetails.fullname}</p>
                    {/* <p>{receiptDetails.full_name}</p> */}
                    <p>{receiptDetails.ref_num}</p>
                    <p>{loanType}</p>
                    {
                      !receiptDetails.isHousing ? 
                      (
                        <>
                          <p>{receiptDetails.terms} Months</p>
                          <p>0.00</p>
                          <p>{receiptDetails.loan_amount}</p>
                        </>
                      )
                      : <></>
                    }
                  </div>
                  </div>
                </div>
                
                <div className="success-note">
                  <p>Note: Please save your reference number.</p>
                </div>
                <div className="dashboard-back-btn">
                  <div className="receipt-dashboard" onClick={BackToDashBoardHandler}>Go back to Dashboard</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
   </div>
  );
};

export default ReceiptComponent;
