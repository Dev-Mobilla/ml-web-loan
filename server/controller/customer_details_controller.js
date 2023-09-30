const customer_details = require('../models/associations');

async function createCustomerDetails(req, res) {
    try {
        const createdCustomer = await customer_details.create({
            customer_details_id: req.customer_details_id,
            last_name: req.last_name,
            first_name: req.first_name,
            middle_name: req.middle_name,
            birth_date: req.birth_date,
            nationality: req.nationality,
            civil_status: req.civil_status,
            employer: req.employer,
            nature_of_business: req.nature_of_business,
            tenure_length: req.tenure_length,
            office_address: req.office_address,
            office_landline: req.office_landline,
            source_of_income: req.source_of_income,
            gross_monthly_income: req.gross_monthly_income,
            current_address: req.current_address,
            mobile_number: req.mobile_number,
            email: req.email
        });
        return createdCustomer;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

module.exports = { createCustomerDetails };