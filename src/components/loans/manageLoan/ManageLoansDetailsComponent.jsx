import React, { useState, useEffect } from "react";
import "../../../styles/housingloan.css";
import {
  AlertModalComponent,
  CustomButton,
  CustomHeader,
  CustomPrevBtn,
  CustomStatus,
  FooterComponent,
  TopbarComponent,
} from "../../index";

import houseIcon from "../../../assets/icons/house.png";
import mlicon from "../../../assets/icons/Paynow_icn.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetLoansDetails } from "../../../api/api";
import { GetCollateralDetails } from "../../../api/hatchit.api";
import { Threshold, getServiceFee } from "../../../api/symph.api";
import { GetLoanPaymentSchedule } from "../../../api/hatchit.api";

const ManageLoansDetailsComponent = () => {
  const recentPayments = [
    { date: "05-14-2023", time: "16:23", amount: "30,625.00" },
    { date: "04-15-2023", time: "12:01", amount: "30,625.00" },
    { date: "03-15-2023", time: "10:30", amount: "30,625.00" },
    { date: "02-09-2023", time: "08:15", amount: "30,625.00" },
    { date: "01-10-2023", time: "22:04", amount: "30,626.00" },
  ];

  const [loanDetails, setLoanDetails] = useState({
    dueAmount: "",
    feesAndCharges: "",
    paymentDueDate: "",
    loanType: "",
    referenceNo: "",
    status: "",
  });

  const [alertModal, setAlertModal] = useState(false);

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const LoanId = params.get("id");

  const LoanDetailsHandler = async () => {
    const response = await GetLoansDetails(LoanId);

    if (response.length !== 0) {
      let loan = response[0];

      setLoanDetails({
        dueAmount: loan.amountDue,
        feesAndCharges: loan.charges,
        paymentDueDate: loan.dueDate,
        referenceNo: loan.referenceNo,
        loanType: loan.loanType,
        status: loan.status,
      });
    } else {
      setAlertModal(true);
      setLoanDetails({
        dueAmount: "",
        feesAndCharges: "",
        paymentDueDate: "",
        referenceNo: "",
        loanType: "",
      });
    }
  };
  useEffect(() => {
    LoanDetailsHandler();
  }, []);

  useEffect(() => {
    const fetchServiceFee = async () => {
      let amountfee = 100000;
      const loanServiceFee = await getServiceFee(amountfee);
      console.log("Service Fee:", loanServiceFee);
    };
    fetchServiceFee();
  }, []);

  const OnModalCloseHandler = () => {
    setAlertModal(false);
    navigate("/manage-loans");
  };

  const DownloadIcon = (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Interface / Download">
          {" "}
          <path
            id="Vector"
            d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
            stroke="ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );

  const [paymentSchedule, setPaymentSchedule] = useState(null);

  const handlePaymentScheduleClick = async () => {
    try {
      const schedule = await GetLoanPaymentSchedule();
      setPaymentSchedule(schedule);
    } catch (error) {
      console.error("Error fetching payment schedule:", error);
    }
  };

  return (
    <div className="housing-loan">
      <div className="div">
        <TopbarComponent />
        {alertModal ? (
          <AlertModalComponent
            message="Loan does not exist"
            onClose={OnModalCloseHandler}
          />
        ) : (
          <></>
        )}
        <CustomHeader title="Manage Existing Loan" />
        <div className="housing-content">
          <CustomPrevBtn />
          <div className="card">
            <div className="h-card">
              <div className="h-card-header">
                <img src={houseIcon} alt="Housing Loan Icon" />
                <div className="h-card-text">
                  <div className="h-ltxt">{loanDetails.loanType}</div>
                  <div className="h-lrefno">
                    Ref. no. {loanDetails.referenceNo}
                  </div>
                </div>
              </div>
              <CustomStatus
                status={loanDetails.status}
                styles={
                  loanDetails.status?.toLowerCase() === "current"
                    ? "custom-current"
                    : loanDetails.status?.toLowerCase() === "past due"
                    ? "custom-pastdue"
                    : ""
                }
              />
            </div>

            <div className="hl-inputs">
              <div className="input-group">
                <div className="input-label">Due this month</div>
                <div className="input-wrapper">
                  <input
                    className="disable-data"
                    value={loanDetails.dueAmount}
                    disabled
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-label">Late fees &amp; charges</div>
                <div className="input-wrapper">
                  <input
                    className="disable-data"
                    value={loanDetails.feesAndCharges}
                    disabled
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-label">Payment due by</div>
                <div className="input-wrapper">
                  <input
                    className="disable-data"
                    value={loanDetails.paymentDueDate}
                    disabled
                  />
                </div>
              </div>
              {loanDetails.status?.toLowerCase() === "current" ? (
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
              ) : (
                <></>
              )}
              <div className="btns">
                <CustomButton
                  name="Payment Schedule"
                  styles="payment-schedule-btn"
                  icon={DownloadIcon}
                  iconStyle="download-icon"
                  onClick={handlePaymentScheduleClick}
                />
                <CustomButton
                  name=" Collateral Details"
                  styles="collateral-details-btn"
                  icon={DownloadIcon}
                  iconStyle="download-icon"
                />

                <GetLoanPaymentSchedule paymentSchedule={paymentSchedule} />
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
      </div>
    </div>
  );
};

export default ManageLoansDetailsComponent;
