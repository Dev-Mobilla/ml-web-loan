import { sha512 } from "js-sha512";
// import { HatchITAxiosInstance } from "../helper/axios";
import axios from "axios";

const baseURL = process.env.REACT_APP_HATCHIT_BASE_URL;
const apiKey = "W1@KLDMWLk@ek$lkj";

const MakeDigest = (payloadString) => {
  const digest = sha512(payloadString + "|" + apiKey);

  console.log("digest", payloadString + "|" + apiKey);
  console.log("digest", digest);

  return digest
}

const GetLoans =  async (ckycID) => {

  const payloadString = JSON.stringify(ckycID);

  const ckyc_id = ckycID.ckyc_id;

  const digest = MakeDigest(payloadString);

  const url = `https://loandev.mlhuillier.com/loans_api/v1/transactions/get/customer/loans?ckyc_id=${ckyc_id}&digest=${digest}`;

  const response = await fetch(url);

  console.log('response', response);
}

const GetLoanDetails = async (ckycID) => {
  // console.log(ckycID);
    const payloadString = JSON.stringify(ckycID);

    const ckyc_id = ckycID.ckyc_id;
  
    const digest = MakeDigest(payloadString);
  
    const url = `https://loandev.mlhuillier.com/loans_api/v1/transactions/get/customer/loans`;

    try {
  
      const response = await axios.get("https://loandev.mlhuillier.com/loans_api/v1/transactions/get/customer/loans",
        {
          responseType: "json",
          params: {
            ckyc_id,
            digest
          }

        }
      )
      console.log('response', response);
      return response;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  
  };


const generateHeaders = (payloadString) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const digest = sha512(payloadString + apiKey).toString();

  const headers = {
    "Content-Type": "application/json",
    Authorization: apiKey,
  };

  return { headers, digest };
};

// const makeGetRequest = async (url, params, payloadString) => {
//   const { headers, digest } = generateHeaders(payloadString);

//   try {
//     const response = await HatchITAxiosInstance.get(url, {
//       headers,
//       params: { ...params, digest },
//     });

//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       if (error.response.status === 404) {
//         console.error("Resource not found.");
//       } else if (error.response.status === 500) {
//         console.error("Internal Server Error:", error.response.data);
//       }
//     } else {
//       console.error("Error:", error.message);
//     }
//     throw error;
//   }
// };

const GetPaymentSchedule = async (reference) => {
  const apiUrl = `${baseURL}/loan_schedules/get/schedule`;

  const payload = {
    reference: reference,
  };
  const payloadString = JSON.stringify(payload);

  // return makeGetRequest(apiUrl, { reference }, payloadString);
};

const GetCollateralDetails = async (reference) => {
  const apiUrl = `${baseURL}/loan_type_item_field_values/get/customer/loans/collateral`;

  const payload = {
    reference: reference,
  };
  const payloadString = JSON.stringify(payload);

  // return makeGetRequest(apiUrl, { reference }, payloadString);
};

// const GetLoanCustomerLoans = () => {};

export {
  // GetLoanCustomerLoans,
  GetLoanDetails,
  GetPaymentSchedule,
  GetCollateralDetails,
  GetLoans
};
