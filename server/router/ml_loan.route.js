const express = require("express");
const { getCookies } = require("../controller/getCookies.controller");
const {
  getServiceFee,
  getThresholdAmount,
  validateAccountNumber,
  payNow,
} = require("../controller/ml_loans.controller");

const ML_LOAN_ROUTER = express.Router();

ML_LOAN_ROUTER.get("/get-cookie", getCookies);
ML_LOAN_ROUTER.get("/get-service-fee", getServiceFee);
ML_LOAN_ROUTER.get("/get-threshold-amount", getThresholdAmount);
ML_LOAN_ROUTER.post("/validate-account-number", validateAccountNumber);
ML_LOAN_ROUTER.post("/pay-now", payNow);

module.exports = ML_LOAN_ROUTER;
