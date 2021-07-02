function getElementFromPosition(x, y) {
    return document.elementFromPoint(x, y);
}

function getElementsFromPosition(x, y) {
    return document.elementsFromPoint(x, y);
}

function getCursorPositionFromEvent(event) {
    return { x: event.clientX, y: event.clientY };
}

function getElementsUnderCursor() {
    return document.querySelectorAll(':hover');
}
