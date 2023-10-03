const RefundBillsPayment = async () => {
    try {
        console.log(process.env.API_SYMPH_BASE_URL);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    RefundBillsPayment
}