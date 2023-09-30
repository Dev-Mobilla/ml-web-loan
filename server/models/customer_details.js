const { DataTypes } = require('sequelize');
const sequelize = require('../config/mlloan.server');

const customer_details = sequelize.define('customer_details', {
  customer_details_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  middle_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  birth_date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false
  },
  civil_status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  employer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nature_of_business: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tenure_length: {
    type: DataTypes.STRING,
    allowNull: true
  },
  office_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  office_landline: {
    type: DataTypes.STRING,
    allowNull: true
  },
  source_of_income: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  gross_monthly_income: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  current_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: false
});


module.exports = customer_details;


// class customer_details extends Model {
//   static associate(models) {
//     customer_details.hasMany(models.loan_applications, { foreignKey: 'customer_details_id' });
//   }
// }

// customer_details.init({
//   customer_details_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true
//   },
//   last_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   first_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   middle_name: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   birth_date: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   nationality: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   civil_status: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   employer: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   nature_of_business: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   tenure_length: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   office_address: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   office_landline: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   source_of_income: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   gross_monthly_income: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   current_address: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   mobile_number: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
// }, {
//   timestamps: false,
//   sequelize,
//   modelName: 'customer_details',
// });
