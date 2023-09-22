import axios from "axios";
import {HatchITAxiosInstance} from "../helper/axios";
// import sha512 from "crypto-js/sha512";
// import SHA512 from "crypto-js/sha512";

import { sha512 } from "js-sha512";

const baseURL = process.env.REACT_APP_HATCHIT_BASE_URL;
const apiKey = "W1@KLDMWLk@ek$lkj";

const MakeDigest = (payloadString) => {

  const digest = sha512(payloadString + apiKey);
  // console.log('digest', digest, "type", typeof(digest));

  return digest;
}

// const GetLoanDetails = async (reference) => {
// console.log(reference);
//   const payloadString = JSON.stringify(reference);

//   const digest = MakeDigest(payloadString);

//   const url = `${baseURL}/loan_schedules/get/customer/loans/details`
//   try {

//     const response = await HatchITAxiosInstance.get(url,
//       {
//         params: {
//           reference,
//           digest
//         }
//       }
//     )

//     return response;

//   } catch (error) {
//     return error;
//   }

// };

const GetLoanDetails = async (ckycID) => {
  // console.log(ckycID);
    const payloadString = JSON.stringify(ckycID);

    const ckyc_id = ckycID.ckyc_id;
  
    console.log('ckyc_id:', ckyc_id , 'payload:', payloadString);
  
    const digest = MakeDigest(payloadString);
  
    const url = `${baseURL}transactions/get/customer/loans`;

    try {
  
      const response = await HatchITAxiosInstance.get(url,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          params: {
            ckyc_id: ckyc_id,
            digest: digest
          }

        }
      )
      console.log(response);
      return response;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  
  };

const GetLoanCustomerLoans = () => {};

const generateHeaders = (payloadString) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const digest = sha512(payloadString + apiKey).toString();

  const headers = {
    "Content-Type": "application/json",
    Authorization: apiKey,
  };

  return { headers, digest };
};

const makeGetRequest = async (url, params, payloadString) => {
  const { headers, digest } = generateHeaders(payloadString);

  try {
    const response = await axios.get(url, {
      headers,
      params: { ...params, digest },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error("Resource not found.");
      } else if (error.response.status === 500) {
        console.error("Internal Server Error:", error.response.data);
      }
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
};

const GetPaymentSchedule = async (reference) => {
  const baseUrl = process.env.REACT_APP_HATCHIT_BASE_URL;
  const apiUrl = `${baseUrl}/loan_schedules/get/schedule`;

  const payload = {
    reference: reference,
  };
  const payloadString = JSON.stringify(payload);

  return makeGetRequest(apiUrl, { reference }, payloadString);
};

const GetCollateralDetails = async (reference) => {
  const baseUrl = process.env.REACT_APP_HATCHIT_BASE_URL;
  const apiUrl = `${baseUrl}/loan_type_item_field_values/get/customer/loans/collateral`;

  const payload = {
    reference: reference,
  };

  const payloadString = JSON.stringify(payload);

  return makeGetRequest(apiUrl, { reference }, payloadString);
};

export {
  GetLoanCustomerLoans,
  GetLoanDetails,
  GetPaymentSchedule,
  GetCollateralDetails,
};
