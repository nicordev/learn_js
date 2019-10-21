let cookieFormHandler = new CookieFormHandler(),
    cookieViewer = new CookieViewer();

cookieFormHandler.init(
    new CookieHandler(),
    document.getElementById("cookie-form"),
    document.getElementById("cookie-name"),
    document.getElementById("cookie-value"),
    document.getElementById("cookie-duration"),
    document.getElementById("cookie-duration-unit")
);

cookieViewer.init(
    document.getElementById("cookie-list")
);

cookieViewer.showAll();
cookieFormHandler.cookieFormElement.addEventListener("submit", cookieViewer.showAll);
