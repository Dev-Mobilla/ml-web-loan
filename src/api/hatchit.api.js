import axios from "axios";
import sha512 from "crypto-js/sha512";

const GetLoanDetails = () => {
  console.log(process.env.REACT_APP_HATCHIT_BASE_URL);
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
