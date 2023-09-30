const {employment_docs} = require('../models/associations');

async function createEmploymentDocs(EmploymentJsonData, options) {
    try {
        const createdEmployment = await employment_docs.customeCreate(EmploymentJsonData , options);
        return createdEmployment;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

module.exports = { createEmploymentDocs };