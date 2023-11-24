const loan_applications = require("./loan_application");
const CustomerDetails = require("./customer_details");
const employment_docs = require("./employment_docs");
const LoanDocs = require("./loan_docs");
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
loan_applications.hasOne(LoanDocs, {
  // as: "vehicle_docs",
  foreignKey: "loan_docu_id",
});
LoanDocs.belongsTo(loan_applications, {
  // as: "loan_applications",
  foreignKey: "loan_docu_id",
});

module.exports = {
  loan_applications,
  CustomerDetails,
  employment_docs,
  LoanDocs,
  sequelize,
};
