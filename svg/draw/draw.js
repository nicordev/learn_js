function drawGrid(width, height, step) {
    grid = '';

    if (!step) {
        return;
    }

    for (let i = step; i < width; i += step) {
        for (let j = step; j < height; j += step) {
            grid += drawPoint(i, j);
        }
    }

    return grid;
}

function drawCircle(centerX, centerY, radius, stroke = "black", fill = "none") {
    return `<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="${stroke}" fill="${fill}" />`;
}

function drawPoint(x, y) {
    return drawCircle(x, y, 0.5);
}

function drawPolyline(points, stroke = "black", fill = "none") {
    const polylinePoints = points.map((point) => `${point.x},${point.y}`);

    return `<polyline stroke="${stroke}" fill="${fill}" points="${polylinePoints.join(' ')}">`;
}

function drawHourglass({ origin, longSide, stroke, fill }) {
    const angle = getAngleFromAdjacentHypotenuse(longSide / 2, longSide);
    const a = { x: origin.x + longSide, y: origin.y };
    const b = origin;
    const c = getPointFromOriginBearingDistance(b, angle, longSide * 2);
    const d = { x: origin.x, y: c.y };
    console.log({ hourglass: { angle, a, b, c, d } });

    return `<polygon stroke="${stroke}" fill="${fill}" points="${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}" />`;
}

function drawDiamond({ origin, longSide, stroke, fill }) {
    const angle = getAngleFromAdjacentHypotenuse(longSide / 2, longSide);
    const a = origin;
    const b = getPointFromOriginBearingDistance(a, angle, longSide);
    const c = {
        x: a.x,
        y: b.y + (b.y - a.y)
    };
    const d = {
        x: a.x - (b.x - a.x),
        y: b.y
    };
    console.log({ diamond: { angle, a, b, c, d } });

    return `<polygon stroke="${stroke}" fill="${fill}" points="${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}" />`;
}

function drawButterfly({ origin, longSide, shortSide, stroke, fillLeftWing, fillRightWing }) {
    const angle = getAngleFromOppositeHypotenuse((longSide - shortSide) / 2, shortSide);
    const a = origin;
    const b = getPointFromOriginBearingDistance(a, angle, shortSide);
    const c = { x: b.x, y: b.y + shortSide };
    const d = { x: a.x, y: a.y + longSide };
    const e = { x: b.x + (b.x - a.x), y: a.y };
    const f = { x: e.x, y: d.y };
    const leftWing = `<polygon stroke="${stroke}" fill="${fillLeftWing}" points="${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}" />`;
    const rightWing = `<polygon stroke="${stroke}" fill="${fillRightWing}" points="${b.x},${b.y} ${e.x},${e.y} ${f.x},${f.y} ${c.x},${c.y}" />`;

    console.log({ butterfly: { angle, a, b, c, d, e, f } });

    return leftWing + rightWing;
}

function createSvgElement(attributes, content) {
    const element = document.createElement('svg');

    element.innerHTML = `<svg ${attributes}>${content}</svg>`;

    return element;
}

/**
 * px == cm * (96 / 2.54)
 */
function convertCentimeterToPixel(value) {
    return value * (96 / 2.54);
}

function convertMillimeterToPixel(value) {
    return value * (96 / 25.4);
}
