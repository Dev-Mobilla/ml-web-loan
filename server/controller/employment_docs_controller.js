const employment_docs = require('../models/associations');

async function createEmploymentDocs(req, res) {
    try {
        const createdEmployment = await employment_docs.create({
            employment_docu_id: req.employment_docu_id,
            valid_id: req.valid_id,
            employee_cert: req.employee_cert,
            payslip: req.payslip,
            mayor_cert: req.mayor_cert,
            bank_cert: req.bank_cert,
            application_reference: req.application_reference,
        });
        return createdEmployment;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

module.exports = { createEmploymentDocs };