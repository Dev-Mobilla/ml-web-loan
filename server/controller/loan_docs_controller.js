const { LoanDocs } = require('../models/associations');
const {ErrorThrower} = require('../utils/ErrorGenerator');

async function createLoanDocs(LoanDocsJson, options) {
    try {
        // const createdVehicle = await loan_docs.customeCreate(VehicleJsonData, options);
        const createdLoanDoc = await LoanDocs.findOrCreate({
            where: {
                application_reference: LoanDocsJson.application_reference
            },
            defaults: { ...LoanDocsJson },
            transaction: options
        })
        return createdLoanDoc;

    } catch (error) {

        let message = {
            title: "Server Error",
            body: "Something went wrong in the server. Please try again later."
        }

        let err = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error, JSON.stringify(LoanDocsJson));

        throw err;
    }
}

module.exports = { createLoanDocs };