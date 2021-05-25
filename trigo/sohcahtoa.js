function getAngleFromAdjacentHypotenuse(adjacent, hypotenuse) {
    const ratio = adjacent / hypotenuse;

    return Math.acos(ratio);
}

// distance like hypotenuse
function getPointFromOriginBearingDistance(origin, bearing, distance) {
    return {
        x: Math.cos(bearing) * distance + origin.x,
        y: Math.sin(bearing) * distance + origin.y,
    };
}

// rad = deg * pi / 180
function convertRadiansToDegrees(angle) {
    return (angle * 180) / Math.PI;
}

// deg = rad * 180 / pi
function convertDegreesToRadians(angle) {
    return (angle * Math.PI) / 180;
}
