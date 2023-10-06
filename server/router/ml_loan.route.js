const express = require("express");
const { getCookies } = require("../controller/getCookies.controller");
const {
  getServiceFee,
  getThresholdAmount,
  validateAccountNumber,
  payNow,
} = require("../controller/ml_loans.controller");

const ML_LOAN_ROUTER = express.Router();

ML_LOAN_ROUTER.get("/api/get-cookie", getCookies);
ML_LOAN_ROUTER.get("/api/get-service-fee", getServiceFee);
ML_LOAN_ROUTER.get("/api/get-threshold-amount", getThresholdAmount);
ML_LOAN_ROUTER.post("/api/validate-account-number", validateAccountNumber);
ML_LOAN_ROUTER.post("/api/pay-now", payNow);

module.exports = ML_LOAN_ROUTER;
