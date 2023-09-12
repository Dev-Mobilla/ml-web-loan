import React from "react";
import "../styles/receipt.css";
import {
  CustomHeader,
  CustomPrevBtn,
  FooterComponent,
  TopbarComponent,
} from "./index";

const ReceiptComponent = () => {
  return (
    <div className="receipt">
      <div className="receipt-div">
        <TopbarComponent />
        <CustomHeader title="Loan Applied" />
        <div className="receipt-body-bg">
          <div className="receipt-content">
            <div className="receipt-overlap-group-2">
              <p className="receipttitle">Loan request awaiting for approval</p>
              <p className="receiptdetails">
                Applicant Name: Juan Dela Cruz
                <br />
                Reference No.: MCRRUOXAQZS
                <br />
                Loan Type: Car Loan
                <br />
                Terms: 48 Months
                <br />
                Monthly Payment: 2,458.00
                <br />
                Loan Amount: 100,000.00
              </p>
            </div>
          </div>
          <div className="success-note">
            <p>Note: Please save your reference number.</p>
          </div>
          <div className="dashboard-back-btn">
            <div className="receipt-dashboard">Go back to Dashboard</div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default ReceiptComponent;
