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

async function addCssLibrary(url) {
    const library = await fetch(url).then(response => response.text());
    addCss(library);
}

function setElementStyle(element, css) {
    element.setAttribute('style', css);
}

function appendElementStyle(element, css) {
    const elementStyle = element.getAttribute('style');

    setElementStyle(element, elementStyle + css);
}
