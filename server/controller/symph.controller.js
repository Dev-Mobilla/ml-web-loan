const { ErrorThrower } = require("../utils/ErrorGenerator");
const SuccessLogger = require("../utils/SuccessLogger");
const SignatureGenerator = require("../utils/signatureGenerator");
const axios = require("axios");

const handleApiError = (message) => {
  throw new Error(message);
};

const API_BASE_URL = process.env.API_SYMPH_BASE_URL;

const GetServiceFee = async (req, res, next) => {
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
    console.log("response", response);
    res.status(200).send(response.data);
    SuccessLogger(response.url, response.status, `GET SERVICE FEE: ${JSON.stringify(response.data)}`);

  } catch (error) {
    console.log("service fee");
    next(error);
  }
};

const GetThresholdAmount = async (req, res, next) => {
  try {
    const url = `${API_BASE_URL}/v1/api/1.0/ml-loans/threshold-amount`;
    const config = {
      headers: {
        Cookie: req.headers.cookie,
      },
    };

    const response = await axios.get(url, config);
    res.status(200).json(response.data);
    SuccessLogger(response.url, response.status, `GET THRESHOLD AMOUNT: ${JSON.stringify(response.data)}`);
  } catch (error) {
    next(error);
  }
};

const ValidateAccountNumber = async (req, res, next) => {
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
    SuccessLogger(response.url, response.status, `VALIDATE ACCOUNT: ${JSON.stringify(response.data)}`);
  } catch (error) {
    next(error);
  }
};

const PayNow = async (req, res, next) => {
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
    const { billspayStatus, paymentStatus, kptn, createdDate } = response.data.data;

    if (paymentStatus === "PAID" && billspayStatus === "POSTED") {
        res.status(200).json(response.data);
      SuccessLogger(response.url, response.status, `PAY BILLS: ${JSON.stringify(response.data.data)}`);

    }
    else if (paymentStatus === "PAID" && billspayStatus === "FAILED") {
      SuccessLogger(response.url, response.status, `PAY BILLS: ${JSON.stringify(response.data.data)}`);

      let reqBody = {
        billspayStatus: "POSTED",
        createdDate
      }

      const updateBillsPay = await UpdateBillsPayment(reqBody, kptn);
      const updateResponse = updateBillsPay.data.data;

      if (updateResponse.billspayStatus === "POSTED" && updateResponse.paymentStatus === "PAID") {
          SuccessLogger(updateBillsPay.url, updateBillsPay.status, `SUCCESS UPDATE: Kptn - ${kptn}`);
          res.status(updateBillsPay.status).send(updateBillsPay.data);
      }
      else if (updateResponse.billspayStatus === "FAILED" && updateResponse.paymentStatus === "PAID") {
        console.log("ERROR UPDATE");

        const refundBillsPay = await RefundBillsPayment(kptn);

        if (refundBillsPay.status === 201) {

          let data = {
            billsPay: response.data.data,
            refund: refundBillsPay.data.data
          }
          SuccessLogger(updateResponse.url, 200, `Payment pushed through but able to pay for a refund. Kptn : ${kptn}; Refund Date: ${refundBillsPay.data.data.refundDate}`);

          res.status(200).send(data);

        }else{

          throw refundBillsPay
        }
        
      }else{
        throw updateBillsPay
      }
    }else{
      throw response
    }
  } catch (error) {
    next(error);
  }
};

const RefundBillsPayment = async (kptn) => {

    try {

        const getToken = await GenerateToken();

        if (kptn) {
            if (getToken.status === 201 && getToken.data.data.token) {

                let token = getToken.data.data.token;

                let URL = `${API_BASE_URL}/v1/api/1.0/billspay/refund/${kptn}`;

                let makeStringtify = {};

                let passPhrase = makeStringtify + "|" + process.env.SYMPH_SECRET_KEY;

                let x_hash = SignatureGenerator(passPhrase);

                let headers = {
                    Authorization: `Bearer ${token}`,
                    "x-hash": x_hash,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                };

                const config = {
                    headers,
                };

                const response = await RefundBillsPayApi(URL, config);

                SuccessLogger(URL, response.status, `REFUND BILLSPAY: ${JSON.stringify(response.data)}`)

                return response;
        
            }else{
                throw getToken;
            }
        }else{

            let error = ErrorThrower(404, "RESOURCE_NOT_FOUND", "No kptn provided");

            throw error;
        }
    
    } catch (error) {
        return error
    }
};

const UpdateBillsPayment = async (reqBody, kptn) => {

  try {

    const getToken = await GenerateToken();

    if (kptn) {
        if (getToken.status === 201 && getToken.data.data.token) {

            let token = getToken.data.data.token;

            let URL = `${API_BASE_URL}/v1/api/1.0/billspay/${kptn}`;

            let passPhrase = reqBody + "|" + process.env.SYMPH_SECRET_KEY;

            let x_hash = SignatureGenerator(passPhrase);

            let headers = {
                Authorization: `Bearer ${token}`,
                "x-hash": x_hash,
                "Accept": "application/json",
                "Content-Type": "application/json",
            };

            const config = {
                headers
            };

            const response = await UpdateBillsPayApi(URL, reqBody, config);

            SuccessLogger(URL, response.status, `UPDATE BILLSPAY: ${JSON.stringify(response.data)}`)

            return response;
    
        }else{
            throw getToken;
        }
    }else{

        let error = ErrorThrower(404, "RESOURCE_NOT_FOUND", "No kptn/request body provided");

        throw error;
    }

  } catch (error) {
      return error
  }

}

const RefundBillsPayApi = async (URL, config) => {
  try {
    const response = await axios.post(URL, {}, config);
    return response;
  } catch (error) {
    throw error;
  }
};

const UpdateBillsPayApi = async (URL, reqBody, config) => {
  try {
    const response = await axios.patch(URL, reqBody, config);
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

    const URL = process.env.AUTH_SERVICE_SYMPH_URL;

    const reqBody = {
      apiKey: process.env.SYMPH_API_KEY,
      signature: digest,
    };

    const response = await axios.post(URL, reqBody);

    SuccessLogger(URL, response.status, `GET TOKEN: ${JSON.stringify(response.data)}`);

    return response;

  } catch (error) {
    return error;
  }
};


module.exports = {
  GetServiceFee,
  GetThresholdAmount,
  ValidateAccountNumber,
  PayNow,
  handleApiError,
  RefundBillsPayment,
};
