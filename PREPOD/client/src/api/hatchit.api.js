import { sha512 } from "js-sha512";
import { HatchITAxiosInstance } from "../helper/axios";
import axios from "axios";

const MakeDigest = (payloads) => {
  const payloadString = payloads.join("|");
  const digest = sha512(payloadString);
  return digest;
};

const MakeGetRequest = async (url, params) => {
  try {
    const response = await axios.get(`​https://zhask.mlhuillier.com/loans_api/v1/${url}`, {
      params: { ...params },
      responseType: "json",
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      error,
      status: error.response.status,
    };
  }
};

const createApiRequest = (endpoint) => async (ref) => {
  const payloadString = JSON.stringify(ref);
  const api_key = "W1@KLDMWLk@ek$lkj";
  const digest = MakeDigest([payloadString, api_key]);
  const params = {
    digest,
    ...ref,
  };
  return await MakeGetRequest(endpoint, params);
};

const GetLoans = createApiRequest("/transactions/get/customer/loans");

const GetLoanDetails = createApiRequest(
  "/loan_schedules/get/customer/loans/details"
);

const GetLoanPaymentSchedule = createApiRequest(
  "/loan_schedules/get/customer/loans/schedule"
);

const GetCollateralDetails = createApiRequest(
  "/loan_type_item_field_values/get/customer/loans/collateral"
);

const GetPaymentHistory = createApiRequest(
  "loan_schedules/get/customer/loans/history"
);

export {
  GetLoans,
  GetLoanDetails,
  GetLoanPaymentSchedule,
  GetCollateralDetails,
  GetPaymentHistory,
};
