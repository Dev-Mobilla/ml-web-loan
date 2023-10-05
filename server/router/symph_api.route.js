const express = require("express");
const {RefundBillsPayment} = require("../controller/symph.controller");

const SYMPH_API_ROUTER = express.Router();

SYMPH_API_ROUTER.post("/billspay-refund", RefundBillsPayment);

module.exports = SYMPH_API_ROUTER;