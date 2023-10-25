const loan_applications = require("./loan_application");
const CustomerDetails = require("./customer_details");
const employment_docs = require("./employment_docs");
const vehicle_docs = require("./vehicle_docs");
const sequelize = require("../config/mlloan.server");

CustomerDetails.hasMany(loan_applications, {
  foreignKey: "customer_details_id",
  // foreignKey: "customer_details_customer_details_id",
  // as: "loan_applications",
});

loan_applications.belongsTo(CustomerDetails, {
  foreignKey: "customer_details_id",
  // foreignKey: "customer_details_customer_details_id",
  // as: "customer_details",
});

loan_applications.hasOne(employment_docs, {
  // as: "employment_docs",
  foreignKey: "employment_docu_id",
});
employment_docs.belongsTo(loan_applications, {
  // as: "loan_applications",
  foreignKey: "employment_docu_id",
});
loan_applications.hasOne(vehicle_docs, {
  // as: "vehicle_docs",
  foreignKey: "vehicle_docu_id",
});
vehicle_docs.belongsTo(loan_applications, {
  // as: "loan_applications",
  foreignKey: "vehicle_docu_id",
});

module.exports = {
  loan_applications,
  CustomerDetails,
  employment_docs,
  vehicle_docs,
  sequelize,
};
