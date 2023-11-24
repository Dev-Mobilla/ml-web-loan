const express = require("express");
const ML_PUBLIC_ROUTER = express.Router();
const LoanApplicationsController = require("../controller/loan_application_controller");


// ML_PUBLIC_ROUTER.post("/create-loan/sample", async (req, res) => {
//   const reqBody = req.body.data;
//   // const parsedReqBody = JSON.parse(reqBody);
//   // console.log(parsedReqBody);

//   try {
//     let customerValue;
//     // const { last_name, first_name, middle_name, mobile_number } =
//     //   parsedReqBody.CustomerDetailsJsonData;
//     const { last_name, first_name, middle_name, mobile_number } =
//       reqBody.CustomerDetailsJsonData;

//     const findCustomerDetails = await CustomerController.FindCustomerDetails(
//       last_name,
//       first_name,
//       middle_name,
//       mobile_number
//     );

//     if (findCustomerDetails) {
//       customerValue = findCustomerDetails;
//     } else {
//       customerValue = reqBody.CustomerDetailsJsonData;
//       // customerValue = parsedReqBody.CustomerDetailsJsonData;
//     }


//     // await sequelize.transaction(async (transaction) => {
//     //   const createdCustomerDetails =
//     //     await CustomerController.CreateCustomerDetails(customerValue, {
//     //       transaction,
//     //     });
//     //   if (!createdCustomerDetails) {
//     //     // return res.status(400).json({ error: "Failed to Add Loan" });
//     //     throw createdCustomerDetails;
//     //   }
//     //   const customerId = createdCustomerDetails.customer_details_id;
//     //   const createdEmploymentDetails =
//     //     await EmploymentController.createEmploymentDocs(
//     //       parsedReqBody.EmploymentJsonData,
//     //       { transaction }
//     //     );
//     //   if (!createdEmploymentDetails) {
//     //     throw createdEmploymentDetails;
//     //     // return res.status(400).json({ error: "Failed to Add Loan" });
//     //   }
//     //   const employmentId = createdEmploymentDetails.employment_docu_id;
//     //   const createdVehicleDetails = await VehicleController.createVehicleDocs(
//     //     parsedReqBody.VehicleJsonData,
//     //     { transaction }
//     //   );
//     //   if (!createdVehicleDetails) {
//     //     throw createdVehicleDetails;
//     //     // return res.status(400).json({ error: "Failed to Add Loan" });
//     //   }
//     //   const vehicleId = createdVehicleDetails.vehicle_docu_id;
//     //   const createdLoanApplicants =
//     //     await LoanApplicationsController.createLoanApplication(
//     //       parsedReqBody.LoanApplicationJsonData,
//     //       customerId,
//     //       vehicleId,
//     //       employmentId,
//     //       { transaction }
//     //     );
//     //   if (!createdLoanApplicants) {
//     //     throw createdLoanApplicants;
//     //     // return res.status(400).json({ error: "Failed to Add Loan" });
//     //   }
//     //   return res.status(200).json({ success: "Added Loan!" });
//     // });
//     res.send(customerValue);
//   } catch (error) {
//     throw error
//     // return res.status(500).json({ error: "Internal server error" });
//   }

// });

ML_PUBLIC_ROUTER.post('/create-loan', LoanApplicationsController.AddLoan)
ML_PUBLIC_ROUTER.get("/ml-loans/tables", LoanApplicationsController.getAllLoanApplicants);

module.exports = ML_PUBLIC_ROUTER;
