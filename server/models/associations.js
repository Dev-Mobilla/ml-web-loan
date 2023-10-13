const loan_applications = require("./loan_application");
const customer_details = require("./customer_details");
const employment_docs = require("./employment_docs");
const vehicle_docs = require("./vehicle_docs");
const sequelize = require("../config/mlloan.server");

customer_details.hasMany(loan_applications, {
  foreignKey: "customer_details_customer_details_id",
  as: "loan_applications",
});

loan_applications.belongsTo(customer_details, {
  foreignKey: "customer_details_customer_details_id",
  as: "customer_details",
});

loan_applications.hasOne(employment_docs, {
  as: "employment_docs",
  foreignKey: "employment_docu_id",
});
employment_docs.belongsTo(loan_applications, {
  as: "loan_applications",
  foreignKey: "employment_docu_id",
});
loan_applications.hasOne(vehicle_docs, {
  as: "vehicle_docs",
  foreignKey: "vehicle_docu_id",
});
vehicle_docs.belongsTo(loan_applications, {
  as: "loan_applications",
  foreignKey: "vehicle_docu_id",
});

module.exports = {
  loan_applications,
  customer_details,
  employment_docs,
  vehicle_docs,
  sequelize,
};
