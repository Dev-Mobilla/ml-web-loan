const express = require('express');
const router = express.Router();
const LoanApplicationsController = require('../controller/loan_application_controller');
const CustomerController = require('../controller/customer_details_controller');
const EmploymentController = require('../controller/employment_docs_controller');
const VehicleController = require('../controller/vehicle_docs_controller');
const sequelize = require('../config/mlloan.server');

const app = express();

app.use(express.json());
app.use(router);


router.post('/ml-loans/create', async (req, res) => {
  const reqBody = req.body.body;
  const parsedReqBody = JSON.parse(reqBody);
  try {
    let customerValue;
    const { last_name, first_name, middle_name, mobile_number } = parsedReqBody.CustomerDetailsJsonData;
    const findCustomerDetails = await CustomerController.findCustomerDetails(last_name, first_name, middle_name, mobile_number);

    if (findCustomerDetails) {
      customerValue = findCustomerDetails;
    } else {
      customerValue = parsedReqBody.CustomerDetailsJsonData;
    }
    await sequelize.transaction(async (transaction) => {
      const createdCustomerDetails = await CustomerController.createCustomerDetails(customerValue, { transaction });
      if (!createdCustomerDetails) {
        return res.status(400).json({ error: 'Failed to Add Loan' });
      }
      const customerId = createdCustomerDetails.customer_details_id;
      const createdEmploymentDetails = await EmploymentController.createEmploymentDocs(parsedReqBody.EmploymentJsonData, { transaction });
      if (!createdEmploymentDetails) {
        return res.status(400).json({ error: 'Failed to Add Loan' });
      }
      const employmentId = createdEmploymentDetails.employment_docu_id;
      const createdVehicleDetails = await VehicleController.createVehicleDocs(parsedReqBody.VehicleJsonData, { transaction });
      if (!createdVehicleDetails) {
        return res.status(400).json({ error: 'Failed to Add Loan' });
      }
      const vehicleId = createdVehicleDetails.vehicle_docu_id;
      const createdLoanApplicants = await LoanApplicationsController.createLoanApplication(parsedReqBody.LoanApplicationJsonData, customerId, vehicleId, employmentId, { transaction });
      if (!createdLoanApplicants) {
        return res.status(400).json({ error: 'Failed to Add Loan' });
      }
      return res.status(200).json({ success: 'Added Loan!' });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/ml-loans/tables', LoanApplicationsController.getAllLoanApplicants);

module.exports = router;
