const { DataTypes } = require('sequelize');
const sequelize = require('../config/mlloan.server');

const customer_details = sequelize.define('customer_details', {
  customer_details_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
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
  timestamps: true
});

customer_details.customCreate = async function (data, options) {
  try {
    const createdData = await this.create({
      'last_name': data.last_name,
      'first_name': data.first_name,
      'middle_name': data.middle_name,
      'birth_date': data.birth_date,
      'nationality': data.nationality,
      'civil_status': data.civil_status,
      'employer': data.employer,
      'nature_of_business': data.nature_of_business,
      'tenure_length': data.tenure_length,
      'office_address': data.office_address,
      'office_landline': data.office_landline,
      'source_of_income': data.source_of_income,
      'gross_monthly_income': data.gross_monthly_income,
      'current_address': data.current_address,
      'mobile_number': data.mobile_number,
      'email': data.email
    }, options);
    return createdData;
  } catch (error) {
    throw new Error("Failed to create customer details");
  }
};

module.exports = customer_details;