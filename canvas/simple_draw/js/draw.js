function Drawer(canvasElement) {

    let context = canvasElement.getContext("2d");

    this.drawDot = coordinates => context.fillRect(coordinates.x, coordinates.y, 1, 1);
}

function drawAlgo(drawer) {

    const xScale = 1;
    const yScale = 0.001;
    const step = 0.1;

    for (let i = y = 0; i < 100; i += step) {
        y = 100 * i * i;
        drawer.drawDot({x: i * xScale, y: y * yScale});
    }

    for (let i = y = 0; i < 100; i += step) {
        y = Math.pow(2, i);
        drawer.drawDot({x: i * xScale, y: y * yScale});
    }
}

const drawingSheetElement = document.getElementById('drawing-sheet');
const drawer = new Drawer(drawingSheetElement);

drawAlgo(drawer);