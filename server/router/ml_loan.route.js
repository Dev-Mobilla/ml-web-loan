const express = require("express");
const { getCookies } = require("../controller/getCookies.controller");

const ML_LOAN_ROUTER = express.Router();

ML_LOAN_ROUTER.get("/api/get-cookie", getCookies);

module.exports = ML_LOAN_ROUTER;