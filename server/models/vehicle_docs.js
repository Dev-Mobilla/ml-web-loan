const { DataTypes } = require('sequelize');
const sequelize = require('../config/mlloan.server');

const vehicle_docs = sequelize.define('vehicle_docs', {
    vehicle_docu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
    }
}, {
    timestamps: false
});

vehicle_docs.customeCreate = async function (data, options) {
    return this.create(data, options);
};

module.exports = vehicle_docs;

// class vehicle_docs extends Model {
//     static associate(models) {
//         vehicle_docs.hasOne(models.loan_applications, { foreignKey: 'vehicle_docu_id' });
//     }
// }
// vehicle_docs.init({
//     vehicle_docu_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },
//     original_or: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     stencils: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     car_insurance: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     front_side: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     back_side: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     right_side: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     left_side: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     application_reference: {
//         type: DataTypes.STRING,
//         allowNull: true
//     }
// }, {
//     timestamps: false,
//     sequelize,
//     modelName: 'vehicle_docs',
// });

// vehicle_docs.hasOne(loan_applications);

