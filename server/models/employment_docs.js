const { DataTypes } = require('sequelize');
const sequelize = require('../config/mlloan.server');

const employment_docs = sequelize.define('employment_docs', {
    employment_docu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    valid_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    employee_cert: {
        type: DataTypes.STRING,
        allowNull: true
    },
    payslip: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mayor_cert: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bank_cert: {
        type: DataTypes.STRING,
        allowNull: true
    },
    application_reference: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

// employment_docs.customeCreate = async function (data, options) {
//     return this.create(data, options);
// };
module.exports = employment_docs;

// class employment_docs extends Model {
//     static associate(models) {
//         employment_docs.hasOne(models.loan_applications, { foreignKey: 'employment_docu_id' });
//     }
// }
// employment_docs.init({
//     employment_docu_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },
//     valid_id: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     employee_cert: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     payslip: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     mayor_cert: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     bank_cert: {
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
//     modelName: 'employment_docs',
// });

// employment_docs.hasOne(loan_applications);
// module.exports = employment_docs;

