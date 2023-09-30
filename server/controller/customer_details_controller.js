const { customer_details } = require('../models/associations');


async function createCustomerDetails(CustomerDetailsJsonData, options) {
    try {
        console.log("Customer Details ",CustomerDetailsJsonData);
        const createdCustomer = await customer_details.customeCreate(CustomerDetailsJsonData, options);
        return createdCustomer;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

module.exports = { createCustomerDetails };