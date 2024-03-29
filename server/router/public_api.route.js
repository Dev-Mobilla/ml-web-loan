const express = require("express");
const { GetAddressApi } = require("../controller/get_address.controller");
const { SearchKyc } = require("../controller/search_kyc.controller");
const {
  CreateCustomerDetailsToSymph,
} = require("../controller/customer_details.controller");
const {GetLoanTypeFields, GetLoanTypeItemsFields, GetOTPCode} = require("../controller/ml_loans.controller");
const {CalculateNetAmount} = require("../utils/DataUtils.utils");
const PUBLIC_ROUTER = express.Router();

PUBLIC_ROUTER.get("/get-countries", GetAddressApi);
PUBLIC_ROUTER.get("/get-provinces", GetAddressApi);
PUBLIC_ROUTER.get("/get-cities", GetAddressApi);

PUBLIC_ROUTER.get("/get-customers", SearchKyc);
PUBLIC_ROUTER.post("/basic-kyc", CreateCustomerDetailsToSymph);
PUBLIC_ROUTER.get("/get-loan-type-fields", GetLoanTypeFields);
PUBLIC_ROUTER.get("/get-loan-type-item-fields", GetLoanTypeItemsFields);
PUBLIC_ROUTER.post("/get-otp", GetOTPCode);
PUBLIC_ROUTER.get("/get-netamount", CalculateNetAmount);


module.exports = PUBLIC_ROUTER;
