import { useEffect, useState } from "react";
import { ML_LoansAxiosInstance } from "../helper/axios";

const AddLoan = async (request) => {
  try {
    // const UrlToAddLoan = `/api/ml-loans/tables`;

    console.log("REQUEST: ", request);
    const loanType = request.loan_type;
    let plateNumber = request.plate_number;
    let engineNumber = request.engine_number;
    let chassisNumber = request.chassis_number;
    const RequestBody = {
      LoanApplicationJsonData: {
        application_reference: "application-reference-1",
        application_date: new Date(),
        vehicle_type: request.vehicle_type,
        loan_type: request.loan_type,
        year: request.year,
        make: request.make,
        model: request.model,
        variant: request.variant,
        plate_number: plateNumber,
        engine_number: engineNumber,
        chassis_number: chassisNumber,
        preferred_branch: request.preferred_branch,
      },
      CustomerDetailsJsonData: {
        last_name: request.last_name,
        first_name: request.first_name,
        middle_name: request.middle_name,
        birth_date: request.birth_date,
        nationality: request.nationality,
        civil_status: request.civil_status,
        employer: request.employer,
        nature_of_business: request.nature_of_business,
        tenure_length: request.tenure_length,
        office_address: request.office_address,
        office_landline: request.office_landline,
        source_of_income: request.source_of_income,
        gross_monthly_income: request.gross_monthly_income,
        current_address: request.current_address,
        mobile_number: request.mobile_number,
        email: request.email,
      },
      EmploymentJsonData: {
        valid_id: request.valid_id,
        employee_cert: request.employee_cert,
        payslip: request.payslip,
        mayor_cert: request.mayor_cert,
        bank_cert: request.bank_cert,
      },
      VehicleJsonData: {
        original_or: request.original_or,
        stencils: request.stencils,
        car_insurance: request.car_insurance,
        front_side: request.front_side,
        back_side: request.back_side,
        right_side: request.right_side,
        left_side: request.left_side,
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
export default AddLoan;
