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