const {default: axios} = require("axios");
const SignatureGenerator = require("../utils/signatureGenerator");

const HATCH_IT_URL = process.env.HATCHT_IT_BASE_URL;
const APPLY_LOAN_KEY = process.env.APPLY_LOAN_KEY;
const HATCHT_IT_GET_LOAN_FIELDS_KEY = process.env.GET_LOAN_FIELDS;

const QD_GET_LOAN_FIELDS_KEY = process.env.QD_GET_LOAN_FIELDS;
const QD_APPLY_LOAN__KEY = process.env.QD_APPLY_LOAN_KEY;


const GetLoanTypeFields = async (req, res, next) => {
    try {
        const loantype = JSON.stringify({loan_type: "1"})

        const passPhrase = `${loantype}|${HATCHT_IT_GET_LOAN_FIELDS_KEY}|${QD_GET_LOAN_FIELDS_KEY}`;

        const digest = SignatureGenerator(passPhrase);
        
        console.log(digest);
        const config = {
           params:{
            loan_type: "1",
            digest: digest
           }
        }
        
        const URL = `${HATCH_IT_URL}/loans_api/v1/loan_type_fields/get/loan_type`;
        
        const getLoanTypeFields = await GetLoanTypeFieldsApi(URL, config);

        res.send(getLoanTypeFields.data);
    } catch (error) {
        console.log("error");
        next(error);
    }
}

const GetLoanTypeFieldsApi = async (URL, config) => {
    try {

        const response = await axios.get(URL, config);
        console.log("response", response);
        return response;
    } catch (error) {
        throw error
    }
}

const GetLoanTypeItemsFields = async (req, res, next) => {
    try {
        const loantype = JSON.stringify({loan_type: "1"})

        const passPhrase = `${loantype}|${HATCHT_IT_GET_LOAN_FIELDS_KEY}|${QD_GET_LOAN_FIELDS_KEY}`;

        const digest = SignatureGenerator(passPhrase);
        
        const config = {
           params:{
            loan_type: "1",
            digest: digest
           }
        }
        
        const URL = `${HATCH_IT_URL}/loans_api/v1/loan_type_item_fields/get/loan_type`;
        
        const getLoanTypeItemFields = await GetLoanTypeItemFieldsApi(URL, config);

        res.send(getLoanTypeItemFields.data);
    } catch (error) {
        next(error);
    }
}

const GetLoanTypeItemFieldsApi = async (URL, config) => {
    try {

        const response = await axios.get(URL, config);
        return response;

    } catch (error) {
        throw error
    }
}

const AddLoan = async (req, res, next) => {
    try {
        const loantype = JSON.stringify({loan_type: "1"})

        const passPhrase = `${loantype}|${APPLY_LOAN_KEY}|${QD_APPLY_LOAN__KEY}`;

        const digest = SignatureGenerator(passPhrase);

        const config = {
            params:{
                loan_type: "1",
                digest: digest
            }
        }

        // const data = {

        // }
         
        const URL = `${HATCH_IT_URL}/loans_api/v1/transactions/apply_loan`;

        const addLoan = await AddLoanApi(URL, data, config);
        
    } catch (error) {
        next(error)
    }
}

const AddLoanApi = async (URL, data, config) => {
    try {

        const response = await axios.post(URL, data, config);

        return response;
        
    } catch (error) {
        throw error
    }
}

module.exports = {
    GetLoanTypeFields,
    GetLoanTypeItemsFields
}