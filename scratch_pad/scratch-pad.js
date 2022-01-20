(function () {
    function setElementStyle(element, css) {
        element.setAttribute('style', css);
    }

    function removePads() {
        const padElements = document.body.querySelectorAll('.scratch-pad');

        for (let element of padElements) {
            element.remove();
        }
    }

    function createPad() {
        const padElement = document.createElement('textarea');

        padElement.classList.add('scratch-pad');

        setElementStyle(
            padElement,
            `
            position: absolute;
            background-color: white;
            left: O;
            top: 0;
            z-index: 9999999;
            padding: 3em;
            `
        );

        // TODO: add input to set css selector and fill the pad
        // TODO: add a close button
        // TODO: move the pad with the mouse

        return padElement;
    }

    function fillPadFromElementContents(elements, padElement) {
        for (let element of elements) {
            padElement.textContent += `${element.textContent}\n`;
        }
    }

    function main() {
        removePads();

        const rawElements = document.querySelectorAll('ngb-highlight');
        const padElement = createPad();

        fillPadFromElementContents(rawElements, padElement);
        document.body.appendChild(padElement);
    }

    console.clear();
    main();
})();
