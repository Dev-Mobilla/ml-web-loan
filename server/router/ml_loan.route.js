const express = require("express");
const { getCookies } = require("../controller/getCookies.controller");
const GetThresholdAmount = require("../controller/ml_loans.controller");
const {GenerateTokenApi} = require("../controller/symph.controller");

const ML_LOAN_ROUTER = express.Router();

ML_LOAN_ROUTER.get("/get-cookie", getCookies);
ML_LOAN_ROUTER.get("/get-threshold-amount", GetThresholdAmount);
ML_LOAN_ROUTER.get("/get-token", GenerateTokenApi);

module.exports = ML_LOAN_ROUTER;