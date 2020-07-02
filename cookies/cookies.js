/**
 *  Create a cookie.
 */
export function setCookie(name, value, duration) {
    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + duration);
    const expires = "expires="+ expirationDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Convert days into milliseconds to set a cookie duration in days. 
 */
export function convertDaysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

/**
 *  Fetch cookie value.
 */
export function getCookie(name) {
    const rawCookies = decodeURIComponent(document.cookie);
    const regex = new RegExp(`(${name})=([^;]+)`);

    const cookie = rawCookies.match(regex);

    console.warn(cookie);

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

/**
 *  Delete a cookie
 */
export function deleteCookie(name) {
    setCookie(name, "", -999);
}