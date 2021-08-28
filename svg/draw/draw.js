//
// Utils
//

/**
 * @param DOMElement targetElement contains SVG code
 * @param string svgContent contains SVG code
 * @return DOMElement created svgElement inside targetElement
 */
function drawSvgElementInside(targetElement, svgWidth, svgHeight, svgContent) {
    const svgElement = createSvgElement(
        `width="${svgWidth}" height="${svgHeight}" class="plan"`,
        svgContent
    );

    targetElement.appendChild(svgElement);

    return svgElement;
}

/**
 * @param string attributes svg element attributes like class, fill, stroke...
 * @param string svgContent contains SVG code
 * @return DOMElement
 */
function createSvgElement(attributes, content) {
    const element = document.createElement('svg');

    element.innerHTML = `<svg ${attributes}>${content}</svg>`;

    return element;
}

/**
 * @param object attributesBag { attribute: attributeValue }
 * @return string the concatenated attributes
 */
function makeAttributes(attributesBag) {
    const attributes = [];

    for (const attribute in attributesBag) {
        attributes.push(`${attribute}="${attributesBag[ attribute ]}"`);
    }

    return attributes.join(' ');
}

/**
 * @param Point origin
 * @param Point offset
 */
function translatePoint(origin, offset) {
    return {
        x: origin.x + offset.x,
        y: origin.y + offset.y
    }
}

//
// Basic shapes
//

function drawCircle(centerX, centerY, radius, stroke = "black", fill = "none") {
    return `<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="${stroke}" fill="${fill}" />`;
}

function drawPoint(x, y) {
    return drawCircle(x, y, 0.5);
}

function drawPolyline(points, attributes) {
    const polylinePoints = points.map((point) => `${point.x},${point.y}`);

    return `<polyline ${attributes} points="${polylinePoints.join(' ')}" />`;
}

function drawPolygon(points, attributes) {
    const polylinePoints = points.map((point) => `${point.x},${point.y}`);

    return `<polygon ${attributes} points="${polylinePoints.join(' ')}" />`;
}

function drawRectangle({ origin, dx, dy, attributes }) {
    return drawPolygon(
        [
            origin,
            { x: origin.x + dx, y: origin.y },
            { x: origin.x + dx, y: origin.y + dy },
            { x: origin.x, y: origin.y + dy },
        ],
        attributes
    );
}

function drawText(origin, content, attributes) {
    if (!attributes) {
        attributes = '';
    }

    return `<text ${attributes} x="${origin.x}" y="${origin.y}">${content}</text>`;
}

//
// Specific shapes
//

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

function drawHourglass({ origin, base, stroke, fill }) {
    const angle = getAngleFromAdjacentHypotenuse(base, base * 4);
    const a = { x: origin.x + base, y: origin.y };
    const b = origin;
    const c = getPointFromOriginBearingDistance(b, angle, base * 4);
    const d = { x: origin.x, y: c.y };

    return `<polygon stroke="${stroke}" fill="${fill}" points="${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}" />`;
}

function drawDiamond({ origin, side, stroke, fill }) {
    const angle = getAngleFromAdjacentHypotenuse(side / 4, side);
    const a = origin;
    const b = getPointFromOriginBearingDistance(a, angle, side);
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
