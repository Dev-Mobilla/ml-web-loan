const {default: axios} = require("axios");
const SignatureGenerator = require("../utils/signatureGenerator");
const SuccessLogger = require("../utils/SuccessLogger");

const HATCH_IT_URL = process.env.HATCHT_IT_BASE_URL;
const APPLY_LOAN_KEY = "JGE822RTe@!JT$FKCf";
const HATCHT_IT_GET_LOAN_FIELDS_KEY = process.env.GET_LOAN_FIELDS;

const QD_GET_LOAN_FIELDS_KEY = process.env.QD_GET_LOAN_FIELDS;
const QD_APPLY_LOAN__KEY = "4H21&IU&%zR4kgJ4*9c";

const LOAN_TYPE = process.env.HATCH_IT_LOAN_TYPE;

const GetLoanTypeFields = async () => {
    try {
        const loantype = JSON.stringify({loan_type: LOAN_TYPE})

        const passPhrase = `${loantype}|${HATCHT_IT_GET_LOAN_FIELDS_KEY}|${QD_GET_LOAN_FIELDS_KEY}`;

        const digest = SignatureGenerator(passPhrase);

        const config = {
           params:{
            loan_type: LOAN_TYPE,
            digest: digest
           }
        }
        
        const URL = `${HATCH_IT_URL}/loans_api/v1/loan_type_fields/get/loan_type`;
        
        const getLoanTypeFields = await GetLoanTypeFieldsApi(URL, config);

        return getLoanTypeFields.data;
    } catch (error) {
        throw error;
    }
}

const GetLoanTypeFieldsApi = async (URL, config) => {
    try {

        const response = await axios.get(URL, config);
        // console.log("response", response);
        return response;
    } catch (error) {
        throw error
    }
}

const GetLoanTypeItemsFields = async () => {
    try {
        const loantype = JSON.stringify({loan_type: LOAN_TYPE})

        const passPhrase = `${loantype}|${HATCHT_IT_GET_LOAN_FIELDS_KEY}|${QD_GET_LOAN_FIELDS_KEY}`;

        const digest = SignatureGenerator(passPhrase);
        
        const config = {
           params:{
            loan_type: LOAN_TYPE,
            digest: digest
           }
        }
        
        const URL = `${HATCH_IT_URL}/loans_api/v1/loan_type_item_fields/get/loan_type`;
        
        const getLoanTypeItemFields = await GetLoanTypeItemFieldsApi(URL, config);

        return getLoanTypeItemFields.data;
    } catch (error) {
        throw error;
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

const HatchITAddLoan = async (customerDetails, collateral, fieldValues, fieldItemValues) => {
    try {
        const loantype = JSON.stringify({loan_type: LOAN_TYPE})

        const passPhrase = `${loantype}|${APPLY_LOAN_KEY}|${QD_APPLY_LOAN__KEY}`;

        const digest = SignatureGenerator(passPhrase);

        const config = {
            params:{
                loan_type: LOAN_TYPE,
                digest: digest
            }
        }

        const data = {
            ...collateral,
            customerDetails,
            loan_type_field_values: fieldValues,
            loan_type_item_field_values: [
                {
                    snapshot: fieldItemValues
                }
            ]
        }

        const URL = `${HATCH_IT_URL}/loans_api/v1/transactions/apply_loan`;

        const addLoan = await AddLoanApi(URL, data, config);

        SuccessLogger(URL, 200,`ADD LOAN: ${JSON.stringify(addLoan.data.data)}, 
        REFERENCE: ${addLoan.data.data.ref_num}, 
        STATUS: ${addLoan.data.success}` )
        return addLoan.data;
        
    } catch (error) {
        throw error;
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
    GetLoanTypeItemsFields,
    HatchITAddLoan
}