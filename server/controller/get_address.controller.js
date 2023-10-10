const { ErrorThrower } = require("../utils/ErrorGenerator");
const SuccessLogger = require("../utils/SuccessLogger");
const SignatureGenerator = require("../utils/signatureGenerator");
const axios = require("axios");
const {GenerateToken} = require("./symph.controller");

const API_BASE_URL = process.env.CKYC_API_URL;

// "CkycApiKey": "g9RiT3xeC945",

const GetAddressApi = async (req, res, next) => {
    try {

        console.log("REQUEST", req);

        const apiName = req.query.name;
        console.log(apiName);

        const getToken = await GenerateToken();

        if (getToken.status === 201 && getToken.data.data.token) {

            let token = getToken.data.data.token;
            console.log("token", token);

            const url = `${API_BASE_URL}/api/v1/addresses/${apiName}`;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }

            };

            const response = await axios.get(url, config);
            // console.log("response", response);
            res.status(200).send(response.data);
            SuccessLogger(response.url, response.status, `GET ${apiName.toUpperCase()}: ${JSON.stringify(response.data)}`);

        }
        else{
            throw getToken;
        }
    } catch (error) {
        next(error);
    }
} 

module.exports = {
    GetAddressApi
}