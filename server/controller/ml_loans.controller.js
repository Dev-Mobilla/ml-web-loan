const {default: axios} = require("axios");

const GetThresholdAmount = async (req,res) => {
    console.log(req.headers.cookie);
        let URL = `${process.env.API_SYMPH_BASE_URL}/v1/api/1.0/ml-loans/threshold-amount`;

        const config = {
            headers: {
                Cookie: req.headers.cookie
            }
        }

        const thresholdAmountApi = await axios.get(URL, config);

        res.send(thresholdAmountApi.data);
}

module.exports = GetThresholdAmount;