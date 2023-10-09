const { ErrorThrower } = require("../utils/ErrorGenerator");
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
    const { billspayStatus, paymentStatus, kptn } = response.data.data;

    if (paymentStatus === "PAID") {
      if (billspayStatus === "POSTED") {
        res.status(200).json(response.data.data);

      } else if (billspayStatus === "FAILED") {

        const refundBillsPay = await RefundBillsPayment(kptn);
        // const refundBillsPay = await RefundBillsPayment("APBSNRKIWGF");
        
        if (refundBillsPay.status === 201) {
            console.log("SUCCESS REFUND");

            let transactionDate = refundBillsPay.data.refundDate;

            let reqBody = {
              billspayStatus: "POSTED",
              transactionDate
            }

            const updateBillsPay = await UpdateBillsPayment(reqBody, kptn);

            if (updateBillsPay.status === 200) {
                console.log("SUCCESS UPDATE");

                res.send(updateBillsPay.data)
            }
            else{
                console.log("ERROR UPDATE");
                throw updateBillsPay
            }
        }else{
            console.log("ERROR REFUND");
            throw refundBillsPay
        }
      }

    //   } else {
    //     handleApiError("Unknown payment error");
    //   }
    }
  } catch (error) {
    console.log("catch error", error);
    next(error);
  }
};

const RefundBillsPayment = async (kptn) => {

    try {

        const getToken = await GenerateToken();

        if (kptn) {
            if (getToken.status === 201 && getToken.data.data.token) {

                let token = getToken.data.data.token;

                let URL = `${process.env.API_SYMPH_BASE_URL}/v1/api/1.0/billspay/refund/${kptn}`;

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

                console.log("praise the lord");

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

            let URL = `${process.env.API_SYMPH_BASE_URL}/v1/api/1.0/billspay/${kptn}`;

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

            console.log("praise the lord");

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
