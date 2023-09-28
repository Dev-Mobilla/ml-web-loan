import React, { useState, useEffect } from "react";
import "../../../styles/housingloan.css";
import {
  AlertModalComponent,
  CustomButton,
  CustomHeader,
  CustomPrevBtn,
  CustomStatus,
  TopbarComponent,
  LoadingComponent,
} from "../../index";

import houseIcon from "../../../assets/icons/house.png";
import mlicon from "../../../assets/icons/Paynow_icn.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetLoanDetails } from "../../../api/hatchit.api";
import { Threshold, getServiceFee, Paynow } from "../../../api/symph.api";
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
  const handlePayNowButton = () => {
    Paynow(loanDetails.dueAmount, loanDetails.feesAndCharges);
  };
  const [alertModal, setAlertModal] = useState(false);
  const [alertProps, setAlertProps] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const LoanReference = params.get("reference");
  const LoanType = params.get("loan-type");

  const LoanDetailsHandler = async () => {
    const response = await GetLoanDetails({reference: LoanReference});
    // const response = await GetLoanDetails({reference: "QBLNUSBMDZT"});
    console.log(response);

    const displayError = (message) => {
      setAlertModal(true);
      setAlertProps({
        message: message
      })
      setLoanDetails({
        dueAmount: "",
        feesAndCharges: "",
        paymentDueDate: "",
        referenceNo: "",
        loanType: "",
      });
    }

    switch (response.status) {
      case 200:
        let loan = response.data;

        let loanPayment = loan.data;
        setIsLoading(true);

        setTimeout(async () => {
          try {
            setLoanDetails({
              dueAmount: loanPayment.due_amount,
              feesAndCharges: loanPayment.penalty_amount,
              paymentDueDate: loanPayment.due_date,
              referenceNo: loan.reference,
              loanType: LoanType,
              status: loan.status,
            });
            
          } catch (error) {
            displayError("An error occurred while fetching the loan details.");
          }
          
          setIsLoading(false);
        }, 3000);
        break;
      case 404:
        displayError("Loan does not exist");
        break;
      case 500:
        displayError("An error occurred while fetching loan details.")
        break;
      default:
        displayError("An error occurred while fetching loan details.")
        break;
    }
  };

  const LoadingModalComponent = () => {
    return (
      <div className="alertbackground">
        <LoadingComponent />
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const thresholding = await Threshold();
    };
    // fetch("/api/getLoanData")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDueAmount(data.dueAmount);
    //     setFeesAndCharges(data.feesAndCharges);
    //     setPaymentDueDate(data.paymentDueDate);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
    LoanDetailsHandler();
  }, []);

  useEffect(() => {
    const fetchServiceFee = async () => {
      let amountfee = 100000;
      const loanServiceFee = await getServiceFee(amountfee);
      console.log("Service Fee:", loanServiceFee);
    };
    // fetchServiceFee();
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
        {isLoading ? (
          <LoadingModalComponent />
        ) : (
          <>
            <CustomHeader title="Manage Existing Loan" />
            {alertModal ? (
              <AlertModalComponent
                message={alertProps.message}
                onClose={OnModalCloseHandler}
              />
            ) : null}
          </>
        )}
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
                  loanDetails.status?.toLowerCase() === "disbursed"
                    ? "custom-current"
                    : loanDetails.status?.toLowerCase() === "closed"
                    ? "custom-pastdue"
                    : ""
                }
              />
            </div>

            <div className="hl-inputs">
              
            {loanDetails.status?.toLowerCase() !== "closed" ? (
              <>
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
                </>
              ) : (
                <></>
              ) }
              {loanDetails.status?.toLowerCase() === "closed" ? (
                <div className="remarks">
                  <div className="past-remarks">
                    <p>
                     Note/Remarks
                    </p>
                    <p>
                      This {loanDetails.loanType} has been fully paid.
                    </p><br></br>
                    <p>
                      Please contact loans@mlhuillier.com for more details.
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              
              {loanDetails.status?.toLowerCase() === "current" ? (
                <div className="note">
                  <div className="paynote">
                    <p>
                      Please pay on or before the due date to avoid late payment
                      charges
                    </p>
                  </div>
                  <div className="pay-btn" onClick={handlePayNowButton}>
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