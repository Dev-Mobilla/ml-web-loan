const {CookieGetter} = require("../utils/DataUtils.utils");

const Auth = (req, res, next) => {

    const getCookie = req.headers.cookie;
    const cookieName = "ML_W_W_S";

    if (getCookie) {
        const isCookiePresent = CookieGetter(getCookie, cookieName);
        if (!isCookiePresent) {
            return Unauthorized(res);
          }
          next();
        
    }else{
        return Unauthorized(res);
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