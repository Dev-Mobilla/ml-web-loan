const express = require("express");
const { getCookies } = require("../controller/getCookies.controller");

const ROUTER = express.Router();

ROUTER.get("/api/get-cookie", getCookies);

module.exports = ROUTER;