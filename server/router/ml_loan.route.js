const express = require("express");
const { getCookies } = require("../controller/getCookies.controller");
const GetThresholdAmount = require("../controller/ml_loans.controller");

const ML_LOAN_ROUTER = express.Router();

ML_LOAN_ROUTER.get("/api/get-cookie", getCookies);
ML_LOAN_ROUTER.get("/api/get-threshold-amount", GetThresholdAmount);

module.exports = ML_LOAN_ROUTER;