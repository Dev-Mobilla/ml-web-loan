const fs = require('fs');

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

const FormatDate = () =>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Formatted Date: "+formattedDate);
    return formattedDate;
    // console.log("Formatted Date: ", FormattedDate);
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
    CalculateNetAmount,
    FormatDate
}