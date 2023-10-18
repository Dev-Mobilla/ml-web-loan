const { DataTypes } = require('sequelize');
const sequelize = require('../config/mlloan.server');

const vehicle_docs = sequelize.define('vehicle_docs', {
    vehicle_docu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true
    },
    original_or: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stencils: {
        type: DataTypes.STRING,
        allowNull: true
    },
    car_insurance: {
        type: DataTypes.STRING,
        allowNull: true
    },
    front_side: {
        type: DataTypes.STRING,
        allowNull: true
    },
    back_side: {
        type: DataTypes.STRING,
        allowNull: true
    },
    right_side: {
        type: DataTypes.STRING,
        allowNull: true
    },
    left_side: {
        type: DataTypes.STRING,
        allowNull: true
    },
    application_reference: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true
});

vehicle_docs.customeCreate = async function (data, options) {
    return this.create(data, options);
};

module.exports = vehicle_docs;

