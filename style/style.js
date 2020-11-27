function addCssFile(cssFilePath) {
    let linkElement = document.createElement("link");

    linkElement.href = cssFilePath; 
    linkElement.rel = "stylesheet"; 
    linkElement.type = "text/css"; 
    document.head.appendChild(linkElement);
}

addCssFile('css/my-style.css')