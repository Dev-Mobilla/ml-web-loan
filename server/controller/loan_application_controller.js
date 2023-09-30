const { loan_applications, customer_details, employment_docs, vehicle_docs } = require('../models/associations');

async function createLoanApplication(LoanApplicationJsonData, customerId, vehicleId, employmentId) {
    try {
        const createdLoan = await loan_application.create({
            id_loan_application: LoanApplicationJsonData.id_loan_application,
            application_reference: LoanApplicationJsonData.application_reference,
            approved_reference: LoanApplicationJsonData.approved_reference,
            application_date: LoanApplicationJsonData.application_date,
            vehicle_type: LoanApplicationJsonData.vehicle_type,
            loan_type: LoanApplicationJsonData.loan_type,
            year: LoanApplicationJsonData.year,
            make: LoanApplicationJsonData.make,
            model: LoanApplicationJsonData.model,
            color: LoanApplicationJsonData.color,
            variant: LoanApplicationJsonData.variant,
            plate_number: LoanApplicationJsonData.plate_number,
            engine_number: LoanApplicationJsonData.engine_number,
            chassis_number: LoanApplicationJsonData.chassis_number,
            employment_type: LoanApplicationJsonData.employment_type,
            preferred_branch: LoanApplicationJsonData.preferred_branch,
            branch_approver_id: LoanApplicationJsonData.branch_approver_id,
            delete_date: LoanApplicationJsonData.delete_date,
            update_date: LoanApplicationJsonData.update_date,
            customer_details_customer_details_id: customerId,
            vehicle_docs_vehicle_docu_id: vehicleId,
            employment_docs_employment_docu_id: employmentId
        });
        return createdLoan;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

async function createLoanApplication(LoanApplicationJsonData, customerId, vehicleId, employmentId) {
    try {
        const createdLoan = await loan_application.create({
            // Loan application properties...
        });
        return createdLoan;
    } catch (error) {
        console.error('Error creating loan application:', error);
        return null;
    }
}

async function getAllLoanApplicants(req, res) {
    try {
        console.log('Models synchronized with the database.');

        // Fetch loan applications with associated columns
        const loanApplications = await loan_applications.findAll({
            include: [
                { model: customer_details, attributes: ['customer_details_id'], as: 'customer_details' },
                { model: employment_docs, attributes: ['employment_docu_id'], as: 'employment_docs' },
                { model: vehicle_docs, attributes: ['vehicle_docu_id'], as: 'vehicle_docs' },
            ],
        });
        // Extract the customer_details_id, employment_docs_id, and vehicle_docs_id values
        const customerDetailsIds = loanApplications.map((loanApp) => loanApp.customer_details_customer_details_id);
        const employmentDocsIds = loanApplications.map((loanApp) => loanApp.employment_docs_employment_docu_id);
        const vehicleDocsIds = loanApplications.map((loanApp) => loanApp.vehicle_docs_vehicle_docu_id);

        const customerDetails = await customer_details.findAll({
            where: {
                customer_details_id: customerDetailsIds,
            },
        });
        const employmentDocs = await employment_docs.findAll({
            where: {
                employment_docu_id: employmentDocsIds,
            },
        });
        const vehicleDocs = await vehicle_docs.findAll({
            where: {
                vehicle_docu_id: vehicleDocsIds,
            },
        });

        const customerDetailsMap = {};
        customerDetails.forEach((customer) => {
            const customerId = customer.customer_details_id;
            customerDetailsMap[customerId] = { customer_details: customer };
        });

        const employmentDocsMap = {};
        employmentDocs.forEach((doc) => {
            const docId = doc.employment_docu_id;
            employmentDocsMap[docId] = { employment_docs: doc };
        });

        const vehicleDocsMap = {};
        vehicleDocs.forEach((doc) => {
            const docId = doc.vehicle_docu_id;
            vehicleDocsMap[docId] = { vehicle_docs: doc };
        });

        // Combine the loan application data with associated customer_details, employment_docs, and vehicle_docs
        const loanApplicationsWithAssociatedData = loanApplications.map((loanApp) => ({
            ...loanApp.toJSON(),
            ...customerDetailsMap[loanApp.customer_details_customer_details_id],
            ...employmentDocsMap[loanApp.employment_docs_employment_docu_id],
            ...vehicleDocsMap[loanApp.vehicle_docs_vehicle_docu_id],
        }));
        res.send(loanApplicationsWithAssociatedData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
}

module.exports = { createLoanApplication, getAllLoanApplicants };