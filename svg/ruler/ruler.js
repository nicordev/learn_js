function drawRuler(origin, end) {
    return drawPolyline([
        {x: 100, y: 100},
        {x: 150, y: 100},
        {x: 150, y: 150},
        {x: 200, y: 300},
    ])
}

document.querySelector(".grid").innerHTML = drawGrid(1000, 1000, 10);
document.querySelector('.mobile').insertAdjacentHTML('beforeend', drawRuler());