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
    const transaction = await sequelize.transaction();
    const { LoanApplicationJsonData, CustomerDetailsJsonData, EmploymentJsonData, VehicleJsonData } = req.body;
    try {
        const createdCustomerDetails = await CustomerController.createCustomerDetails(CustomerDetailsJsonData, { transaction });
        if (!createdCustomerDetails) {
            return res.json({ error: 'Failed to create customer details' });
        }
        const customerId = createdCustomerDetails.customer_details_id;
        const createdEmploymentDetails = await EmploymentController.createEmploymentDocs(EmploymentJsonData, { transaction });
        if (!createdEmploymentDetails) {
            return res.json({ error: 'Failed to create employment details' });
        }
        const employmentId = createdEmploymentDetails.employment_docu_id;
        const createdVehicleDetails = await VehicleController.createVehicleDocs(VehicleJsonData, { transaction });
        if (!createdVehicleDetails) {
            return res.json({ error: 'Failed to create vehicle details' });
        }
        const vehicleId = createdVehicleDetails.vehicle_docu_id;
        console.log("Vehicle ID: ", vehicleId);
        const createdLoanApplicants = await LoanApplicationsController.createLoanApplication(LoanApplicationJsonData, customerId, vehicleId, employmentId, { transaction });
        if (!createdLoanApplicants) {
            return res.json({ error: 'Failed to create loan applicants' });
        }
        await transaction.commit();
        res.json({ message: 'Entities created successfully' });
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        res.json({ error: 'Internal server error' });
    }
});

router.get('/ml-loans/tables', LoanApplicationsController.getAllLoanApplicants);

module.exports = router;

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });