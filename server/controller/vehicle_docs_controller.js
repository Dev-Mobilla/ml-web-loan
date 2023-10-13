const { vehicle_docs } = require('../models/associations');

async function createVehicleDocs(VehicleJsonData, options) {
    try {
        const createdVehicle = await vehicle_docs.customeCreate(VehicleJsonData, options);
        return createdVehicle;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

module.exports = { createVehicleDocs };