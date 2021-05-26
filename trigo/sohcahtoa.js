// SOHCAHTOA

/**
 * cos(angle) = adjacent / hypotenuse
 */
function getAngleFromAdjacentHypotenuse(adjacent, hypotenuse) {
    return Math.acos(adjacent / hypotenuse);
}

/**
 * sin(angle) = opposite / hypotenuse
 */
function getAngleFromOppositeHypotenuse(opposite, hypotenuse) {
    return Math.asin(opposite / hypotenuse);
}

/**
 * tan(angle) = opposite / adjacent
 */
function getAngleFromOppositeAdjacent(opposite, adjacent) {
    return Math.atan(opposite, adjacent);
}

/**
 * origin: { x, y }
 * bearing: angle from 0 at east
 * distance like hypotenuse
 */
function getPointFromOriginBearingDistance(origin, bearing, distance) {
    return {
        x: Math.cos(bearing) * distance + origin.x,
        y: Math.sin(bearing) * distance + origin.y,
    };
}

/**
 * rad = deg * pi / 180
 */
function convertRadiansToDegrees(angle) {
    return (angle * 180) / Math.PI;
}

/**
 * deg = rad * 180 / pi
 */
function convertDegreesToRadians(angle) {
    return (angle * Math.PI) / 180;
}
