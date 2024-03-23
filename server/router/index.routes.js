const SYMPH_API_ROUTER = require("./symph_api.route");
const ML_LOAN_ROUTER = require("./ml_loan.route");
const PUBLIC_ROUTER = require("./public_api.route");
const ML_PUBLIC_ROUTER = require('./add_loan_route');

module.exports = {
    SYMPH_API_ROUTER,
    ML_LOAN_ROUTER,
    PUBLIC_ROUTER,
    ML_PUBLIC_ROUTER,
}