var drawer = {

    draw: function (canvasElement) {

        if (!drawer.isBrowserCompatible(canvasElement)) return false;

        var canvas = canvasElement,
            context = canvas.getContext("2d");

        context.fillStyle = "rgb(200, 0, 0)";
        context.fillRect(10, 10, 50, 50);

        context.fillStyle = "rgba(0, 0, 200, 0.5)";
        context.fillRect(30, 30, 50, 50);
    },

    isBrowserCompatible: function (canvasElement) {

        if (!canvasElement.getContext) {
            console.log("Your browser does not handle canvas elements! It sucks!");
            return false;
        }
        return true;
    }
};