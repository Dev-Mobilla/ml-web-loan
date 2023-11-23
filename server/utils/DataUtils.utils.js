const CookieGetter = (cookies, cookiename) =>{
    let getCookies = cookies.split(";");

    for (let i = 0; i < getCookies.length; i++) {

        if (getCookies[i].trim().startsWith(cookiename + "=")) {

            let cookieValue = getCookies[i].trim();

            return cookieValue;
        }
    }
    return null
}

const CalculateNetAmount = (processingFee, principalAmount) => {
    let netAmount;

    if (!principalAmount || principalAmount == "") {
        principalAmount = 0;
    }

    netAmount = parseFloat(principalAmount) - parseFloat(processingFee);

    return netAmount;
}

// const CalculateNetAmount = (req, res, next) => {
//     try {
//         let netAmount;
//         console.log(req.query);

//         let principalAmount = req.query.principal_amount;
//         let processingFee = req.query.processing_fee;

//         if (!principalAmount || principalAmount == "" || typeof(principalAmount) === 'string' ) {
//             principalAmount = 0;
//             console.log(principalAmount);
//         }

//         netAmount = parseFloat(principalAmount) - Number(processingFee);

//         res.send({ netAmount });
//     } catch (error) {
//         next(error)
//     }
// }

module.exports = {
    CookieGetter,
    CalculateNetAmount
}