import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getServiceFee = async (amount) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/ml-loans/get-service-fee`, {
      params: {
        amount,
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
    const response = await axios.get(`${BASE_URL}/api/ml-loans/get-threshold-amount`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const validateAccountNumber = async (
  reference,
  accountFName,
  accountLName
) => {
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

const payNow = async (
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

export { getServiceFee, getThresholdAmount, validateAccountNumber, payNow };
