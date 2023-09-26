import { SymphAxiosInstance } from "../helper/axios";
const Login = () => {}
const LoanBillsPay = () => {}

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
}