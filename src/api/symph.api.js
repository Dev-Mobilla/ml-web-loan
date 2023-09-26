import { SymphAxiosInstance } from "../helper/axios";
const Login = () => {}
const LoanBillsPay = () => {}

const baseURL = process.env.REACT_APP_SYMPH_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const Login = () => { }
const LoanBillsPay = () => { }
const Threshold = async () => {
    try {
        const urlToFetch = `${baseURL}/v1/api/1.0/ml-loans/threshold-amount`;
        const response = await SymphAxios.get(urlToFetch, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Access-Control-Allow-Origin': 'http://ml-loans-dev.mlhuillier.com:3000/',
                'Access-Control-Allow-Credentials': 'true',
            },
            withCredentials: true
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching threshold:', error);
        return error;
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
    Threshold
}