const drawingSheet = document.getElementById('drawing-sheet');
const drawer = new Drawer(drawingSheet);

const svg = drawer.drawSvgPath([
    {x: 10, y: 10},
    {x: 15, y: 10},
    {x: 15, y: 15},
    {x: 10, y: 15},
], true);

console.log(svg)