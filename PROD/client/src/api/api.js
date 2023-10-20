import axios from "axios";
import { Loans } from "../utils/ManageLoansMockData";
import {ML_LoansAxiosInstance} from "../helper/axios";

const GetLoansDetails = async (loanId) => {
  try {
    let loan = Loans.filter((item, key) => {
      if (loanId === item.loanId) {
        return item;
      }
    });

    return loan;
  } catch (error) {
    console.log(error);
  }
};

const fetchBranch = async () => {
  try {
    const GeolocationUrl = process.env.REACT_APP_GEOLOCATOR_URL; 

    const response = await fetch(`${GeolocationUrl}/getSheets`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    return error
  }
};

const GetSessionCookie = async () => {
  try {
    const response = await ML_LoansAxiosInstance.get("/api/ml-loans/get-cookie",
      {
        withCredentials: true,
      }
    );
    const res = {
      data: response.data,
      status: response.status,
      message: response.statusText,
    };

    return res;
  } catch (error) {

    const res = {
      error: error,
      status: error.status,
    };

    return res;
  }
};

export { GetLoansDetails, fetchBranch, GetSessionCookie };
