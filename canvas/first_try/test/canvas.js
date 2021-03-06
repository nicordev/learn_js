var test = {

    drawer: new Drawer(),

    drawSomeStuff: function () {

        let canvasElement = document.getElementById("my-artwork");

        if (!test.drawer.isBrowserCompatible(canvasElement)) return false;

        var context = canvasElement.getContext("2d");

        // Line
        context.beginPath();
        context.moveTo(300, 25);
        context.lineTo(400, 50);
        context.stroke();

        // 2 intersecting rectangles
        context.fillStyle = "rgb(200, 0, 0)";
        context.fillRect(10, 10, 50, 50);

        context.fillStyle = "rgba(0, 0, 200, 0.5)";
        context.fillRect(30, 30, 50, 50);

        // More rectangles
        context.fillStyle = "rgb(0, 0, 0)";
        context.fillRect(135, 125, 100, 100);
        context.clearRect(155, 145, 60, 60);
        context.strokeRect(160, 150, 50, 50);

        // Triangle
        context.beginPath();
        context.moveTo(175, 50);
        context.lineTo(100, 75);
        context.lineTo(100, 25);
        context.closePath();
        context.stroke();

        // Filled triangle
        context.beginPath();
        context.moveTo(275, 50); // Move the pen without drawing
        context.lineTo(200, 75);
        context.lineTo(200, 25);
        context.fill();

        // Smiley
        context.beginPath();
        context.arc(75, 175, 50, 0, Math.PI * 2, true);  // Cercle extérieur
        context.moveTo(110,175);
        context.arc(75, 175, 35, 0, Math.PI, false);  // Bouche (sens horaire)
        context.moveTo(65, 165);
        context.arc(60, 165, 5, 0, Math.PI * 2, true);  // Oeil gauche
        context.moveTo(95, 165);
        context.arc(90, 165, 5, 0, Math.PI * 2, true);  // Oeil droite
        context.stroke();

        // Arc
        context.beginPath();
        context.arc(10, 200, 100, test.drawer.convert.degToRad(45),  test.drawer.convert.degToRad(90), false);
        context.fill();

        // Path2D
        let p = new Path2D('M10 400 h 80 v 80 h -80 Z');
        context.fill(p);
    }
};