const axios = require("axios");

const SuccessLogger = require("../utils/SuccessLogger");

const { GenerateToken } = require("../controller/symph.controller");

const API_BASE_URL = process.env.CKYC_API_URL;

const SearchKyc = async(req, res, next) => {

    try {
        const { firstName, lastName, birthdate, ckycId, cellphoneNumber, email } = req.query;

        const getToken = await GenerateToken();

        if (getToken.status === 201 && getToken.data.data.token) {

            let token = getToken.data.data.token;
            console.log("token", token);

            const url = `${API_BASE_URL}/api/v1/customers/exact-search`;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                // params:{
                //     firstName, lastName, birthdate, ckycId, cellphoneNumber, email
                // }
                params:{
                    firstName: "", lastName: "", birthdate: "", ckycId: "", cellphoneNumber:"09856346185", email: ""
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
