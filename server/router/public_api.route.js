const express = require("express");
const {GetAddressApi} = require("../controller/get_address.controller");
const { SearchKyc } = require("../controller/search_kyc.controller");

const PUBLIC_ROUTER = express.Router();

PUBLIC_ROUTER.get("/get-countries", GetAddressApi);
PUBLIC_ROUTER.get("/get-provinces", GetAddressApi);
PUBLIC_ROUTER.get("/get-cities", GetAddressApi);

PUBLIC_ROUTER.get("/get-customers", SearchKyc);

module.exports = PUBLIC_ROUTER;
