const axios = require("axios");

const SuccessLogger = require("../utils/SuccessLogger");

const { GenerateToken } = require("../controller/billspayment.controller");

const API_BASE_URL = process.env.CKYC_API_URL;

const SearchKyc = async(req, res, next) => {

    try {
        const { cellphoneNumber } = req.query;

        const getToken = await GenerateToken();

        if (getToken.status === 201 && getToken.data.data.token && cellphoneNumber) {

            let token = getToken.data.data.token;

            const url = `${API_BASE_URL}/api/v1/customers/exact-search`;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                params:{
                    cellphoneNumber
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
    SearchKyc
}
