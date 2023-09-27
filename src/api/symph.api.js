import { SymphAxiosInstance } from '../helper/axios';
import { getCookieData } from "../utils/CookieChecker";

const LoanBillsPay = () => { }
const Login = () => {}
const LoanBillsPay = () => {}

const baseURL = process.env.REACT_APP_SYMPH_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const Threshold = async () => {
    try {
        const urlToFetch = `/v1/api/1.0/ml-loans/threshold-amount`;
        const response = await SymphAxiosInstance.get(urlToFetch, {
            method: 'GET',
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Access-Control-Allow-Origin': 'http://ml-loans-dev.mlhuillier.com:3000/',
                'Access-Control-Allow-Credentials': 'true',
            },
        });
        if (response.status == 200) {
            return response;
        } else {
            console.error('Error:', response.JSON);
        }
    } catch (error) {
        console.error('Error fetching threshold:', error);
        return error;
    }
}

const Paynow = async (amountDue, charges) => {
    try {
        const parsedAmountDue = parseFloat(amountDue.replace(/,/g, ''));
        const parsedCharges = parseFloat(charges.replace(/,/g, ''));
        const totalAmount = parsedAmountDue + parsedCharges;
        const totalAmountPaid = totalAmount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        const getCookie = getCookieData();
        if (getCookie != null) {
            const urlToPost = '/v1/api/1.0/ml-loans/validate-account-number';
            const RequestBody = {
                "accountFirstName": getCookie.firstName,
                "accountLastName": getCookie.lastName,
                "accountMiddleName": getCookie.middleName,
                "accountNumber": getCookie.mobileNumber,
                "amountPaid": totalAmountPaid,
            }
            const response = await SymphAxiosInstance.get(urlToPost, {
                method: 'POST',
                body: JSON.stringify(RequestBody)
            });

            if (response.status == 200) {
                console.log('Data:', response);
            } else if (response.status == 401) {
                console.log('Authentication Error: ', response.status);
            } else if (response.status == 400){
                console.log('Cash Transfer Not Enough Balance Error: ', response.status);
            } else if (response.status == 403){
                console.log('Tier Limit Error: ', response.status);
            }else {
                console.error('Error ni siya:', response.status);
            }
        }
    } catch (error) {
        console.log('catch: ',error);
    }
}
const getServiceFee = async (amountfee) => {
    try{
      const response = await SymphAxiosInstance.get("/v1/api/1.0/ml-loans/service-fee", {
         params:{
            amount: amountfee
         }
      });
      return response;
  
    }catch(error){
      console.error("Error" , error)
    }
  
  }

export {
    Login,
    LoanBillsPay,
    getServiceFee,
    Threshold, 
    Paynow
}