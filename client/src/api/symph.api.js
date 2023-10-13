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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    throw error;
  }
};

const CreateCustomerDetailsToSymph = async (customerDataToSymph) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/ml-loans/symph/basic-kyc`,
      customerDataToSymph
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const SearchKyc = async (mobileNumber) => {
  try {
    const response = await ML_LoansAxiosInstance.get(
      `/api/ml-loans/symph/get-customers`,
      {
        params: {
          cellphoneNumber: mobileNumber,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
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
};
