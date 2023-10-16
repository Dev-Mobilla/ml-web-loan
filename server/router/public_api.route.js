const express = require("express");
const { GetAddressApi } = require("../controller/get_address.controller");
const { SearchKyc } = require("../controller/search_kyc.controller");
const {
  CreateCustomerDetailsToSymph,
} = require("../controller/customer_details.controller");
const PUBLIC_ROUTER = express.Router();

PUBLIC_ROUTER.get("/get-countries", GetAddressApi);
PUBLIC_ROUTER.get("/get-provinces", GetAddressApi);
PUBLIC_ROUTER.get("/get-cities", GetAddressApi);

PUBLIC_ROUTER.get("/get-customers", SearchKyc);
PUBLIC_ROUTER.post("/basic-kyc", CreateCustomerDetailsToSymph);


module.exports = PUBLIC_ROUTER;
