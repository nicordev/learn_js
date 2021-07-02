/**
 *  Fetch cookie value.
 */
 function getCookie(name) {
    const rawCookies = decodeURIComponent(document.cookie);
    const cookies = rawCookies.split(';');
    name += "=";

    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return "";
}
old

/**
 *  Delete a cookie
 */
function deleteCookie(name) {
    setCookieWithDuration(name, "", -999);
}