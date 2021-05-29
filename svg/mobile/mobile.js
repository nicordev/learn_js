function drawHourglasses({ origin, base, stroke, fill }) {
    return drawHourglass({
        origin,
        base,
        stroke,
        fill
    }) + drawHourglass({
        origin: { x: origin.x + base, y: origin.y },
        base,
        stroke,
        fill
    }) + drawDiamond({
        origin: {
            x: origin.x + base,
            y: origin.y
        },
        side: base * 2,
        stroke,
        fill: "none" === fill ? "black" : "none"
    });
}

function drawCircles({ center, radius, longRadius, fill, stroke }) {
    return drawCircle(
        center.x,
        center.y,
        longRadius,
        stroke,
        "black" === fill ? "black" : "white"
    ) + drawCircle(
        center.x,
        center.y,
        radius,
        stroke,
        "black" !== fill ? "black" : "white"
    );
}

function appendSvgShapeToMobile(shape) {
    document.querySelector('.mobile').insertAdjacentHTML('beforeend', shape);
}

function drawMobileParts(longSide, shortSide) {
    // Circles
    const circlesOrigin = { x: 200, y: 125 };
    const invertedCirclesOrigin = { x: 500, y: circlesOrigin.y };
    const circlesRadius = convertMillimeterToPixel(shortSide / 2);
    const circlesLongRadius = convertMillimeterToPixel(longSide / 2);

    appendSvgShapeToMobile(drawCircles({
        center: circlesOrigin,
        radius: circlesRadius,
        longRadius: circlesLongRadius,
        stroke: "black",
        fill: "black"
    }));
    appendSvgShapeToMobile(drawCircles({
        center: invertedCirclesOrigin,
        radius: circlesRadius,
        longRadius: circlesLongRadius,
        stroke: "black",
        fill: "white"
    }));

    // Hourglasses
    const hourglassOrigin = { x: 100, y: 250 };
    const hourglassBase = convertMillimeterToPixel(longSide / 2);
    const invertedHourglassOrigin = { x: 400, y: hourglassOrigin.y };

    appendSvgShapeToMobile(drawHourglasses({
        origin: hourglassOrigin,
        base: hourglassBase,
        stroke: "black",
        fill: "none"
    }));
    appendSvgShapeToMobile(drawHourglasses({
        origin: invertedHourglassOrigin,
        base: hourglassBase,
        stroke: "black",
        fill: "black"
    }));

    // Butterflies
    const butterflyOrigin = { x: 100, y: 700 };
    const invertedButterflyOrigin = { x: 400, y: butterflyOrigin.y };
    const butterflyShortSide = convertMillimeterToPixel(shortSide);
    const butterflyLongSide = convertMillimeterToPixel(longSide);

    appendSvgShapeToMobile(drawButterfly({
        origin: butterflyOrigin,
        longSide: butterflyLongSide,
        shortSide: butterflyShortSide,
        stroke: 'black',
        fillLeftWing: 'black',
        fillRightWing: 'none'
    }));
    appendSvgShapeToMobile(drawButterfly({
        origin: invertedButterflyOrigin,
        longSide: butterflyLongSide,
        shortSide: butterflyShortSide,
        stroke: 'black',
        fillLeftWing: 'none',
        fillRightWing: 'black'
    }));
}

// Draw grid
document.querySelector(".grid").innerHTML = drawGrid(1000, 1000, 10);

// References
const longSide = 53;
const shortSide = 40;

drawMobileParts(longSide, shortSide);