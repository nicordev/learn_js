/**
 * Drawer: utility class to draw things in canvas elements.
 */
function Drawer(canvasElement, options) {

    let element = canvasElement;
    let context = element.getContext("2d");
    let defaultPoint = { x: 0, y: 0 };
    let color = new Color(context);
    
    if (options.defaultPoint) {
        defaultPoint = options.defaultPoint;
    }
    if (options.fillingColor) {
        color.setFill(options.fillingColor);
    }
    if (options.strokeColor) {
        color.setStroke(options.strokeColor);
    }
    if (options.background) {
        color.setBackground(background);
    }

    /**
     * Point constructor.
     */
    this.Point = (x = defaultPoint.x, y = defaultPoint.y) => {
        return { x: x, y: y };
    }
}