const { ErrorThrower } = require("../utils/ErrorGenerator");
const SignatureGenerator = require("../utils/signatureGenerator");
const axios = require("axios");

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
    const { billspayStatus, paymentStatus, kptn } = response.data.data;
    if (paymentStatus === "PAID") {
      if (billspayStatus === "POSTED") {
        res.status(200).json(response.data.data);
      } else if (billspayStatus === "FAILED") {
        RefundBillsPayment(kptn);
      } else {
        handleApiError("Unknown payment error");
      }
    }
  } catch (error) {
    next(error);
  }
};

const RefundBillsPayment = async (kptn) => {
  // const kptn = kptn;

  GenerateToken()
    .then((response) => {
      if (response.status === 201 && response.data.data.token) {
        return response.data.data.token;
      } else {
        throw response;
      }
    })
    .then(async (token) => {
      console.log(token);
      if (kptn) {
        let URL = `${process.env.API_SYMPH_BASE_URL}/v1/api/1.0/billspay/refund/${kptn}`;

        let makeStringtify = {};

        let passPhrase = makeStringtify + "|" + process.env.SYMPH_SECRET_KEY;

        let x_hash = SignatureGenerator(passPhrase);

        console.log(x_hash);

        let headers = {
          Authorization: `Bearer ${token}`,
          "x-hash": x_hash,
          // "Accept": "application/json",
          // "Content-Type": "application/json",
        };

        const config = {
          headers,
        };

        const response = await RefundBillsPayApi(URL, config);

        console.log("praise the lord");

        console.log("refundApiResponse", response);
        return response;
      } else {
        let error = ErrorThrower(404, "RESOURCE_NOT_FOUND", "No kptn provided");

        throw error;
      }
    })
    .then((resp) => {
      console.log("dsfdg");
      return resp;
    })
    .catch((error) => {
      console.log("next catch");
      return error;
    });
};

// const RefundBillsPayment = async (req, res, next) => {

//     const kptn = req.query.kptn;

//     GenerateToken()
//         .then(( response ) => {
//             if (response.status === 201 && response.data.data.token) {
//                 return response.data.data.token;
//             }else{
//                 throw response
//             }
//         })
//         .then(async ( token ) => {
//             console.log(token);
//             if (kptn) {

//                 let URL = `${process.env.API_SYMPH_BASE_URL}/v1/api/1.0/billspay/refund/${kptn}`;

//                 let makeStringtify = {};

//                 let passPhrase = makeStringtify + "|" + process.env.SYMPH_SECRET_KEY;

//                 let x_hash = SignatureGenerator(passPhrase);

//                 console.log(x_hash);

//                 let headers = {
//                     Authorization: `Bearer ${token}`,
//                     "x-hash": x_hash,
//                     // "Accept": "application/json",
//                     // "Content-Type": "application/json",
//                 }

//                 const config = {
//                     headers
//                 }

//                 const response = await RefundBillsPayApi(URL, config);

//                 console.log("praise the lord");

//                 console.log("refundApiResponse", response);
//                 return response

//             }else{

//                 let error =  ErrorThrower(404, "RESOURCE_NOT_FOUND", "No kptn provided");

//                 throw error
//             }

//         })
//         .then(resp => {
//             console.log("dsfdg");
//             res.send(resp)
//         })
//         .catch(error => {
//             console.log("next catch");
//             next(error)
//         })
// }

const RefundBillsPayApi = async (URL, config) => {
  try {
    const response = await axios.post(URL, {}, config);

    return response;
  } catch (error) {
    throw error;
  }
};

const GenerateToken = async () => {
  const dateInstance = new Date();

  const year = dateInstance.getFullYear().toString();
  const month = ("0" + (dateInstance.getMonth() + 1)).slice(-2).toString();
  const day = ("0" + dateInstance.getDate()).slice(-2).toString();

  try {
    const date = year + "-" + month + "-" + day;
    const apikey = process.env.SYMPH_API_KEY;
    const secret = process.env.SYMPH_SECRET_KEY;

    const signature = `${apikey}|${secret}|${date}`;

    const digest = SignatureGenerator(signature);
    // console.log("digest", digest);

    const URL = process.env.AUTH_SERVICE_SYMPH_URL;
    const reqBody = {
      apiKey: process.env.SYMPH_API_KEY,
      signature: digest,
    };

    const response = await axios.post(URL, reqBody);

    return response;
  } catch (error) {
    return error;
  }
};

const GenerateTokenApi = async (req, res) => {
  const dateInstance = new Date();

  const year = dateInstance.getFullYear().toString();
  const month = ("0" + (dateInstance.getMonth() + 1)).slice(-2).toString();
  const day = ("0" + dateInstance.getDate()).slice(-2).toString();

  try {
    const date = year + "-" + month + "-" + day;
    const apikey = process.env.SYMPH_API_KEY;
    const secret = process.env.SYMPH_SECRET_KEY;

    const signature = `${apikey}|${secret}|${date}`;

    const digest = SignatureGenerator(signature);
    console.log("digest", digest);

    const URL = process.env.AUTH_SERVICE_SYMPH_URL;
    const reqBody = {
      apiKey: process.env.SYMPH_API_KEY,
      signature: digest,
    };

    const response = await axios.post(URL, reqBody);

    console.log("response", response);

    res.send(response.data);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getServiceFee,
  getThresholdAmount,
  validateAccountNumber,
  payNow,
  handleApiError,
  RefundBillsPayment,
  GenerateTokenApi,
};
