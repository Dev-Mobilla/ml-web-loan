const { default: axios } = require("axios");

const handleApiError = (error) => {
  throw error;
};

const API_BASE_URL = process.env.API_SYMPH_BASE_URL;

const getServiceFee = async (req, res) => {

  try {
    const url = `${API_BASE_URL}/v1/api/1.0/ml-loans/service-fee`;
    const config = {
      headers: {
        Cookie: req.headers.cookie,
      },
      params: {
        amount: req.query.amountFee,
      },
    };

    const response = await axios.get(url, config);

    res.status(200).send(response.data);

    console.log("Respond:", response)
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleApiError("Authentication failed");
    }

    handleApiError(error);
  }
};

const getThresholdAmount = async (req, res) => {
  try {
    const url = `${API_BASE_URL}/v1/api/1.0/ml-loans/threshold-amount`;

    const config = {
      headers: {
        Cookie: req.headers.cookie,
      },
    };

    const response = await axios.get(url, config);

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleApiError("Authentication failed");
    } else {
      handleApiError(error);
    }
  }
};

const validateAccountNumber = async (req, res) => {
  try {
    const url = `${API_BASE_URL}/v1/api/1.0/ml-loans/validate-account-number`;

    const config = {
      headers: {
        Cookie: req.headers.cookie,
      },
    };

    const data = {
      accountNo: req.query.reference,
      accountFName: req.query.acc_fname,
      accountLName: req.query.acc_lname,
    };

    const response = await axios.post(url, data, config);

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleApiError("Authentication failed");
    }

    handleApiError(error);
  }
};

const payNow = async (req, res) => {
  try {
    const url = `${API_BASE_URL}/v1/api/1.0/ml-loans/pay`;

    const config = {
      headers: {
        Cookie: req.query.headers.cookie,
      },
    };

    const data = {
      accountFirstName: req.query.accountFirstName,
      accountLastName: req.query.accountLastName,
      accountMiddleName: req.query.accountMiddleName,
      accountNumber: req.query.accountNumber,
      amountPaid: req.query.amountPaid,
    };

    const response = await axios.post(url, data, config);

    const { billspayStatus, paymentStatus } = response.data;
    if (billspayStatus === "POSTED" && paymentStatus === "PAID") {
      res.status(200).json(response.data);
    } else if (billspayStatus === "FAILED") {
      refundPayment();
    } else {
      handleApiError("Unknown payment error");
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401 && data.error?.code === "AUTHENTICATION_ERROR") {
        handleApiError("Authentication failed");
      } else if (
        status === 400 &&
        data.error?.code === "CASH_TRANSFER_NOT_ENOUGH_BALANCE_ERROR_CODE"
      ) {
        handleApiError("Insufficient balance to proceed with the transaction");
      } else if (
        status === 403 &&
        data.error?.code === "TRANSACTION_NOT_ALLOWED_SENDER"
      ) {
        handleApiError("Transaction exceeds the tier limit");
      }
    }
    console.error("Error", error);
    throw error;
  }
};

const refundPayment = () => {};

module.exports = {
  getServiceFee,
  getThresholdAmount,
  validateAccountNumber,
  payNow,
  refundPayment,
  handleApiError,
};