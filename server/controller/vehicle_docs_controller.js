const vehicle_docs = require('../models/associations');

async function createVehicleDocs(req, res) {
    try {
        const createdVehicle = await vehicle_docs.create({
            vehicle_docu_id: req.vehicle_docu_id,
            original_or: req.original_or,
            stencils: req.stencils,
            car_insurance: req.car_insurance,
            front_side: req.front_side,
            back_side: req.back_side,
            right_side: req.right_side,
            left_side: req.left_side,
            application_reference: req.application_reference,
        });
        return createdVehicle;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

module.exports = { createVehicleDocs };