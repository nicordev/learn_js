/**
 * Drawer: utility class to draw things in canvas elements.
 */
function Drawer(canvasElement, options = {}) {

    const element = canvasElement;
    const context = element.getContext("2d");
    const defaultPoint = { x: 0, y: 0 };
    const color = new Color(context);
    
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

    /**
     * Draw an SVG path
     */
    this.drawSvgPath = (svgPath, filled = false) => {
        const path = new Path2D(svgPath);

        filled ? context.fill(path) : context.stroke(path);

        return path;
    }
}