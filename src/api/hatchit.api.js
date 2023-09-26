import { sha512 } from "js-sha512";
import { HatchITAxiosInstance } from "../helper/axios";

const MakeDigest = (payloadString) => {

  const digest = sha512(payloadString + "|" + "W1@KLDMWLk@ek$lkj"	);

  return digest;
};

// const makeGetRequest = async (url, params, payloadString) => {
//   // const { headers, digest } = generateHeaders(payloadString);
//   try {
//     const response = await HatchITAxiosInstance.get(url, {
//       // headers,
//       params: { ...params },
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

const MakeGetRequest = async (url, params) => {
    try {
      const response = await HatchITAxiosInstance.get(url, {
        params: { ...params },
        responseType: "json"
      });
      return response;
    } catch (error) {
      throw error;
    }
};

const GetLoans =  async (ckycID) => {

  const payloadString = JSON.stringify(ckycID);

  const ckyc_id = ckycID.ckyc_id;

  const digest = MakeDigest(payloadString.toString());

  const endpoint = `/transactions/get/customer/loans`;

  const params = {
    ckyc_id,
    digest
  }

  return MakeGetRequest(endpoint, params)
  
}

const GetLoanDetails = async (referenceID) => {
  // console.log(ckycID);
  const payloadString = JSON.stringify(referenceID);
  const reference = referenceID.reference;
  
    const digest = MakeDigest(payloadString);
  
    const endpoint = `/loan_schedules/get/customer/loans/details`;

    const params = {
      reference,
      digest
    }

    return await MakeGetRequest(endpoint, params)
}

// const generateHeaders = (payloadString) => {
//   const apiKey = process.env.REACT_APP_API_KEY;
//   const digest = sha512(payloadString + apiKey).toString();
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: apiKey,
//   };
//   return { headers, digest };
// };

const GetPaymentSchedule = async (reference) => {
  const baseUrl = process.env.REACT_APP_HATCHIT_BASE_URL;
  const apiUrl = `${baseUrl}/loan_schedules/get/schedule`;

  const payload = {
    reference: reference,
  };
  const payloadString = JSON.stringify(payload);

  // return makeGetRequest(apiUrl, { reference }, payloadString);
};

const GetCollateralDetails = async (reference) => {
  const baseUrl = process.env.REACT_APP_HATCHIT_BASE_URL;
  const apiUrl = `${baseUrl}/loan_type_item_field_values/get/customer/loans/collateral`;

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
