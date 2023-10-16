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

    const kp7BillsPayResp = await CheckKP7Transaction(kptn);

    const kp7BillsPay = kp7BillsPayResp.data;
    
    // TO DO: IMPLEMENT KP7 BILLSPAY STATUS CHECKING HERE ...
    
    // IF PAYMENT STATUS === PAID AND BILLSPAY STAT == POSTED 
    // CHECK IF BILLSPAY TRANSACTION IN KP7 IS POSTED|FAILED
    // IF FAILED UPDATE SYMPH BILLSPAY TO FAILED THEN REFUND
    // IF POSTED RETURN SUCCESS
    if (paymentStatus === "PAID" && billspayStatus === "POSTED") {
      
      if (kp7BillsPay.respcode === "1" && kp7BillsPay.respmsg === "SUCCESS") {

        res.status(200).json(response.data);
        SuccessLogger(response.url, response.status, `KPTN: ${kptn}, PAY BILLS: ${JSON.stringify(response.data.data)}, KP7: ${kp7BillsPay.respmsg}`);

      }else if (kp7BillsPay.respcode === "0" && kp7BillsPay.respmsg === "Transaction not found.") {

        let reqBody = {
          billspayStatus: "FAILED",
          createdDate
        }

        const updateBillsPay = await UpdateBillsPayment(reqBody, kptn);
        SuccessLogger(updateBillsPay.url, updateBillsPay.status, `SUCCESS UPDATE: Kptn - ${kptn}`);

        const refundBillsPay = await RefundBillsPayment(kptn);
        SuccessLogger(refundBillsPay.url, 200, `Payment pushed through but able to pay for a refund. Kptn : ${kptn}; Refund Date: ${refundBillsPay.data.data.refundDate}`);
        
        const respData = {
          code: "PAYMENT_REFUNDED",
          message: "Your payment has not been processed due to technical issue. Please try again."
        }

        res.status(200).send(respData);

      }else{
        throw kp7BillsPay
      }

    }
     // IF PAYMENT STATUS === PAID AND BILLSPAY STAT === FAILED
        // CHECK IF BILLSPAY TRANSACTION IN KP7 IS IS POSTED|FAILED
          // IF POSTED UPDATE SYMPH BILLSPAY TO POSTED THEN RETURN SUCCESS
          // IF FAILED REFUND
    else if (paymentStatus === "PAID" && billspayStatus === "FAILED") {

      if (kp7BillsPay.respcode === "1" && kp7BillsPay.respmsg === "SUCCESS") {
        
        let reqBody = {
          billspayStatus: "POSTED",
          createdDate
        }

        const updateBillsPay = await UpdateBillsPayment(reqBody, kptn);

        SuccessLogger(updateBillsPay.url, updateBillsPay.status, `SUCCESS UPDATE: Kptn - ${kptn}`);
        res.status(200).json(response.data);

      }else if (kp7BillsPay.respcode === "0" && kp7BillsPay.respmsg === "Transaction not found.") {

        const refundBillsPay = await RefundBillsPayment(kptn);
        SuccessLogger(refundBillsPay.url, 200, `Payment pushed through but able to pay for a refund. Kptn : ${kptn}; Refund Date: ${refundBillsPay.data.data.refundDate}`);
        
        const respData = {
          code: "PAYMENT_REFUNDED",
          message: "Your payment has not been processed due to technical issue. Please try again."
        }

        res.status(200).send(respData);

      }else{

        throw kp7BillsPay
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

const CheckKP7Transaction = async (transactionId) => {
  try {

    const username =  process.env.KP7_USERNAME;
    const password = process.env.KP7_PASSWORD;

    let billersId = process.env.KP7_BILLERS_ID;

    let URL = `${process.env.KP7_URL}/MLWebAPI/ApiBillsPay/Service.svc/InquireTransactionV3`;

    let reqBody = {
      transactionId: transactionId,
      BillersId: billersId,
      Digest: process.env.KP7_DIGEST
    }

    let buffer = Buffer.from(`${username}:${password}`);

    let auth = buffer.toString("base64");

   let config = {
      headers: {
        Authorization: `Basic ${auth}`,
      }
   }

    const response = await CheckKP7TransactionApi(URL, reqBody, config);

    return response;

  } catch (error) {
    return error
  }
}

const CheckKP7TransactionApi = async (URL, body, config) => {
  try {
    const response = await axios.post(URL, body, config);

    return response;
  } catch (error) {
    throw error
  }
}

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
  GenerateToken
};
