function CookieViewer(displayElement = null) {

    let that = {
        displayElement,

        init: function (displayElement) {

            that.displayElement = displayElement;
        },

        showAll: function () {

            that.displayElement.textContent = document.cookie;
        }
    }

    if (displayElement) {
        that.init(displayElement);
    }

    return that;
}