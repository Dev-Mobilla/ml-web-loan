import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getServiceFee = async (amountFee) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/get-service-fee`, {
      params: {
        amountFee,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getThresholdAmount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/get-threshold-amount`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const validateAccountNumber = async (
  accountNumber,
  accountFName,
  accountLName
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/validate-account-number`,
      {
        accountNo: accountNumber,
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

const payNow = async (
  accountFirstName,
  accountLastName,
  accountMiddleName,
  accountNumber,
  amountPaid
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/pay-now`,
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

export { getServiceFee, getThresholdAmount, validateAccountNumber, payNow };
