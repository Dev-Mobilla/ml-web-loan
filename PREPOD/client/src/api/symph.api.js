import axios from "axios";
import { ML_LoansAxiosInstance } from "../helper/axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const GetServiceFee = async (amount) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/ml-loans/get-service-fee`,
      {
        params: {
          amount,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetThresholdAmount = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/ml-loans/get-threshold-amount`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const ValidateAccountNumber = async (reference, accountFName, accountLName) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/ml-loans/validate-account-number`,
      {
        reference: reference,
        accountFName,
        accountLName,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const PayNow = async (
  accountFirstName,
  accountLastName,
  accountMiddleName,
  accountNumber,
  amountPaid
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/ml-loans/pay-now`,
      {
        accountFirstName,
        accountLastName,
        accountMiddleName,
        accountNumber,
        amountPaid,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetCountries = async () => {
  try {
    const response = await ML_LoansAxiosInstance.get(
      `/api/ml-loans/symph/get-countries`,
      {
        params: {
          name: "countries",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetProvinces = async () => {
  try {
    const response = await ML_LoansAxiosInstance.get(
      `/api/ml-loans/symph/get-provinces`,
      {
        params: {
          name: "provinces",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetCities = async () => {
  try {
    const response = await ML_LoansAxiosInstance.get(
      `/api/ml-loans/symph/get-cities`,
      {
        params: {
          name: "cities",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const CreateCustomerDetailsToSymph = async (customerDataToSymph) => {
  try {
    const endpoint = `/api/ml-loans/symph/basic-kyc`;
    const response = await axios.post(
      `${BASE_URL}${endpoint}`,
      customerDataToSymph
    );
    return response.data
  } catch (error) {
    if (error.response.status === 409 && error.response.data.code === "REGISTER_MONEY_ACCOUNT_EXISTS") {
      error.response.data.message = "Mobile number already in use."
      error.response.data.subtitle = "Kindly use an alternate mobile number or your officially registered mobile number and email to continue. \n Thank you."
    }else if (error.response.status === 409 && error.response.data.code === "CKYC_KYC_EXISTS") {
      error.response.data.message = "Email already in use."
      error.response.data.subtitle = "Kindly use an alternate email address or your officially registered mobile number and email to continue. \n Thank you."
    }
    throw error.response;
  }
};

const SearchKyc = async (params) => {
  try {
    const response = await ML_LoansAxiosInstance.get(
      `/api/ml-loans/symph/get-customers`,
      {
        // params: {
        //   cellphoneNumber: mobileNumber,
        //   email:email
        // },
        params: {...params}
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
const GetOTP = async (mobileno) => {
  try {
    const response = await ML_LoansAxiosInstance.post(`/api/ml-loans/symph/get-otp`, {
      mobileNumber:mobileno
    })

    return response;
  } catch (error) {
    throw error
  }
}

export {
  CreateCustomerDetailsToSymph,
  GetCities,
  GetCountries,
  GetProvinces,
  GetServiceFee,
  GetThresholdAmount,
  PayNow,
  ValidateAccountNumber,
  SearchKyc,
  GetOTP
};
