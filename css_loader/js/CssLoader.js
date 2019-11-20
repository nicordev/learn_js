
function CssLoader() {

    let that = {
        load: function (cssFilePath) {
            let linkElement = document.createElement("link");

            linkElement.rel = "stylesheet";
            linkElement.type = "text/css";
            linkElement.href = cssFilePath;

            if (typeof linkElement != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(linkElement);
                return linkElement;
            }
        }
    };

    return that;
}
