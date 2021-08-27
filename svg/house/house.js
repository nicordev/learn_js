const sheetHeight = '18cm';
const sheetWidth = '25cm';

const origin = { x: 100, y: 100 };
const wallThickness = 20;

const defaultAttributes = makeAttributes({
    stroke: 'grey',
    fill: 'none',
    // fillOpacity: '15%'
});

const roomA = {
    origin: origin,
    dx: convertCentimeterToPixel(8.06),
    dy: convertCentimeterToPixel(6.12),
    attributes: defaultAttributes
};
const roomB = {
    origin: { x: origin.x, y: origin.y + roomA.dy },
    dx: convertCentimeterToPixel(2.1),
    dy: convertCentimeterToPixel(1.93),
    attributes: defaultAttributes
};
const roomC = {
    origin: { x: origin.x + roomA.dx + wallThickness, y: origin.y },
    dx: convertCentimeterToPixel(7.73),
    dy: convertCentimeterToPixel(6.13),
    attributes: defaultAttributes
};
const roomD = {
    origin: { x: roomC.origin.x + roomC.dx, y: roomC.origin.y + roomC.dy + wallThickness },
    dx: - convertCentimeterToPixel(2.75),
    dy: convertCentimeterToPixel(3.94),
    attributes: defaultAttributes
};

const rooms = [
    drawRectangle(roomA),
    drawRectangle(roomB),
    drawRectangle(roomC),
    drawRectangle(roomD),
];

// Draw

const roomASvg = drawRectangle(roomA);
const roomBSvg = drawRectangle(roomB);
const roomCSvg = drawRectangle(roomC);

function drawSheet(targetElement, width, height) {
    document.body.querySelector('.container').appendChild(
        createSvgElement(
            `width="${width}" height="${height}" class="plan"`,
            rooms.join('')
        )
    );
}

drawSheet(sheetWidth, sheetHeight);

// TODO: display cotations
function calculateDistance(pointA, pointB) {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;

    if (0 === dx) return dy;
    if (0 === dy) return dx;

    return Math.sqrt(dx ^ 2 + dy ^ 2);
}

function calculateCotations(points) {
    const cotations = [];
    let previousPoint = undefined;

    for (const i in points) {
        if (previousPoint) {
            cotations.push(calculateDistance(points[ i ], previousPoint));
        }
        previousPoint = points[ i ];
    }

    return cotations;
}

function showCotations() {
    const svgElement = document.body.querySelector('.container svg');
    const shapes = svgElement.firstElementChild.children;
    let shapeElement;

    for (const elementKey in shapes) {
        shapeElement = shapes[ elementKey ];
        console.log(calculateCotations(shapeElement.points));
    }
}

showCotations();