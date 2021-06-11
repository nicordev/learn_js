function addCss(css, element = document.head) {
    const styleElement = document.createElement('style');

    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = css;
    } else {
        styleElement.appendChild(document.createTextNode(css));
    }

    element.appendChild(styleElement);
}

function setElementStyle(element, css) {
    element.setAttribute('style', css);
}

function appendElementStyle(element, css) {
    const elementStyle = element.getAttribute('style');

    setElementStyle(element, elementStyle + css);
}
