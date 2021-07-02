/**
 * Create a cookie as text
 */
function makeCookie(name, value, options) {
    const {
        expires,
        path,
        domain,
        secure
    } = options;
    let cookie = encodeURIComponent(name);

    if (typeof value != 'undefined') {
        cookie += '=' + encodeURIComponent(value);
    }

    if (expires instanceof Date) {
        cookie += "; expires=" + expires.toUTCString();
    }

    if (path) cookie += `; path=${path}`;
    if (domain) cookie += `; domain=${domain}`;
    if (secure) cookie += `; secure`;

    return cookie;
}

/**
 *  Set a cookie expiring in...
 */
function setCookieWithDuration(name, value, duration) {
    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + duration);
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Append a cookie to existing cookies
 */
function addCookie(cookie) {
    document.cookie = cookie;
}

/**
 * Get cookies names and values
 */
function getAllCookies() {
    return decodeURIComponent(document.cookie).split(';').map(
        (cookie) => {
            cookieParts = cookie.split('=')

            return {
                name: cookieParts[0],
                value: cookieParts[1] ?? undefined,
            }
        }
    );
}

/**
 * Convert days into milliseconds to set a cookie duration in days.
 */
function convertDaysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

/**
 *  Fetch cookie value.
 */
function getCookie(name) {
    const rawCookies = decodeURIComponent(document.cookie);
    const regex = new RegExp(`(${name})=([^;]+)`);
    const cookies = rawCookies.match(regex);

    return cookies.filter(cookie => name === cookie);
}

/**
 *  Delete a cookie
 */
function deleteCookie(name) {
    setCookieWithDuration(name, "", -999);
}