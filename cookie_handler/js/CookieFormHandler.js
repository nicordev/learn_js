/**
 * Link between the HTML form and the CookieHandler
 */
function CookieFormHandler(
    cookieHandler = null,
    cookieNameElement = null,
    cookieValueElement = null,
    cookieDurationElement = null,
    cookieDurationUnitElement = null,
    formElement = null
) {

    let that = {
        cookieHandler,
        cookieNameElement,
        cookieValueElement,
        cookieDurationElement,
        cookieDurationUnitElement,
        cookie: {
            name,
            value,
            duration,
            durationUnit
        },

        init: function (
            cookieHandler,
            cookieNameElement,
            cookieValueElement,
            cookieDurationElement,
            cookieDurationUnitElement,
            formElement
        ) {
            that.cookieHandler = cookieHandler;
            that.cookieNameElement = cookieNameElement;
            that.cookieValueElement = cookieValueElement;
            that.cookieDurationElement = cookieDurationElement;
            that.cookieDurationUnitElement = cookieDurationUnitElement;

            that.refresh();
            that.addSetCookieListener(formElement);
        },

        refresh: function () {

            that.cookie.name = that.cookieNameElement.value;
            that.cookie.value = that.cookieValueElement.value;
            that.cookie.duration = that.cookieDurationElement.value;
            that.cookie.durationUnit = that.cookieDurationUnitElement.value;
        },

        addSetCookieListener: function (formElement) {

            formElement.addEventListener("submit", that._setCookieCallback);
        },

        _setCookieCallback: function (event) {
            event.preventDefault();
            that.refresh();

            let durationInDays = false,
                duration = that.cookie.duration;

            if (that.cookie.durationUnit === "d" || that.cookie.durationUnit === "day") {
                durationInDays = true;
            } else if (that.cookie.durationUnit === "s" || that.cookie.durationUnit === "second") {
                duration *= 1000;
            }

            cookieHandler.setCookie(
                that.cookie.name,
                that.cookie.value,
                duration,
                durationInDays
            );
        },

        removeSetCookieListener: function (formElement) {

            formElement.removeEventListener("submit", that._setCookieCallback);
        }
    }

    if (
        cookieHandler &&
        cookieNameElement &&
        cookieValueElement &&
        cookieDurationElement &&
        formElement
    ) {
        that.init(
            cookieHandler,
            cookieNameElement,
            cookieValueElement,
            cookieDurationElement,
            formElement,
            durationInDays
        );
    }

    return that;
}