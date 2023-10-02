const CookieGetter = (cookies, cookiename) =>{
    let getCookies = cookies.split(";");

    for (let i = 0; i < getCookies.length; i++) {

        if (getCookies[i].trim().startsWith(cookiename + "=")) {

            let cookieValue = getCookies[i].trim();

            return cookieValue;
        }
    }
    // return getCookies
}

module.exports = {
    CookieGetter
}