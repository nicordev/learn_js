/**
 *  Get a cookie name and value
 */
 function getCookie(name) {
    const rawCookies = decodeURIComponent(document.cookie);
    const regex = new RegExp(`(${name})=([^;]+)`);
    const cookieParts = rawCookies.match(regex);

    if (!cookieParts) {
        return;
    }

    return {
        name: cookieParts[ 1 ],
        value: cookieParts[ 2 ] ?? undefined
    };
}

/**
 * Get cookies names and values
 */
function getAllCookies() {
    return decodeURIComponent(document.cookie).split(';').map(
        (cookie) => {
            cookieParts = cookie.split('=');

            return {
                name: cookieParts[ 0 ],
                value: cookieParts[ 1 ] ?? undefined,
            };
        }
    );
}

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
    } else if (typeof expires === 'string') {
        cookie += "; expires=" + expires;
    }

    if (path) cookie += `; path=${path}`;
    if (domain) cookie += `; domain=${domain}`;
    if (secure) cookie += `; secure`;

    return cookie;
}

/**
 * Add or update a cookie to document
 */
function setCookie(cookie) {
    document.cookie = cookie;
}

/**
 * Remove a cookie
 */
function removeCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=${(new Date(0).toUTCString())}`;
}

/**
 * Convert days into milliseconds to set a cookie duration in days.
 */
 function convertDaysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

/**
 *  Set a cookie with a duration in milliseconds
 */
function setCookieWithDuration(name, value, duration) {
    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + duration);
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}