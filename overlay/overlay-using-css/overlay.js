(function () {

    document.body.querySelector('h1').addEventListener('click', function (event) {
        displayOverlay('zogzog');
    });
    
    function displayOverlay(content) {
        const overlayElement = document.createElement('div');

        overlayElement.textContent = content;
        overlayElement.classList.add('overlay');

        overlayElement.setAttribute('style', `
            position: absolute;
            top: 0;
            left: 0;
            background-color: darkolivegreen;
            color: white;
            padding: 2em;
            z-index: 9999;
        `);

        overlayElement.addEventListener('dblclick', function (event) {
            this.remove();
        });

        document.body.appendChild(overlayElement);
    }
})();
