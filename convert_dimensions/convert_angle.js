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
