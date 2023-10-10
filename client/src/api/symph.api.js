import axios from "axios";
import {ML_LoansAxiosInstance} from "../helper/axios";

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

<<<<<<< Updated upstream
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

const GetCountries = async () => {
  try {
    const response = await ML_LoansAxiosInstance.get(`/api/ml-loans/get-countries`,
    {
      params: {
        name: "countries"
      }
=======
const SessionCookie = async () => {
    const response = await GetSessionCookie();
  
    return response;
}
///api/get-threshold-amount
const Threshold = async () => {
    try {
        const urlToFetch = `${process.env.REACT_APP_BASE_URL}/api/ml-loans/get-threshold-amount`;
        const response = await axios.get(urlToFetch, {
            method: 'GET',
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Access-Control-Allow-Origin': 'http://ml-loans-dev.mlhuillier.com:3000/',
                'Access-Control-Allow-Credentials': 'true',
            },
        });
        console.log(response);
        if (response.status == 200) {
            return response;
        } else {
            return ({message: 'Unable to Fetch Threshold'});
        }
    } catch (error) {
        return ({message: 'Unable to Fetch Threshold'});
>>>>>>> Stashed changes
    }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

const GetProvinces = async () => {
  try {
    const response = await ML_LoansAxiosInstance.get(`/api/ml-loans/get-provinces`,
    {
      params: {
        name: "provinces"
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

const GetCities = async () => {
  try {
    const response = await ML_LoansAxiosInstance.get(`/api/ml-loans/get-cities`,
    {
      params: {
        name: "cities"
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

export { getServiceFee, getThresholdAmount, validateAccountNumber, payNow, GetCountries, GetProvinces, GetCities };
