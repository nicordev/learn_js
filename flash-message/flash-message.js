function initFlashMessagesRemoval(flashMessagesCssSelector) {
    let flashMessagesElement = document.querySelector(flashMessagesCssSelector);
    let removalDelayInMs = 2000;

    flashMessagesElement.childNodes.forEach((flashMessageElement) => {
        setTimeout(() => {
            flashMessageElement.remove();
        }, removalDelayInMs);

        removalDelayInMs += 1000;
    });
}

initFlashMessagesRemoval('#flash-messages');
