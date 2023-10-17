const {employment_docs} = require('../models/associations');
const {ErrorThrower} = require('../utils/ErrorGenerator');

async function createEmploymentDocs(EmploymentJsonData, options) {
    try {
        // const createdEmployment = await employment_docs.customeCreate(EmploymentJsonData , options);
        const createdEmployment = await employment_docs.findOrCreate({
            where: {
                application_reference: EmploymentJsonData.application_reference 
            },
            defaults: { ...EmploymentJsonData },
            transaction: options
        });
        
        return createdEmployment;
        
    } catch (error) {
        console.log("employment", error);
        
        let message = {
            title: "Server Error",
            body: "Something went wrong in the server. Please try again later."
        }

        let err = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error);

        throw err;
    }
}

module.exports = { createEmploymentDocs };