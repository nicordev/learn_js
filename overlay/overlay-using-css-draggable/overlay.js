(function () {
    function setDraggableElement(element, handleElement) {
        let isDown = false;
        let offset = [ 0, 0 ];
    
        if (!handleElement) {
            handleElement = element;
        }
    
        if (![ 'absolute', 'relative' ].includes(element.style.position)) {
            element.style.position = 'absolute';
        }
    
        handleElement.addEventListener('mousedown', function (event) {
            if (event.button === 0) {
                isDown = true;
                offset = [
                    element.offsetLeft - event.clientX,
                    element.offsetTop - event.clientY
                ];
            }
        });
        document.addEventListener('mouseup', function (event) {
            isDown = false;
        });
        document.addEventListener('mousemove', function (event) {
            event.preventDefault();
            if (isDown) {
                const x = (event.clientX + offset[ 0 ])
                const y = (event.clientY + offset[ 1 ])
    
                // avoid going outside the top left corner
                if (x >= 0) {
                    element.style.left = x + 'px';
                }
    
                if (y >= 0) {
                    element.style.top = y + 'px';
                }
            }
        });
    }
    
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

        setDraggableElement(overlayElement)

        overlayElement.addEventListener('dblclick', function (event) {
            this.remove();
        });

        document.body.appendChild(overlayElement);
    }

    document.body.querySelector('h1').addEventListener('click', function (event) {
        displayOverlay('zogzog');
    });
})();
