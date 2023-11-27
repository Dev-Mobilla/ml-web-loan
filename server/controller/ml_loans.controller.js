const {ErrorThrower} = require("../utils/ErrorGenerator");
const SignatureGenerator = require("../utils/signatureGenerator");
const axios = require('axios');

const HATCH_IT_URL = process.env.HATCHT_IT_BASE_URL;
const APPLY_LOAN_KEY = process.env.APPLY_LOAN_KEY;
const HATCHT_IT_GET_LOAN_FIELDS_KEY = process.env.GET_LOAN_FIELDS;

const QD_GET_LOAN_FIELDS_KEY = process.env.QD_GET_LOAN_FIELDS;
const QD_APPLY_LOAN__KEY = process.env.QD_APPLY_LOAN_KEY;

const LOAN_TYPE = process.env.HATCH_IT_LOAN_TYPE;

const RefundBillsPaymentApi = async (req, res, next) => {

    const kptn = req.query.kptn;

    GenerateToken()
    .then(( response ) => {
        if (response.status === 201 && response.data.data.token) {
            return response.data.data.token;
        }else{
            throw response
        }
    })
    .then(async ( token ) => {
        if (kptn) {

            let URL = `${process.env.API_SYMPH_BASE_URL}/v1/api/1.0/billspay/refund/${kptn}`;

            let makeStringtify = {};

            let passPhrase = makeStringtify + "|" + process.env.SYMPH_SECRET_KEY;

            let x_hash = SignatureGenerator(passPhrase);

            let headers = {
                Authorization: `Bearer ${token}`,
                "x-hash": x_hash,
                // "Accept": "application/json",
                // "Content-Type": "application/json",
            }

            const config = {
                headers
            }

            const response = await RefundBillsPayApi(URL, config);

            return response

        }else{

            let error =  ErrorThrower(404, "RESOURCE_NOT_FOUND", "No kptn provided", null, null, kptn);

            throw error
        }

    })
    .then(resp => {
        res.send(resp.data)
    })
    .catch(error => {
        next(error)
    })
}

