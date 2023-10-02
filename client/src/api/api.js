import axios from "axios";
import { Loans } from "../utils/ManageLoansMockData";

const GetLoansDetails = async (loanId) => {
    try {

        let loan = Loans.filter((item, key) => {

            if (loanId === item.loanId) {
                return item;
            }
        })

        return loan;
    } catch (error) {
        console.log(error);
    }
}

const fetchBranch = async () => {
  try {
    const response = await fetch("http://nana.mlhuillier.net:8000/getSheets");
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
  }
};

const GetSessionCookie = async () => {
  try {
    const response = await axios.get("http://ml-loans-dev.mlhuillier.com:5000/api/get-cookie", {
      withCredentials: true
    });
    const res = {
      data: response.data,
      status: response.status,
      message: response.statusText
    }

    return res;

  } catch (error) {
    console.error("Error:", error);

    const res = {
      error: error,
      status: error.status,
    }

    return res;
  }
};

export {
  GetLoansDetails,
  fetchBranch,
  GetSessionCookie
};
