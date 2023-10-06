const { default: axios } = require("axios");
// import RefundBillsPayment from "./symph.controller"

const handleApiError = (message) => {
  throw new Error(message);
};

const API_BASE_URL = process.env.API_SYMPH_BASE_URL;

const getServiceFee = async (req, res, next) => {
  try {
    const url = `${API_BASE_URL}/v1/api/1.0/ml-loans/service-fee`;
    const config = {
      headers: {
        Cookie: req.headers.cookie,
      },
      params: {
        amount: req.query.amount,
      },
    };

    const response = await axios.get(url, config);
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
};

const getThresholdAmount = async (req, res, next) => {
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
    next(error);
  }
};

const validateAccountNumber = async (req, res, next) => {
  try {
    const url = `${API_BASE_URL}/v1/api/1.0/ml-loans/validate-account-number`;
    const config = {
      headers: {
        Cookie: req.headers.cookie,
      },
    };

    const data = {
      accountNo: req.body.reference,
      accountFName: req.body.accountFName,
      accountLName: req.body.accountLName,
    };

    const response = await axios.post(url, data, config);
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

const payNow = async (req, res, next) => {
  try {
    const url = `${API_BASE_URL}/v1/api/1.0/ml-loans/pay`;

    const config = {
      headers: {
        Cookie: req.headers.cookie,
      },
    };

    const data = {
      accountFirstName: req.body.accountFirstName,
      accountLastName: req.body.accountLastName,
      accountMiddleName: req.body.accountMiddleName,
      accountNumber: req.body.accountNumber,
      amountPaid: req.body.amountPaid,
    };

    const response = await axios.post(url, data, config);
    const { billspayStatus, paymentStatus } = response.data.data;
    if (paymentStatus === "PAID") {
      if (billspayStatus === "POSTED") {
        res.status(200).json(response.data.data);
      } else if (billspayStatus === "FAILED") {
        refundPayment();
      } else {
        handleApiError("Unknown payment error");
      }
    }
  } catch (error) {
    next(error);
  }
};

const refundPayment = () => {

};

module.exports = {
  getServiceFee,
  getThresholdAmount,
  validateAccountNumber,
  payNow,
  refundPayment,
  handleApiError,
};
