const axios = require("axios");

const SuccessLogger = require("../utils/SuccessLogger");

const { GenerateToken } = require("../controller/billspayment.controller");
const {loggerError} = require("../config/logger.config");

const API_BASE_URL = process.env.CKYC_API_URL;

const SearchKyc = async(req, res, next) => {

    try {
        const queryParams = req.query;

        const getToken = await GenerateToken();

        // if (getToken.status === 201 && getToken.data.data.token && cellphoneNumber) {
        if (getToken.status === 201 && getToken.data.data.token && {...queryParams}) {

            let token = getToken.data.data.token;

            const url = `${API_BASE_URL}/api/v1/customers/exact-search`;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                params:{...queryParams}

            };

            const response = await axios.get(url, config);
            // console.log("response", response);
            res.status(200).send(response.data);
            SuccessLogger(url, response.status, `GET Search KYC: ${JSON.stringify(response.data)}`);

        }
        else{
            loggerError.addContext('context', `REQUEST URL: ${req.url} | DATA: ${{...queryParams}}`);
            loggerError.error(`TOKEN: ${JSON.stringify(getToken.data)}`)
        }
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    SearchKyc
}
