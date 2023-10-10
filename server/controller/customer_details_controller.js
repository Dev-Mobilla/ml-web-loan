const { customer_details } = require('../models/associations');


async function createCustomerDetails(customerValue, options) {
    try {
        const createdCustomer = await customer_details.customCreate(customerValue, options);
        return createdCustomer;
    } catch (error) {
        return null;
    }
}

async function findCustomerDetails(last_name, first_name, middle_name, mobile_number) {
    const findByName = await customer_details.findOne({
        where: {
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            mobile_number: mobile_number
        },
        limit: 1,
    });

    if (findByName) {
        return findByName;
    } else {
        return null;
    }
}



module.exports = { findCustomerDetails, createCustomerDetails };