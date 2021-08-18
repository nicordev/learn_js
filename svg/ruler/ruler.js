function drawRuler(origin, end) {
    return drawPolyline([
        {x: 100, y: 100},
        {x: 150, y: 100},
        {x: 150, y: 150},
        {x: 200, y: 300},
    ],
    'fill="none" stroke="black"')
}

document.querySelector(".grid").innerHTML = drawGrid(1000, 1000, 10);
document.querySelector('.mobile').insertAdjacentHTML('beforeend', drawRuler());

// TODO: handle mouse position to draw a dynamic ruler
// TODO: display ruler length
