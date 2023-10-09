const {CookieGetter} = require("../utils/DataUtils.utils");
const {ErrorThrower} = require("../utils/ErrorGenerator");

const Auth = (req, res, next) => {

    const getCookie = req.headers.cookie;
    const cookieName = "ML_W_W_S";

    
    if (getCookie) {
        const isCookiePresent = CookieGetter(getCookie, cookieName);
        if (!isCookiePresent) {
            const response = Unauthorized();
        
            // res.send(response).status(401);
            // res.end()
            console.log("cookie 1");
            next(response)

        }else{

            console.log("cookie 2");
            next();
        }
        
    }else{
        const response = Unauthorized();

        // console.log("cookie 2", response.response.data);
        // res.status(401).send(response.response.data);
        // res.end()
        console.log("cookie 3");
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