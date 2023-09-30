const {  DataTypes } = require('sequelize');
const sequelize = require('../config/mlloan.server');

const loan_applications = sequelize.define('loan_applications', {
    id_loan_application: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    application_reference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    approved_reference: {
        type: DataTypes.STRING,
        allowNull: true
    },
    application_date: {
        type: DataTypes.DATE,
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
    chassis_number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    employment_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    preferred_branch: {
        type: DataTypes.STRING,
        allowNull: true
    },
    branch_approver_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    delete_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    update_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    customer_details_customer_details_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    vehicle_docs_vehicle_docu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    employment_docs_employment_docu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
}, {
    timestamps: false
});

module.exports = loan_applications;

// class loan_applications extends Model {
//     static associate(models) {
//         loan_applications.belongsTo(models.customer_details, { foreignKey: 'customer_details_id' });
//         loan_applications.belongsTo(models.vehicle_docs, { foreignKey: 'vehicle_docs_vehicle_docu_id' });
//         loan_applications.belongsTo(models.employment_docs, { foreignKey: 'employment_docs_employment_docu_id' });
//     }
// }

// loan_applications.init({
//     id_loan_application: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },
//     application_reference: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     approved_reference: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     application_date: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     vehicle_type: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },

//     loan_type: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     year: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     make: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     model: {
//         type: DataTypes.INTEGER,
//         allowNull: true
//     },
//     color: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     variant: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     plate_number: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     chassis_number: {
//         type: DataTypes.INTEGER,
//         allowNull: true
//     },
//     employment_type: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     preferred_branch: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     branch_approver_id: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     delete_date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     update_date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     customer_details_customer_details_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//     },
//     vehicle_docs_vehicle_docu_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },
//     employment_docs_employment_docu_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },
// }, {
//     timestamps: false,
//     sequelize,
//     modelName: 'loan_applications',
// });

