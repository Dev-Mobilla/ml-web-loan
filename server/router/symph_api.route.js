const express = require("express");
const { RefundBillsPaymentApi, UpdateBillsPaymentApi } = require("../controller/ml_loans.controller");

const SYMPH_API_ROUTER = express.Router();

SYMPH_API_ROUTER.get("/billspay-refund", RefundBillsPaymentApi);
SYMPH_API_ROUTER.post("/billspay-update", UpdateBillsPaymentApi);

module.exports = SYMPH_API_ROUTER;