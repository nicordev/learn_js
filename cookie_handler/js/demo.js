let cookieFormHandler = new CookieFormHandler();

cookieFormHandler.init(
    new CookieHandler(),
    document.getElementById("cookie-name"),
    document.getElementById("cookie-value"),
    document.getElementById("cookie-duration"),
    document.getElementById("cookie-duration-unit")
);