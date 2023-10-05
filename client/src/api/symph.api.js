import { SymphAxiosInstance } from '../helper/axios';
import { getCookieData } from "../utils/CookieChecker";
import {GetSessionCookie} from './api';
import axios from "axios";

const Login = () => {}
const LoanBillsPay = () => {}

const baseURL = process.env.REACT_APP_SYMPH_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const sessionCookieName = process.env.REACT_APP_SESSION_COOKIE_NAME;

SymphAxiosInstance.defaults.withCredentials = true;

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
        // if (response.status == 200) {
        //     return response;
        // } else {
        //     console.error('Error:', response.JSON);
        // }
    } catch (error) {
        console.error('Error fetching threshold:', error);
        return error;
    }
}

const Paynow = async (amountDue, charges, accountNo, accountFName, accountLName) => {

        SessionCookie()
        .then(getSession => {
            if (getSession.status === 200 && getSession.data) {
                return getSession.data.cookie
            }
            throw getSession;

        })
        // .then(async getServiceFee => {
        //     console.log(decodeURIComponent(getCookie));
        //     return await ThresholdAmount(decodeURIComponent(getCookie));
            
        // })
        // .then(async getThreshold => {
        //     console.log(decodeURIComponent(getCookie));
        //     return await ThresholdAmount(decodeURIComponent(getCookie));
            
        // })
        .then(async validateAccount => {
            
            const accountValidated = await ValidateAccount(accountNo, accountFName, accountLName);

            if (accountValidated.status === 200) {
                
                return accountValidated;
            }
            throw accountValidated
        })
        
        // .then(async (getThreSoldAmount, sessionCookie) => {
        //     const urlToPost = '/v1/api/1.0/ml-loans/validate-account-number';

        //     const requestBody = {
        //         "accountFirstName": getCookie.firstName,
        //         "accountLastName": getCookie.lastName,
        //         "accountMiddleName": getCookie.middleName,
        //         "accountNumber": getCookie.mobileNumber,
        //         "amountPaid": totalAmountPaid,
        //     }
        //     const response = await SymphAxiosInstance.get(urlToPost, {
        //         method: 'POST',
        //         body: JSON.stringify(RequestBody)
        //     });
        // })
        .catch(error => {
            console.log("error", error);
            return error
        })

        
        // if (getCookie != null) {
        //     const urlToPost = '/v1/api/1.0/ml-loans/validate-account-number';
        //     const RequestBody = {
        //         "accountFirstName": getCookie.firstName,
        //         "accountLastName": getCookie.lastName,
        //         "accountMiddleName": getCookie.middleName,
        //         "accountNumber": getCookie.mobileNumber,
        //         "amountPaid": totalAmountPaid,
        //     }
        //     const response = await SymphAxiosInstance.get(urlToPost, {
        //         method: 'POST',
        //         body: JSON.stringify(RequestBody)
        //     });

        //     if (response == 200) {
        //         console.log('Data:', response);
        //     } else {
        //         console.error('Error:', response.JSON);
        //     }
        // }
}
const ValidateAccount = async (accountNo, accountFName, accountLName) => {
    try {
        const reqBody = {
            accountNo,
            accountFName,
            accountLName
        }

        const stringify = JSON.stringify(reqBody);

        const response = await SymphAxiosInstance.post("/v1/api/1.0/ml-loans/validate-account-number",
            { stringify },
            {
                withCredentials: true,
                method: "POST"
            }
                                                                                                                    
        )
        return response;

    } catch (error) {
        return error
    }
}

const ThresholdAmount = async () => {
    try {
        const response = await SymphAxiosInstance.get("/v1/api/1.0/ml-loans/threshold-amount", {
           withCredentials: true,

        });
        return response;

    } catch (error) {
        return error
    }
}

const getServiceFee = async (amountfee) => {
    try{

      const response = await SymphAxiosInstance.get("/v1/api/1.0/ml-loans/service-fee", {
         params:{
            amount: amountfee
        },
        withCredentials: true
         
      });
      return response;
  
    }catch(error){
      console.error("Error" , error)
    }
  
  }

const validateAccountNumber =  async(acc_num, acc_fname, acc_lname) =>{
    try{
        const response = await SymphAxiosInstance.post("/v1/api/1.0/ml-loans/validate-account-number",{
            params:{
                accountNo:acc_num,
                accountFname:acc_fname,
                accountLname:acc_lname
            }
        });
        return response;
    }catch(error){
        console.error("Error", error)
    }
}

export {
    Login,
    LoanBillsPay,
    getServiceFee,
    ThresholdAmount, 
    Threshold,
    validateAccountNumber,
    Paynow
}