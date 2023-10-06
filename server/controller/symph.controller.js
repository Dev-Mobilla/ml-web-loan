const SignatureGenerator = require("../utils/signatureGenerator");
const axios = require("axios");

const RefundBillsPayment = async (req, res, next) => {

    const kptn = req.query.kptn;

    GenerateToken()
    .then(( response ) => {
        if (response.status === 201 && response.data.data.token) {
            return response.data.data.token;
        }else{
            throw response
        }
    })
    .then(async ( token ) => {
        if (kptn) {
            
            let URL = `${process.env.API_SYMPH_BASE_URL}/v1/api/1.0/billspay/refund/${kptn}`;

            let _xHashParam = {
                "kptn": kptn
            }
            
            let makeStringtify = JSON.stringify(_xHashParam);

            let passPhrase = makeStringtify + "|" + process.env.SYMPH_SECRET_KEY;

            let x_hash = SignatureGenerator(passPhrase);
    
            let headers = {
                Authorization: `Bearer ${token}`,
                "x-hash": x_hash,
            }

            const config = {
                headers
            }
    
            const refundApiResponse = await axios.post(URL, null, config);
            
            return refundApiResponse.data;
        }else{
            let err =  new Error(`No kptn provided`);
            err.status = 404;
            err.name = "RESOURCE_NOT_FOUND"

            throw err
        }
    })
    .then(resp => {
        console.log("dsfdg");
        res.send(resp)
    })
    .catch(error => {
        console.log("next catch");
        next(error)
    })
}

const GenerateToken = async () => {
    const dateInstance = new Date();
    
    const year = dateInstance.getFullYear().toString();
    const month = (("0" + (dateInstance.getMonth() + 1)).slice(-2)).toString();
    const day = ("0" + dateInstance.getDate()).slice(-2).toString();

    try {
        
        const date = year + "-" + month + "-" + day;
        const apikey = process.env.SYMPH_API_KEY;
        const secret = process.env.SYMPH_SECRET_KEY;

        const signature = `${apikey}|${secret}|${date}`;

        const digest = SignatureGenerator(signature);
        console.log("digest", digest);

        const URL = process.env.AUTH_SERVICE_SYMPH_URL;
        const reqBody = {
            "apiKey": process.env.SYMPH_API_KEY,
            "signature": digest
        }
        
        const response = await axios.post(URL, reqBody);

        return response;

    } catch (error) {
        return error
    }
}

module.exports = {
    RefundBillsPayment
}