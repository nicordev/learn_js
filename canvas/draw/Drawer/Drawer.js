/**
 * Drawer: utility class to draw things in canvas elements.
 */
function Drawer(canvasElement, options = {}) {

    let { defaultPoint, fillingColor, strokeColor, background } = options;
    const element = canvasElement;
    const context = element.getContext("2d");
    const color = new Color(context);

    if (!defaultPoint) {
        defaultPoint = { x: 0, y: 0 };
    }
    if (fillingColor) {
        color.setFill(fillingColor);
    }
    if (strokeColor) {
        color.setStroke(strokeColor);
    }
    if (background) {
        color.setBackground(background);
    }

    /**
     * Point constructor.
     */
    this.Point = (x = defaultPoint.x, y = defaultPoint.y) => {
        return { x: x, y: y };
    };

    /**
     * Draw an SVG path
     */
    this.drawSvgPath = (svgPath, filled = false) => {
        const path = new Path2D(svgPath);

        filled ? context.fill(path) : context.stroke(path);

        return path;
    };
}

// WIP...