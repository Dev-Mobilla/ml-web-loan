const axios = require("axios");
const { customer_details } = require("../models/associations");
const { GenerateToken } = require("../controller/billspayment.controller");
const SignatureGenerator = require("../utils/signatureGenerator");

const x_api_key = process.env.CKYC_API_KEY;
const ML_MONEY_URL = process.env.ML_MONEY_API_URL;

// async function CreateCustomerDetails(customerValue, options) {
//   try {
//     const createdCustomer = await customer_details.customCreate(
//       customerValue,
//       options
//     );
//     return createdCustomer;
//   } catch (error) {
//     // return null;
//     return error
//   }
// }

// async function FindCustomerDetails(
//   last_name,
//   first_name,
//   middle_name,
//   mobile_number
// ) {
//   const findByName = await customer_details.findOne({
//     where: {
//       first_name: first_name,
//       last_name: last_name,
//       middle_name: middle_name,
//       mobile_number: mobile_number,
//     },
//     limit: 1,
//   });
//   console.log("find", findByName);
//   if (findByName) {
//     return findByName;
//   } else {
//     return null;
//   }
// }

const CreateCustomerDetailsToSymph = async (req, res, next) => {
  try {
    const getToken = await GenerateToken();
    const {
      address,
      email,
      firstName,
      lastName,
      middleName,
      mobileNumber,
      suffix,
    } = req.body;

    const body = {
      address,
      email,
      firstName,
      lastName,
      middleName,
      mobileNumber,
      suffix,
    };

    const token = getToken.data.data.token;
    const passPhrase =
      JSON.stringify(body) + "|" + process.env.SYMPH_SECRET_KEY;
    const x_hash = SignatureGenerator(passPhrase);

    const headers = {
      Authorization: `Bearer ${token}`,
      "x-hash": x_hash,
      "x-api-key": x_api_key,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const config = {
      headers,
    };

    const response = await axios.post(
      `${ML_MONEY_URL}/api/register/basic-kyc`,
      body,
      config
    );

    const { data } = response.data;

    res.status(201).json({ data });
  } catch (error) {
    console.error(error);

    const errorResponse = {
      401: { code: "INVALID_JWT_TOKEN", message: "Token Already Expired" },
      409: { code: "CKYC_KYC_EXISTS", message: "Customer already exists." },
    };

    if (error.response && errorResponse[error.response.status]) {
      const { code, message } = errorResponse[error.response.status];
      res.status(error.response.status).json({ error: { code, message } });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
    next(error);
  }
};

module.exports = {
  CreateCustomerDetailsToSymph,
  // CreateCustomerDetails,
  // FindCustomerDetails,
};
