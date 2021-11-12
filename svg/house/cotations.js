

// WIP: display cotations

function drawCotationBetween2Points(pointA, pointB, cotationParameters) {
    const { unit, origin, offset, attributes } = cotationParameters;
    const distance = calculateDistance(pointA, pointB).toFixed(2);

    return drawText(
        {
            x: origin.x + offset,
            y: origin.y + offset
        },
        `${distance} ${unit}`,
        attributes
    );
}

function drawCotations(points) {
    let previousPoint = undefined;
    const cotationParameters = {
        unit: 'mm',
        offset: 10
    };
    const cotations = [];

    for (const point of points) {
        if (previousPoint) {
            cotationParameters.origin = translatePoint(
                previousPoint,
                {
                    x: previousPoint.x + cotationParameters.offset,
                    y: previousPoint.y + cotationParameters.offset
                }
            );
            cotations.push(drawCotationBetween2Points(previousPoint, point, cotationParameters));
        }
        previousPoint = point;
    }

    return cotations.join('');
}

function showCotations() {
    const svgElement = document.body.querySelector('.container svg');
    const shapeElements = [ ...svgElement.firstElementChild.children ];
    const cotations = shapeElements.map(shapeElement => drawCotations(shapeElement.points));

    svgElement.insertAdjacentHTML('beforeend', cotations);
}

// showCotations(); // TODO: calculate from initial dimensions before scaling