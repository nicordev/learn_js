(function () {

    document.body.querySelector('h1').addEventListener('click', function (event) {
        displayOverlay('zogzog');
    });
    
    function displayOverlay(content) {
        const overlayElement = document.createElement('div');

        overlayElement.textContent = content;
        overlayElement.classList.add('overlay');

        overlayElement.style.position = 'absolute';
        overlayElement.style.top = '0';
        overlayElement.style.left = '0';

        overlayElement.addEventListener('dblclick', function (event) {
            this.remove();
        });

        document.body.appendChild(overlayElement);
    }
})();
