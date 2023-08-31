import React from "react";
import "../styles/housingloan.css";
import {
  CustomButton,
  CustomHeader,
  CustomPrevBtn,
  CustomStatus,
  FooterComponent,
  TopbarComponent,
} from "./index";

import houseIcon from "../assets/icons/house.png";
import mlicon from "../assets/icons/Paynow_icn.png";

const HousingLoanComponent = () => {
  const recentPayments = [
    { date: "05-14-2023", time: "16:23", amount: "30,625.00" },
    { date: "04-15-2023", time: "12:01", amount: "30,625.00" },
    { date: "03-15-2023", time: "10:30", amount: "30,625.00" },
    { date: "02-09-2023", time: "08:15", amount: "30,625.00" },
    { date: "01-10-2023", time: "22:04", amount: "30,625.00" },
  ];

  return (
    <div className="housing-loan">
      <div className="div">
        <TopbarComponent />
        <CustomHeader title="Manage Existing Loan" />
        <div className="housing-content">
          <CustomPrevBtn />
          <div className="card">
            <div className="h-card">
              <div className="h-card-header">
                <img src={houseIcon} alt="Housing Loan Icon" />
                <div className="h-card-text">
                  <div className="h-ltxt">Housing Loan</div>
                  <div className="h-lrefno">Ref. no. 00000000000</div>
                </div>
              </div>
              <CustomStatus status="Current" styles="custom-current" />
            </div>

            <div className="hl-inputs">
              <div className="input-group">
                <div className="input-label">Due this month</div>
                <div className="input-wrapper">
                  <input className="dueamountph" placeholder="30,625.00" />
                </div>
              </div>
              <div className="input-group">
                <div className="input-label">Late fees &amp; charges</div>
                <div className="input-wrapper">
                  <input className="feesph" placeholder="0.00" />
                </div>
              </div>
              <div className="input-group">
                <div className="input-label">Payment due by</div>
                <div className="input-wrapper">
                  <input className="paymentdueph" placeholder="15 MAY 2023" />
                </div>
              </div>
              <div className="note">
                <div className="paynote">
                  <p>
                    Please pay on or before the due date to avoid late payment
                    charges
                  </p>
                </div>
                <div className="pay-btn">
                  <button className="pay-now-button">
                    <img src={mlicon} alt="ML Icon" />
                    Pay Now
                  </button>
                </div>
              </div>
              <div className="btns">
                <CustomButton
                  name="Payment Schedule"
                  styles="payment-schedule-btn"
                />
                <CustomButton
                  name=" Collateral Details"
                  styles="collateral-details-btn"
                />
              </div>

              <div className="hl-buttom">
                <div className="rec-payment-txt">
                  <h1>Recent Payments</h1>
                </div>
                <div className="rc-details">
                  {recentPayments.map((payment, index) => (
                    <div className="hl-transactions" key={index}>
                      <div className="date">{payment.date}</div>
                      <div className="time"> {payment.time}</div>
                      <div className="ammount">{payment.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default HousingLoanComponent;