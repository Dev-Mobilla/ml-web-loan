const {CookieGetter} = require("../utils/DataUtils.utils");

const Auth = (req, res, next) => {

    const getCookie = req.headers.cookie;
    const cookieName = "ML_W_W_S";

    if (getCookie) {
        const isCookiePresent = CookieGetter(getCookie, cookieName);
        console.log(isCookiePresent);
        if (!isCookiePresent) {
            
            Unauthorized(res);
        }
        next();
        
    }else{

        Unauthorized(res);
    }

}

const Unauthorized = (res) => {
    let error = {
        error: {
             status: 401,
             message: "AUTHENTICATION_ERROR",
             statusCode: "Unauthorized"
        }
     }
 
     res.send(error).status(401);
     res.end()
}

module.exports = { Auth };