import { useEffect, useState } from "react";
import { ML_LoansAxiosInstance } from "../helper/axios";

const AddLoan = async (
  vehicleDocsData, 
  employmentDocsData, 
  customerData, 
  loanApplicationData
  ) => {
    try {
      // const UrlToAddLoan = `/api/ml-loans/tables`;
      
      const RequestBody = {
        LoanApplicationJsonData: {
          ...loanApplicationData
        },
        CustomerDetailsJsonData: {
          ...customerData
        },
        EmploymentJsonData: {
          ...employmentDocsData
        },
        VehicleJsonData: {
          ...vehicleDocsData
        },
      };
      const UrlToAddLoan = "api/ml-loans/loans/create-loan";
      const response = await ML_LoansAxiosInstance.post(UrlToAddLoan, { data: JSON.stringify(RequestBody) }, {
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(RequestBody),
      });
      return response;

    } catch (error) {
      console.error("Error Posting:", error);
      return error;
    }
};

const CheckKP7Transaction = async (kptn) => {
  try {
    const response = await ML_LoansAxiosInstance.post(
      `/api/ml-loans/check-transaction`,
      {
        transactionId: kptn
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
export { AddLoan, CheckKP7Transaction};
