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
import {
  GetCollateralDetails,
  GetLoanDetails,
  GetPaymentHistory,
} from "../../../api/hatchit.api";
import {
  getServiceFee,
  validateAccountNumber,
  Threshold,
  Paynow,
} from "../../../api/symph.api";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import getCookieValue from "../../../utils/GetCookieValue";
import { GetLoanPaymentSchedule } from "../../../api/hatchit.api";
import { GetCookieByName } from "../../../utils/DataFunctions";


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
              styles="confirmation-btn"
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

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ManageLoansDetailsComponent = () => {
  const recentPayments = [
    { date: "05-14-2023", time: "16:23", amount: "30,625.00" },
    { date: "04-15-2023", time: "12:01", amount: "30,625.00" },
    { date: "03-15-2023", time: "10:30", amount: "30,625.00" },
    { date: "02-09-2023", time: "08:15", amount: "30,625.00" },
    { date: "01-10-2023", time: "22:04", amount: "30,626.00" },
  ];

  const [paymentsHistory, setPaymentHistory] = useState([]);

  const [loanDetails, setLoanDetails] = useState({
    dueAmount: "",
    feesAndCharges: "",
    paymentDueDate: "",
    loanType: "",
    referenceNo: "",
    status: "",
  });
  const handlePayNowButton = async () => {
    let account = GetCookieByName("account_details");

    const res = await Paynow(
      loanDetails.dueAmount,
      loanDetails.feesAndCharges,
      account?.mobileNumber,
      account?.firstName,
      account?.lastName
    );

    console.log("res", res);
    // switch (res.status) {
    //   case 200:

    //   console.log(res);

    //   //   break;
    //   // case 404:
    //   //   displayError("Loan does not exist");
    //   //   break;
    //   // case 500:
    //   //   displayError("An error occurred while fetching loan details.")
    //   //   break;
    //   default:
    //     // displayError("An error occurred while fetching loan details.")
    //     break;
    // }
  };
  const [alertModal, setAlertModal] = useState(false);
  const [alertProps, setAlertProps] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfContent, setPdfContent] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const LoanReference = params.get("reference");
  const LoanType = params.get("loan-type");

  const displayError = (message) => {
    setAlertModal(true);
    setAlertProps({
      message: message,
    });
  };

  const LoanDetailsHandler = async () => {
    const response = await GetLoanDetails({ reference: LoanReference });

    setLoanDetails({
      dueAmount: "",
      feesAndCharges: "",
      paymentDueDate: "",
      referenceNo: "",
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

  const [collateralDetails, setCollateralDetails] = useState({
    error: false,
    data: [],
    fields: [],
  });

  const CollateralDetails = async () => {
    try {
      const response = await GetCollateralDetails({ reference: LoanReference });
      const { data, fields } = response.data;

      const collateralData = data.map((dataItem) => ({ ...dataItem }));

      const collateralFields = fields.map((field) => ({ ...field }));

      setCollateralDetails({
        error: false,
        data: collateralData,
        fields: collateralFields,
      });
    } catch (error) {
      displayError(
        "An internal server error occurred while fetching collateral details."
      );
    }
  };

  const handleCollateralDetails = () => {
    CollateralDetails();
  };

  useEffect(() => {
    // console.log("collateralDetails", collateralDetails);
  }, [collateralDetails]);

  const PaymentHistoryHandler = async () => {
    // const response = await GetPaymentHistory({reference: LoanReference});
    const response = await GetPaymentHistory({reference: "QPNWIJPKDLD"});

    const displayError = (message) => {
      // setAlertModal(true);
      // setAlertProps({
      //   message: message
      // })
      setMessage(message);
      setPaymentHistory([])
    }

    switch (response.status) {
      case 200:
        let payment = response.data;

        let paymentHistory = payment.data.loan_schedules;

        console.log(paymentHistory);
        setPaymentHistory(paymentHistory)

        break;
      case 404:
        displayError(response.error.response.data.data);
        break;
      case 500:
        setPaymentHistory(response.error.response.data.data)
        setMessage(response.error.response.data.message);
        break;
      default:
        displayError("An error occurred while fetching payment history.")
        break;
    }
  }

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
    LoanDetailsHandler();
    PaymentHistoryHandler();
  }, []);

  useEffect(() => {
    const fetchServiceFee = async () => {
      let amountfee = 100000;
      const loanServiceFee = await getServiceFee(amountfee);
    };
    // fetchServiceFee();
  }, []);

  useEffect(() => {
    const validateAccNumber = async () => {
      const decodedAccountDetails = decodeURIComponent(
        getCookieValue("account_details")
      );
      const cookieValue = decodedAccountDetails.substring(
        decodedAccountDetails.indexOf("=") + 1
      );
      try {
        let parsedValue;

        if (typeof cookieValue === "string") {
          try {
            parsedValue = JSON.parse(cookieValue);
          } catch (error) {
            console.error("Error parsing cookie value:", error);
            parsedValue = null;
          }
        }
        // console.log(parsedValue)
        let acc_num, acc_fname, acc_lname;
        if (parsedValue) {
          acc_num = parsedValue.mobileNumber;
          acc_fname = parsedValue.firstName;
          acc_lname = parsedValue.lastName;
        }

        const validAccountNumber = await validateAccountNumber(
          acc_num,
          acc_fname,
          acc_lname
        );

        console.log("Valid account number", validAccountNumber);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    validateAccNumber();
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
                  EventHandler={handlePaymentSchedule}
                />
                <CustomButton
                  name=" Collateral Details"
                  styles="collateral-details-btn"
                  icon={DownloadIcon}
                  iconStyle="download-icon"
                  EventHandler={handleCollateralDetails}
                />
              </div>

              <div className="hl-buttom payment-history">
                <div className="rec-payment-txt">
                  <h1>Recent Payments</h1>
                </div>
                <div className="rc-details">
                  {
                    // console.log(paymentsHistory)
                    paymentsHistory ? (
                      paymentsHistory.map((payment, index) => (
                        <div className="hl-transactions" key={index}>
                          <div className="date">{payment.paid_date}</div>
                          {/* <div className="time"> {payment.time}</div> */}
                          <div className="ammount">{payment.paid_amount}</div>
                        </div>
                      ))
                    ) : (
                      <div style={{ marginTop: "10px" }}>
                        <p>{message}</p>
                      </div>
                    )
                  }
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
