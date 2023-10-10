import React from "react";
import "../../../styles/paymentDetails.css";
import { CustomButton } from "../../index";
const PaymentDetailsModalComponent = ({
  paymentData,
  closeModal,
  proceedPayment,
}) => {
  const handlePayment = async () => {
    await proceedPayment(paymentData);
  };
  return (
    <>
      <div className="payment-modal">
        <div className="payment-modal-content">
          <div className="payment-modal-body">
            <h1 className="payment-title">Confirm Details</h1>
            <h4 className="payment-subTitle">
              Please review the details before you proceed
            </h4>
            <div className="payment-body-title">Transaction Details</div>
            <div className="payment-group">
              <div className="payment-label">Biller</div>
              <div className="payment-value">{paymentData.loanType}</div>
            </div>
            <div className="payment-group">
              <div className="payment-label">Account Name</div>
              <div className="payment-value">
                {paymentData.accountFirstName} {paymentData.accountLastName}
              </div>
            </div>
            <div className="payment-group">
              <div className="payment-label">Account Number</div>
              <div className="payment-value">{paymentData.accountNo}</div>
            </div>
            <div className="payment-group">
              <div className="payment-label">Payment Method</div>
              <div className="payment-value">{paymentData.method}</div>
            </div>
            <div className="payment-body-title">Amount</div>
            <div className="payment-group">
              <div className="payment-label">Amount To Pay</div>
              <div className="payment-value">
                P
                {paymentData.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="payment-group">
              <div className="payment-label">Service Fee</div>
              <div className="payment-value">
                P
                {paymentData.serviceFee.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="payment-group">
              <div className="payment-label">Total</div>
              <div className="payment-value">
                P
                {paymentData.total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <h4 className="payment-footTitle">
              Please review the details for this transaction are correct.
            </h4>

            <div className="payment-btns">
              <CustomButton
                name="Cancel Transaction"
                styles="payment-cancel-btn"
                EventHandler={closeModal}
              />
              <CustomButton
                name={`Pay P${paymentData.total}`}
                styles="payment-pay-btn"
                EventHandler={handlePayment}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetailsModalComponent;
