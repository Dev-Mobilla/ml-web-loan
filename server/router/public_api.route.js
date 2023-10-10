const express = require("express");
const {GetAddressApi} = require("../controller/get_address.controller");

const PUBLIC_ROUTER = express.Router();

PUBLIC_ROUTER.get("/get-countries", GetAddressApi);
PUBLIC_ROUTER.get("/get-provinces", GetAddressApi);
PUBLIC_ROUTER.get("/get-cities", GetAddressApi);

module.exports = PUBLIC_ROUTER;
