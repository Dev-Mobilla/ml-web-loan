const { customer_details } = require('../models/associations');


async function createCustomerDetails(CustomerDetailsJsonData, options) {
    try {
        const customerID = CustomerDetailsJsonData.customer_details_id;
        const findCustomer = await customer_details.findByPk(customerID);
        let createdCustomer;
        if (findCustomer){
            createdCustomer = findCustomer;
        }
        else{
            const createNewCustomer = await customer_details.customeCreate(CustomerDetailsJsonData, options);
            createdCustomer = createNewCustomer;
        }

        console.log("Customer Details ",CustomerDetailsJsonData);
        return createdCustomer;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

module.exports = { createCustomerDetails };