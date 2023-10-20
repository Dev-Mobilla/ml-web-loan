const {CookieGetter} = require("../utils/DataUtils.utils");
const {ErrorThrower} = require("../utils/ErrorGenerator");

const Auth = (req, res, next) => {

    const getCookie = req.headers.cookie;
    const cookieName = "ML_W_W_S";

    
    if (getCookie) {
        const isCookiePresent = CookieGetter(getCookie, cookieName);
        if (!isCookiePresent) {
            const response = Unauthorized();
            next(response)

        }else{

            next();
        }
        
    }else{
        const response = Unauthorized();
        next(response);
    }
    
}

const Unauthorized = () => {

    let message = {
        title: "Authentication Error",
        body: "Session expired please login again."
    }

    const error = ErrorThrower(401, "AUTHENTICATION_ERROR", message)
 
    return error;
}

module.exports = { Auth };