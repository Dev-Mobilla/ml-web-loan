const { DataTypes } = require('sequelize');
const sequelize = require('../config/mlloan.server');

const loan_applications = sequelize.define('loan_applications', {
    id_loan_application: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        // autoIncrement: true,
    },
    application_reference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    approved_reference: {
        type: DataTypes.STRING,
        allowNull: true
    },
    application_loan_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    application_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    principal_amount: {
        type: DataTypes.STRING,
        allowNull: true
    },
    terms: {
        type: DataTypes.STRING,
        allowNull: true
    },
    interest: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vehicle_type: {
        type: DataTypes.STRING,
        allowNull: true
    },

    loan_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    year: {
        type: DataTypes.STRING,
        allowNull: true
    },
    make: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    variant: {
        type: DataTypes.STRING,
        allowNull: true
    },
    plate_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    engine_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    chassis_number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    residence_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stay_length:  {
        type: DataTypes.STRING,
        allowNull: true
    },
    preferred_branch: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customer_details_id: {
        // customer_details_customer_details_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    loan_docu_id: {
        // vehicle_docs_vehicle_docu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    employment_docu_id: {
        // employment_docs_employment_docu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    update_date: {
        type: DataTypes.DATE,
    },
    delete_date: {
        type: DataTypes.DATE,
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'update_date',
    deletedAt: 'delete_date'
});

loan_applications.customeCreate = async function (data, customerID, vehicleId, employmentId, options) {
    return this.create({
        id_loan_application: data.id_loan_application,
        application_reference: data.application_reference,
        approved_reference: data.approved_reference,
        application_date: data.application_date,
        vehicle_type: data.vehicle_type,
        loan_type: data.loan_type,
        year: data.year,
        make: data.make,
        model: data.model,
        color: data.color,
        variant: data.variant,
        plate_number: data.plate_number,
        engine_number: data.engine_number,
        chassis_number: data.chassis_number,
        preferred_branch: data.preferred_branch,
        branch_approver_id: data.branch_approver_id,
        customer_details_customer_details_id: customerID,
        vehicle_docs_vehicle_docu_id: vehicleId,
        employment_docs_employment_docu_id: employmentId
    }, options);
};

module.exports = loan_applications;
