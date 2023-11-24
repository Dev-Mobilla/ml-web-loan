const express = require("express");
const { getCookies } = require("../controller/getCookies.controller");
const {
  GetServiceFee,
  GetThresholdAmount,
  ValidateAccountNumber,
  PayNow,
} = require("../controller/billspayment.controller");
const { GetAddressApi } = require("../controller/get_address.controller");
const {CheckKP7Transaction} = require("../controller/ml_loans.controller");
const {GetAllApplication} = require("../controller/loan_application_controller");

const ML_LOAN_ROUTER = express.Router();

ML_LOAN_ROUTER.get("/get-cookie", getCookies);
ML_LOAN_ROUTER.get("/get-service-fee", GetServiceFee);
ML_LOAN_ROUTER.get("/get-threshold-amount", GetThresholdAmount);
ML_LOAN_ROUTER.post("/validate-account-number", ValidateAccountNumber);
ML_LOAN_ROUTER.post("/pay-now", PayNow);
ML_LOAN_ROUTER.post("/check-transaction", CheckKP7Transaction);

ML_LOAN_ROUTER.get("/get-countries", GetAddressApi);
ML_LOAN_ROUTER.get("/get-provinces", GetAddressApi);
ML_LOAN_ROUTER.get("/get-cities", GetAddressApi);
ML_LOAN_ROUTER.post('/get/all-applications', GetAllApplication);

module.exports = ML_LOAN_ROUTER;
