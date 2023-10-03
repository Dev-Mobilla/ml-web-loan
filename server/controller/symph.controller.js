const RefundBillsPayment = async () => {
    try {
        console.log(process.env.API_SYMPH_BASE_URL);
        console.log(process.env.SYMPH_API_KEY);
        console.log(process.env.SYMPH_SECRET_KEY);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    RefundBillsPayment
}