const UpdateBillsPaymentApi = async (req, res, next) => {
    const kptn = req.query.kptn;
    const reqBody = req.body;

    const dataBody = {
      kptn,
      reqBody
    }
  
    GenerateToken()
    .then(( response ) => {
        if (response.status === 201 && response.data.data.token) {
            return response.data.data.token;
        }else{
            throw response
        }
    })
    .then(async ( token ) => {
        if (kptn) {
  
            let URL = `${process.env.API_SYMPH_BASE_URL}/v1/api/1.0/billspay/${kptn}`;
  
            let passPhrase = reqBody + "|" + process.env.SYMPH_SECRET_KEY;
  
            let x_hash = SignatureGenerator(passPhrase);
  
            let headers = {
                Authorization: `Bearer ${token}`,
                "x-hash": x_hash,
            }
  
            const config = {
                headers
            }
  
            const response = await UpdateBillsPayApi(URL, reqBody, config);
  
            return response
  
        }else{
  
            let error =  ErrorThrower(404, "RESOURCE_NOT_FOUND", "No kptn/request body provided", null, null, JSON.stringify(dataBody));
  
            throw error
        }
  
    })
    .then(resp => {
      res.send(resp.data)
    })
    .catch(error => {
        next(error)
    })
  }

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
  
      const URL = process.env.AUTH_SERVICE_SYMPH_URL;
      const reqBody = {
        apiKey: process.env.SYMPH_API_KEY,
        signature: digest,
      };
  
      const response = await axios.post(URL, reqBody);
  
      res.send(response.data);
    } catch (error) {
      res.send(error);
    }
  };

  
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
  
      return response;
    } catch (error) {
      return error;
    }
  };
  const CheckKP7Transaction = async (req, res) => {
    try {
      let transactionId = req.body.transactionId;

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

      res.status(200).send(response.data);
  
    } catch (error) {
      res.send(error)
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

const GetLoanTypeFields = async (req, res, next) => {
    try {
        const loantype = JSON.stringify({loan_type: LOAN_TYPE})

        const passPhrase = `${loantype}|${HATCHT_IT_GET_LOAN_FIELDS_KEY}|${QD_GET_LOAN_FIELDS_KEY}`;

        const digest = SignatureGenerator(passPhrase);
        
        const config = {
           params:{
            loan_type: LOAN_TYPE,
            digest: digest
           }
        }
        
        const URL = `${HATCH_IT_URL}/loans_api/v1/loan_type_fields/get/loan_type`;
        
        const getLoanTypeFields = await GetLoanTypeFieldsApi(URL, config);

        let loanFields = getLoanTypeFields.data.data.map((item, key) => {
          return {
            value: "",
            snapshot: JSON.stringify(item),
            field_name: item.field_name
          }
        })

        res.send(loanFields);
    } catch (error) {
        next(error);
    }
}

const GetLoanTypeFieldsApi = async (URL, config) => {
    try {

        const response = await axios.get(URL, config);
        return response;
    } catch (error) {
        throw error
    }
}

const GetLoanTypeItemsFields = async (req, res, next) => {
    try {

        const loantype = JSON.stringify({loan_type: LOAN_TYPE})

        const passPhrase = `${loantype}|${HATCHT_IT_GET_LOAN_FIELDS_KEY}|${QD_GET_LOAN_FIELDS_KEY}`;

        const digest = SignatureGenerator(passPhrase);
        
        const config = {
           params:{
            loan_type: LOAN_TYPE,
            digest: digest
           }
        }
        
        const URL = `${HATCH_IT_URL}/loans_api/v1/loan_type_item_fields/get/loan_type`;
        
        const getLoanTypeItemFields = await GetLoanTypeItemFieldsApi(URL, config);

        
        let itemField = {};
        getLoanTypeItemFields.data.data.forEach((item, key) => {

          itemField[key] = {
            field_name: item.field_name,
            type: item.field_type,
            value: "",
            snapshot: JSON.stringify(item)
          }

        })
        res.send(JSON.stringify(JSON.stringify(itemField)));

    } catch (error) {
        next(error);
    }
}

const GetLoanTypeItemFieldsApi = async (URL, config) => {
    try {

        const response = await axios.get(URL, config);
        return response;

    } catch (error) {
        throw error
    }
}

const AddLoan = async (req, res, next) => {
    try {
        const loantype = JSON.stringify({loan_type: LOAN_TYPE})

        const passPhrase = `${loantype}|${APPLY_LOAN_KEY}|${QD_APPLY_LOAN__KEY}`;

        const digest = SignatureGenerator(passPhrase);

        const config = {
            params:{
                loan_type: LOAN_TYPE,
                digest: digest
            }
        }

        // const data = {

        // }
         
        const URL = `${HATCH_IT_URL}/loans_api/v1/transactions/apply_loan`;

        const addLoan = await AddLoanApi(URL, data, config);
        
    } catch (error) {
        next(error)
    }
}

const AddLoanApi = async (URL, data, config) => {
    try {

        const response = await axios.post(URL, data, config);

        return response;
        
    } catch (error) {
        throw error
    }
}

const GetOTPCode = async (req, res, next) => {
  try {

    const URL = `${process.env.ML_WALLET_OTP_URL}/MLWalletOTP/api/WalletOTP/ext/sendOTP`;

    const mobileNumber = req.body.mobileNumber;

    const reqBody = {mobileNumber: mobileNumber}

    const config = {
      params:{
        username: process.env.ML_WALLET_OTP_UNAME,
        password: process.env.ML_WALLET_OTP_PASS,
        mobileno: mobileNumber,
        otp_msg: `Your M.Lhuillier One-Time-Pin (OTP) is <otp>. Please do not share this code with anyone.`,
        timeLimit: 1
      }
    }

    const response = await axios.post(URL, {}, config);

    const isError = Boolean(response.data.error);

    if (!isError) {
      res.send(response.data);
    }else{
      const message = {
        title: "Request OTP failed",
        body: response.data.message
      }
      const errRes = ErrorThrower(500, "ERR_SMS_OTP", message, null, URL, JSON.stringify(reqBody));

      throw errRes
    }

  } catch (error) {
    console.log("OTP",error);
    next(error)
  }
}
  
module.exports = {
    GenerateTokenApi,
    UpdateBillsPaymentApi,
    CheckKP7Transaction,
    RefundBillsPaymentApi,
    GetLoanTypeFields,
    GetLoanTypeItemsFields,
    AddLoan,
    GetOTPCode
  };
  