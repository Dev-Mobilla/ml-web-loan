const {CookieGetter} = require("../utils/DataUtils.utils");

const getCookies = async (req, res) => {
    // console.log(req.get("cookie"));
    // res.send(req.cookie)

    try {
        const getCookie = req.get("cookie");
        const cookieName = process.env.SESSION_COOKIE_NAME;

        let sessionCookie = null;

        if (getCookie) {
            let cookie = CookieGetter(getCookie, cookieName);

            sessionCookie = cookie;
        }
        res.send({cookie: sessionCookie});

    } catch (error) {
        next(error)
    }
}


module.exports = {
    getCookies
}