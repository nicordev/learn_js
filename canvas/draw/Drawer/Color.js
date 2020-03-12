/**
 * Handle colors
 */
function Color(context) {
    /**
     * Color of the canvas background
     */
    let background = "white";

    /**
     * Color for filled shapes
     */
    let filling = "rgb(0, 0, 0)";

    /**
     * Color for strokes
     */
    let stroke = "rgb(0, 0, 0)";

    /**
     * Set the color used when filling a shape and update the context
     *
     * @param fillingColor
     */
    setFill = (fillingColor) => {
        filling = fillingColor;
        context.fillStyle = fillingColor;
    }

    /**
     * Set the color used for strokes and update the context
     *
     * @param strokeColor
     */
    setStroke = (strokeColor) => {
        stroke = strokeColor;
        context.strokeStyle = strokeColor;
    }

    /**
     * Set the color used for background and update the context
     *
     * @param background
     */
    setBackground = (backgroundColor) => {
        background = backgroundColor;
        context.background = background;
    }
}
