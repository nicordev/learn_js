function addCss(element, css) {
    const styleElement = document.createElement('style');

    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = css;
    } else {
        styleElement.appendChild(document.createTextNode(css));
    }

    element.appendChild(styleElement);
}