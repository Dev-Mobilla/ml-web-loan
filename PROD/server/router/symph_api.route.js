const express = require("express");
const { RefundBillsPaymentApi, UpdateBillsPaymentApi, CheckKP7Transaction } = require("../controller/ml_loans.controller");
const {GetLoanTypeFields, GetLoanTypeItemsFields} = require("../controller/hatchit.controller");
const {

} = require('../controller/ml_loans.controller')

const SYMPH_API_ROUTER = express.Router();

SYMPH_API_ROUTER.get("/billspay-refund", RefundBillsPaymentApi);
SYMPH_API_ROUTER.post("/billspay-update", UpdateBillsPaymentApi);
SYMPH_API_ROUTER.post("/check-transaction", CheckKP7Transaction);
// SYMPH_API_ROUTER.get("/get-loan-type-fields", GetLoanTypeFields);
// SYMPH_API_ROUTER.get("/get-loan-type-item-fields", GetLoanTypeItemsFields);

module.exports = SYMPH_API_ROUTER;