function calculateDistance(pointA, pointB) {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;

    if (0 === dx) return dy;
    if (0 === dy) return dx;

    return Math.sqrt(dx * dx + dy * dy);
}