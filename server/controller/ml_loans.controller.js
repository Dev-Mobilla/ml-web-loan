const {ErrorThrower} = require("../utils/ErrorGenerator");
const SignatureGenerator = require("../utils/signatureGenerator");
const axios = require('axios');

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
            }

            const config = {
                headers
            }

            const response = await RefundBillsPayApi(URL, config);

            console.log("praise the lord");

            console.log("refundApiResponse", response);
            return response

        }else{

            let error =  ErrorThrower(404, "RESOURCE_NOT_FOUND", "No kptn provided");

            throw error
        }

    })
    .then(resp => {
        console.log("dsfdg");
        res.send(resp.data)
    })
    .catch(error => {
        console.log("next catch");
        next(error)
    })
}

const UpdateBillsPaymentApi = async (req, res, next) => {
    const kptn = req.query.kptn;
    const reqBody = req.body;
  
    console.log("reqBody", reqBody);
  
    GenerateToken()
    .then(( response ) => {
        if (response.status === 201 && response.data.data.token) {
            return response.data.data.token;
        }else{
            throw response
        }
    })
    .then(async ( token ) => {
        console.log(token);
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
  
            console.log("praise the lord", response);
  
            return response
  
        }else{
  
            let error =  ErrorThrower(404, "RESOURCE_NOT_FOUND", "No kptn/request body provided");
  
            throw error
        }
  
    })
    .then(resp => {
      res.send(resp.data)
      console.log("dsfdg");
    })
    .catch(error => {
        console.log("next catch", error);
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

      let user = {
        username,
        password
      }
      
      let billersId = process.env.KP7_BILLERS_ID;
      
      let URL = `${process.env.KP7_URL}/MLWebAPI/ApiBillsPay/Service.svc/InquireTransactionV3`;
      
      let passPhrase = billersId + "|" + user;
      let digest = SignatureGenerator(passPhrase);
      console.log(transactionId);
      
      let reqBody = {
        transactionId: transactionId,
        BillersId: billersId,
        Digest: digest
      }
  
      let buffer = Buffer.from(`${username}:${password}`);
  
      let auth = buffer.toString("base64");
  
     let config = {
        headers: {
          Authorization: `Basic ${auth}`,
        }
     }
  
      const response = await CheckKP7TransactionApi(URL, reqBody, config);
     console.log("RESPONSE:", response);
      res.send(response.data)
  
    } catch (error) {
      console.log(error);
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
  
module.exports = {
    GenerateTokenApi,
    UpdateBillsPaymentApi,
    CheckKP7Transaction,
    RefundBillsPaymentApi
  };
  