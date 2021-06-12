function createStyleElement(css) {
    const styleElement = document.createElement('style');

    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = css;
    } else {
        styleElement.appendChild(document.createTextNode(css));
    }

    return styleElement;
}

function addCss(css, element = document.head) {
    element.appendChild(createStyleElement(css));
}

// TODO: need loading the library using fetch
function addCssLibrary(url) {
    const styleElement = createStyleElement('');

    styleElement.setAttribute('href', url);
    document.body.appendChild(styleElement);
}

function setElementStyle(element, css) {
    element.setAttribute('style', css);
}

function appendElementStyle(element, css) {
    const elementStyle = element.getAttribute('style');

    setElementStyle(element, elementStyle + css);
}
