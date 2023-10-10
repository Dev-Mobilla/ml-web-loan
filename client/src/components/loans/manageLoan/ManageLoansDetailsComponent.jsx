import React, { useState, useEffect } from "react";
import "../../../styles/housingloan.css";
import "../../../styles/paymentDetails.css";
import {
  AlertModalComponent,
  CustomButton,
  CustomHeader,
  CustomPrevBtn,
  CustomStatus,
  TopbarComponent,
  LoadingComponent,
  PaymentDetailsModalComponent,
} from "../../index";
import houseIcon from "../../../assets/icons/house.png";
import mlicon from "../../../assets/icons/diamond.png";
// import mlicon from "../../../assets/icons/Paynow_icn.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  GetLoanDetails,
  GetPaymentHistory,
  GetLoanPaymentSchedule,
} from "../../../api/hatchit.api";
import {
  getServiceFee,
  validateAccountNumber,
  getThresholdAmount,
  payNow,
} from "../../../api/symph.api";
import { getCookieData } from "../../../utils/CookieChecker";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body">
          <p className="modal-description">
            Do you want to download the payment schedule?
          </p>
          <div className="modal-actions">
            <CustomButton
              name=" Cancel"
              styles="confirmation-cancel-btn"
              EventHandler={onClose}
            />
            <CustomButton
              name="Download"
              styles="confirmation-btn"
              EventHandler={onConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageLoansDetailsComponent = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const LoanReference = params.get("reference");
  const LoanType = params.get("loan-type");

  const [paymentsHistory, setPaymentHistory] = useState([]);
  const [alertModal, setAlertModal] = useState(false);
  const [alertProps, setAlertProps] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfContent, setPdfContent] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const [loanDetails, setLoanDetails] = useState({
    dueAmount: "",
    feesAndCharges: "",
    paymentDueDate: "",
    loanType: "",
    reference: "",
    status: "",
  });

  const [payNowBtn, setPayNowBtn] = useState({
    isDisable: false,
    classname: "",
    text: "Pay Now"
  })

  const displayError = (error) => {
    setAlertModal(true);
    setAlertProps({
      message: error.message,
    });
  };

  const LoanDetailsHandler = async () => {
    const response = await GetLoanDetails({ reference: LoanReference });

    setLoanDetails({
      dueAmount: "",
      feesAndCharges: "",
      paymentDueDate: "",
      reference: "",
      loanType: "",
    });

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
              reference: loan.reference,
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
        displayError("No data found");
        break;
      case 500:
        displayError("An error occurred while fetching loan details.");
        break;
      default:
        displayError("An error occurred while fetching loan details.");
        break;
    }
  };

  const [paymentSchedule, setPaymentSchedule] = useState({
    error: false,
    firstName: "",
    lastName: "",
    reference: "",
    data: [],
    status: "",
    term: 0,
    message: "",
  });

  const PaymentSchedule = async () => {
    try {
      const response = await GetLoanPaymentSchedule({
        reference: LoanReference,
      });

      if (response.status === 401) {
        const { message } = response.data;
        displayError(message);
        return;
      }

      if (response.status === 500) {
        const { status } = response.data;

        let errorMessage = "";

        switch (status) {
          case "CANCELLED":
          case "DENIED":
            errorMessage = "Loan is cancelled/denied";
            break;
          case "PENDING":
          case "APPROVED":
            errorMessage = "Loan has no payment schedule";
            break;
          default:
            errorMessage = "Loan fully paid";
            break;
        }

        displayError(errorMessage);
        return;
      }

      const { data, firstName, lastName, reference, status, count } =
        response.data;

      const scheduleData = data.map((dataItem) => ({ ...dataItem }));

      setPaymentSchedule({
        error: false,
        firstName,
        lastName,
        reference,
        data: scheduleData,
        status,
        term: count,
      });
    } catch (error) {
      displayError(
        "An internal server error occurred while fetching the payment schedule."
      );
    }
  };

  const handlePaymentSchedule = async () => {
    await PaymentSchedule();
    setShowConfirmation(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPdfContent(null);
    setShowConfirmation(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);

    if (pdfContent) {
      pdfContent.download(`${paymentSchedule.reference}-payment-schedule`);
    }
  };

  useEffect(() => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const { data, firstName, lastName, reference, term, status } =
      paymentSchedule;

    if (data && data.length > 0) {
      const paymentScheduleData = data.map((fetch) => ({
        date: fetch.due_date,
        penalty: fetch.penalty_amount,
        due: fetch.due_amount,
        balance: fetch.total_payable,
        status: fetch.status,
      }));

      const tableHeader = ["", "Date", "Penalty", "Due", "Balance"];

      const tableRows = paymentScheduleData.map((payment, index) => [
        index + 1,
        payment.date,
        payment.penalty,
        payment.due,
        payment.balance,
      ]);

      const tableData = [tableHeader, ...tableRows];

      const docDefinition = {
        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [40, 60, 40, 60],
        background: [
          {
            text: "REPRINTED",
            fontSize: 20,
            color: "gray",
            opacity: 0.2,
            bold: true,
            angle: 90,
            alignment: "center",
            margin: [0, 200],
          },
        ],
        content: [
          { text: `${LoanType}`, style: "header", alignment: "start" },
          {
            text: "Schedule of Payment",
            style: "subheader",
            alignment: "start",
            margin: [0, 0, 0, 5],
          },
          {
            columns: [
              { text: "Name:", style: "label" },
              { text: `${firstName} ${lastName}`, style: "data" },
            ],
            columnGap: 5,
            margin: [0, 0, 0, 2],
          },
          {
            columns: [
              { text: "Reference:", style: "label" },
              { text: `${reference}`, style: "data" },
            ],
            columnGap: 5,
            margin: [0, 0, 0, 2],
          },
          {
            columns: [
              { text: "Term:", style: "label" },
              { text: `${term} months`, style: "data" },
            ],
            columnGap: 5,
            margin: [0, 0, 0, 2],
          },
          {
            columns: [
              { text: "Status:", style: "label" },
              { text: `${status}`, style: "data" },
            ],
          },
          {
            alignment: "center",
            table: {
              headerRows: 1,
              widths: Array(tableData[0].length).fill("*"),
              body: tableData,
            },
            layout: {
              fillColor: function (rowIndex) {
                return rowIndex === 0 ? "#FFFFFF" : null;
              },
            },
            margin: [0, 10, 0, 0],
            fontSize: 8,
            width: "auto",
          },
        ],
        styles: {
          header: { fontSize: 14, bold: true },
          subheader: { fontSize: 12, bold: true },
          data: { fontSize: 10 },
          label: { fontSize: 10, bold: true },
          tableHeader: { bold: true, fontSize: 14, color: "black" },
        },
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);

      setPdfContent(pdfDocGenerator);

      setIsModalOpen(true);
    }
  }, [paymentSchedule]);

  const handleCollateralDetails = () => {
    !LoanReference
      ? displayError("No loan reference found.")
      : navigate(
          `/manage-loans/loan-details/collateral-details?reference=${LoanReference}`
        );
  };

  const PaymentHistoryHandler = async () => {
    const response = await GetPaymentHistory({ reference: LoanReference });

    const displayError = (message) => {
      setMessage(message);
      setPaymentHistory([]);
    };

    switch (response.status) {
      case 200:
        let payment = response.data;

        let paymentHistory = payment.data.loan_schedules;

        setPaymentHistory(paymentHistory);

        break;
      case 404:
        displayError(response.error.response.data.data);
        break;
      case 500:
        setPaymentHistory(response.error.response.data.data);
        setMessage(response.error.response.data.message);
        break;
      default:
        displayError("An error occurred while fetching payment history.");
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

  const handlePayNow = async () => {
    let isSuccess = false;
    try {
      const amount = loanDetails.dueAmount;
      if (amount <= 0) {
        throw createError(
          403,
          "TRANSACTION_NOT_ALLOWED_SENDER",
          "Principal amount is not allowed."
        );
      }
      setPayNowBtn({
        isDisable: true,
        classname: "disabled",
        text: "Loading..."
      })
      const serviceFeeResponse = await getServiceFee(amount);
      const serviceFee = serviceFeeResponse.data.totalServiceFee;
      const thresholdResponse = await getThresholdAmount();
      const accountDetails = getCookieData();

      if (!serviceFeeResponse || !thresholdResponse || !accountDetails) {
        throw createError(
          401,
          "Authentication failed",
          "Authentication failed"
        );
      }

      const { firstName, lastName } = accountDetails;

      const validationResponse = await validateAccountNumber(
        loanDetails.reference,
        firstName,
        lastName
      );

      if (!validationResponse || validationResponse.code === 401) {
        throw createError(
          401,
          "Authentication failed",
          "Authentication failed"
        );
      }

      if (validationResponse.data.responseCode === 3) {
        throw createError(
          401,
          "Invalid account",
          "We are unable to process your request at this time. Please visit your nearest M. Lhuillier branch or contact us at customercare@mlhuillier.com"
        );
      }

      if (validationResponse.data.responseCode !== 1) {
        throw createError(
          401,
          "Authentication failed",
          "Authentication failed"
        );
      }

      const toPay = validationResponse.data.responseSearch.amount;
      if (parseFloat(amount) !== parseFloat(toPay)) {
        throw createError(
          401,
          "Amount mismatch",
          `The amount required by biller is ₱${toPay} pesos`
        );
      }

      const confirmation = await showConfirmationModal({
        loanType: "ML VEHICLE LOANS FINANCING",
        amount: parseFloat(toPay),
        accountFirstName:
          validationResponse.data.responseSearch.accounFirstName,
        accountLastName: validationResponse.data.responseSearch.accountLastName,
        accountNo: loanDetails.reference,
        method: "ML Wallet",
        serviceFee: serviceFee,
        total: parseFloat(toPay),
      });

      if (!confirmation) {
        displayError("Confirmation Error");
        return;
      }

      if (confirmation) {
        setPaymentData(confirmation);
        setShowModal(true);
      }

      setPayNowBtn({
        isDisable: false,
        classname: "",
        text: "Pay Now"
      })

      isSuccess = true;
    } catch (error) {
      setAlertModal(true);
      setAlertProps({
        message: error.displayMessage || "An error occurred",
        title: "Error",
        color: "#ff6562",
        onClose: handleModalClose,
      });
      setPayNowBtn({
        isDisable: false,
        classname: "",
        text: "Pay Now"
      })
    }
  };

  const createError = (code, message, displayMessage) => ({
    code,
    message,
    status: code,
    success: false,
    displayMessage,
  });

  const showConfirmationModal = async (paymentData) => {
    try {
      return paymentData;
    } catch (error) {
      setAlertModal(true);
      setAlertProps({
        message: error.displayMessage || "An error occurred",
        onClose: handleModalClose,
      });
      return false;
    }
  };

  const handleCancelPayment = () => {
    const errorObject = createError(
      400,
      "The payment has been canceled.",
      "The payment has been canceled."
    );

    setPaymentData({});
    setShowModal(false);
    setAlertProps({
      title: "Information",
      message: errorObject.message,
      color: "#0077ff",
      onClose: handleModalClose,
    });
    setAlertModal(true);
  };

  const handleProceedPayment = async (paymentData) => {
    const { firstName, lastName, middleName, accountNo, total } = paymentData;
    try {
      const accountMiddleName = middleName;
      const amountPaid = total;
      const paymentResponse = await payNow(
        firstName,
        lastName,
        accountMiddleName,
        accountNo,
        amountPaid
      );

      if (paymentResponse?.error) {
        const { error } = paymentResponse;
        if (error.code === "CASH_TRANSFER_NOT_ENOUGH_BALANCE_ERROR_CODE") {
          throw createError(
            400,
            "Insufficient Balance",
            "There is insufficient balance to proceed with this transaction. Please try again."
          );
        }
        if (error.code === "TRANSACTION_NOT_ALLOWED_SENDER") {
          throw createError(
            403,
            error.message,
            "Principal amount is not allowed."
          );
        }
      }
      setShowModal(false);
      setAlertModal(true);
      setAlertProps({
        message: "Payment Successful",
        title: "Success",
        color: "#006400",
        onClose: handleModalClose,
      });
    } catch (error) {
      setAlertModal(true);
      setAlertProps({
        message: error.displayMessage || "An error occurred",
        title: "Error",
        color: "#ff6562",
        onClose: handleModalClose,
      });
    }
  };

  useEffect(() => {
    LoanDetailsHandler();
    PaymentHistoryHandler();
  }, []);

  const OnModalCloseHandler = () => {
    setAlertModal(false);
  };

  const DownloadIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
        fill="currentColor"
      />
      <path
        d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
        fill="currentColor"
      />
    </svg>
  );

  const EyeIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className="loan-details">
      <div className="div">
        <TopbarComponent />
        {isLoading ? (
          <LoadingModalComponent />
        ) : (
          <>
            <CustomHeader title="Manage Existing Loan" />
            {alertModal ? (
              <AlertModalComponent
                title={alertProps.title}
                message={alertProps.message}
                color={alertProps.color}
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
                    Ref. no. {loanDetails.reference}
                  </div>
                </div>
              </div>
              <CustomStatus
                status={
                  loanDetails.status === "DISBURSED"
                    ? "Current"
                    : loanDetails.status
                }
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
              )}
              {loanDetails.status?.toLowerCase() === "closed" ? (
                <div className="remarks">
                  <div className="past-remarks">
                    <p>Note/Remarks</p>
                    <p>This {loanDetails.loanType} has been fully paid.</p>
                    <br></br>
                    <p>Please contact loans@mlhuillier.com for more details.</p>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {loanDetails.status?.toLowerCase() === "disbursed" ? (
                <div className="note">
                  <div className="paynote">
                    <p>
                      Please pay on or before the due date to avoid late payment
                      charges
                    </p>
                  </div>
                  <div className="pay-btn" onClick={handlePayNow}>
                    <button className={`pay-now-button ${payNowBtn.classname}`} disabled={payNowBtn.isDisable}>
                      <img src={mlicon} alt="ML Icon" />
                      {
                        payNowBtn.text
                      }
                      {/* Pay Now */}
                    </button>
                  </div>

                  {showModal && (
                    <PaymentDetailsModalComponent
                      paymentData={paymentData}
                      closeModal={handleCancelPayment}
                      proceedPayment={handleProceedPayment}
                    />
                  )}
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
                  EventHandler={handlePaymentSchedule}
                />
                <CustomButton
                  name=" Collateral Details"
                  styles="collateral-details-btn"
                  icon={EyeIcon}
                  iconStyle="download-icon"
                  EventHandler={handleCollateralDetails}
                />
              </div>

              <div className="hl-buttom payment-history">
                <div className="rec-payment-txt">
                  <h1>Recent Payments</h1>
                </div>
                <div className="rc-details">
                  {paymentsHistory ? (
                    paymentsHistory.map((payment, index) => (
                      <div className="hl-transactions" key={index}>
                        <div className="date">{payment.paid_date}</div>
                        <div className="ammount">{payment.paid_amount}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ marginTop: "10px" }}>
                      <p>{message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen && showConfirmation}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default ManageLoansDetailsComponent;
