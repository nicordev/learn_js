function switchGrid() {
    console.log('zog');
    const gridElement = document.querySelector('.grid');

    if (gridElement.classList.contains('hidden')) {
        gridElement.classList.remove('hidden');
        console.log('show');

        return;
    }

    gridElement.classList.add('hidden');
    console.log('hide');
}

const gridWidth = convertCentimeterToPixel(20);
const gridHeight = convertCentimeterToPixel(25);
const gridStep = convertCentimeterToPixel(1);

document.querySelector(".grid").innerHTML = drawGrid(gridWidth, gridHeight, 10);
document.querySelector('.grid-switch').addEventListener('click', function (event) {
    console.log(event);
    switchGrid();
});