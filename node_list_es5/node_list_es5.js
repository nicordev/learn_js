function setInputTypeToDate(nodeList) {
    Array.prototype.slice.call(nodeList).forEach(function (element) {
        element.setAttribute('type', 'date');
    });
}

setInputTypeToDate(document.getElementsByClassName('date'));
