const { vehicle_docs } = require('../models/associations');

async function createVehicleDocs(VehicleJsonData, options) {
    try {
        // const createdVehicle = await vehicle_docs.customeCreate(VehicleJsonData, options);
        const createdVehicle = await vehicle_docs.findOrCreate({
            where: {
                application_reference: VehicleJsonData.application_reference
            },
            defaults: { ...VehicleJsonData },
            transaction: options
        })
        return createdVehicle;

    } catch (error) {

        let message = {
            title: "Server Error",
            body: "Something went wrong in the server. Please try again later."
        }

        let err = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error);

        throw err;
    }
}

module.exports = { createVehicleDocs };