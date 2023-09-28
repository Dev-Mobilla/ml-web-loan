import React, { useEffect } from "react";
import "../styles/receipt.css";
import {
  CustomHeader,
  TopbarComponent,
} from "./index";
import { useNavigate, useLocation  } from "react-router-dom";


const ReceiptComponent = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state == null) {
      navigate('/vehicle-loan/loan-type/new');
    }
  });
  const BackToDashBoardHandler = () => {
    navigate('/');
  }

  return (
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
                  <p>Reference No.:</p>
                  <p>Loan Type:</p>
                  <p>Terms:</p>
                  <p>Monthly Payment:</p>
                  <p>Loan Amount:</p>
                </div>
                <div className="receipt-details--property-value">
                <p>Juan Dela Cruz</p>
                  <p>MCRRUOXAQZS</p>
                  <p>Car Loan</p>
                  <p>48 Months</p>
                  <p>2,458.00</p>
                  <p>100,000.00</p>
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
  );
};

export default ReceiptComponent;
