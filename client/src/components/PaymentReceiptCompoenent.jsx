import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton, CustomHeader, TopbarComponent } from "./index";
import "../styles/paymentReceipt.css";

const PaymentReceiptCompoenent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const SuccessIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="55"
      height="55"
      viewBox="0 0 48 48"
    >
      <path
        fill="#4caf50"
        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
      ></path>
      <path
        fill="#ccff90"
        d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
      ></path>
    </svg>
  );

  const ManageLoansBtn = () => {
    navigate("/manage-loans", { state: null, replace: true });
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/manage-loans");
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null; 
  }

  const { paymentData, createdDate, kptn, mobileNumber } = location.state;

  const date = createdDate;

  const parsedDate = new Date(date.replace(/-/g, "/"));

  const day = parsedDate.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    parsedDate
  );
  const year = parsedDate.getFullYear();
  const time = parsedDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const newCreatedDate = `${day} ${month} ${year} ${time}`;

  return (
    <div className="payment-receipt--wrapper">
      <TopbarComponent />
      <CustomHeader title={"Payment Receipt"} />
      <div className="payment-receipt--container">
        <div className="payment-receipt--notification">
          <h1>Payment Successful</h1>
          <p>
            We're excited to see that you've made your loan payment on time!
            Your payment is now being processed and will be posted within 1-3
            business days.
          </p>
        </div>
        <div className="payment-receipt--content">
          <div className="payment-receipt--header">
            <div className="payment-receipt-icon">{SuccessIcon}</div>
            <div className="payment-header--details">
              <p className="pay-bills">Pay Bills</p>
              <p className="amount">{`Php ${paymentData.amount}`}</p>
              <p className="paid-date">{newCreatedDate}</p>
            </div>
            <hr style={{ borderColor: "#dcdcdc70", borderWidth: "0.5px" }} />
          </div>
          <div className="payment-receipt--body">
            <div className="transaction-details">
              <div className="transaction-title">
                <h1>Transaction Details</h1>
              </div>
              <div className="transaction-section">
                <p className="transaction-label">Transaction Number</p>
                <p className="transaction-value">{kptn}</p>
              </div>
              <div className="transaction-section">
                <p className="transaction-label">Loan Reference No.</p>
                <p className="transaction-value">{paymentData.accountNo}</p>
              </div>
              <div className="transaction-section">
                <p className="transaction-label">Receiver Name</p>
                <p className="transaction-value">
                <span className="firstname">
                    {paymentData.accountLastName}
                  </span>
                  ,
                  <span className="lastname">
                    {paymentData.accountFirstName}
                  </span>
                  
                </p>
              </div>
              <div className="transaction-section">
                <p className="transaction-label">Receiver Mobile No.</p>
                <p className="transaction-value">{mobileNumber}</p>
              </div>
              <div className="transaction-section">
                <p className="transaction-label">Payment Method</p>
                <p className="transaction-value">{paymentData.method}</p>
              </div>
              <div className="transaction-section">
                <p className="transaction-label">Biller</p>
                <p className="transaction-value">{paymentData.loanType}</p>
              </div>
            </div>
            <div className="transaction-amount">
              <div className="transaction-title">
                <h1>Amount</h1>
              </div>
              <div className="transaction-section">
                <p className="transaction-label">Amount Sent</p>
                <p className="transaction-value">{`Php ${paymentData.amount.toLocaleString()}`}</p>
              </div>
              <div className="transaction-section">
                <p className="transaction-label">Service Fee</p>
                <p className="transaction-value">{`Php ${paymentData.serviceFee}`}</p>
              </div>
            </div>
            <div className="transaction-total">
              <div className="transaction-section">
                <p className="transaction-label total">Total</p>
                <p className="transaction-value">{`Php ${
                  (paymentData.amount + paymentData.serviceFee).toLocaleString()
                }`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-receipt--footer">
          <CustomButton
            name={"Manage loans"}
            styles={"payment-btn"}
            EventHandler={ManageLoansBtn}
          />
          <span style={{ fontSize: "26px" }}>&#129170;</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceiptCompoenent;
