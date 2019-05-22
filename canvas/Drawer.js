/**
 * Drawer constructor
 *
 * @param canvasElementTarget
 * @returns {{init: init, converter: {degToRad: (function(*): number), radToDeg: (function(*): number)}, context: null, isBrowserCompatible: isBrowserCompatible, drawLine: drawLine, element: null}}
 * @constructor
 */
function Drawer(canvasElementTarget = null) {

    let drawer = {

        /**
         * Canvas DOM element where the drawer is gonna draw
         */
        element: null,
        /**
         * Canvas context from the drawer element
         */
        context: null,

        /**
         * Initialise the drawer by setting its element and context
         *
         * @param canvasElement
         */
        init: function (canvasElement) {

            drawer.element = canvasElement;
            drawer.context = drawer.element.getContext("2d");
        },

        /**
         * Check if the browser handle canvas elements
         *
         * @param canvasElement
         * @returns {boolean}
         */
        isBrowserCompatible: function (canvasElement) {

            if (!canvasElement.getContext) {
                console.log("Your browser does not handle canvas elements! It sucks!");
                return false;
            }
            return true;
        },

        /**
         * Point constructor
         *
         * @param x
         * @param y
         * @returns {{x: number, y: number}}
         * @constructor
         */
        Point: function (x = 0, y = 0) {

            return {
                x: x,
                y: y
            };
        },

        random: {

            /**
             * Return a random x value
             *
             * @param max
             * @returns {number}
             */
            x: function (max = drawer.element.width) {

                return Math.random() * max;
            },

            /**
             * Return a random y value
             *
             * @param max
             * @returns {number}
             */
            y: function (max = drawer.element.height) {

                return Math.random() * max;
            },

            /**
             * Return a random point within the canvas element or within a range
             *
             * @param xMax
             * @param yMax
             * @returns {drawer.Point|{x, y}}
             */
            point: function (xMax = drawer.element.width, yMax = drawer.element.height) {

                return new drawer.Point(
                    drawer.random.x(xMax),
                    drawer.random.y(yMax)
                );
            }
        },

        /**
         * Convert some values
         */
        convert: {

            /**
             * Convert degrees to radians
             *
             * @param angleInDegrees
             * @returns {number}
             */
            degToRad: function (angleInDegrees) {

                return angleInDegrees * Math.PI / 180;
            },

            /**
             * Convert radians to degrees
             *
             * @param angleInRadians
             * @returns {number}
             */
            radToDeg: function (angleInRadians) {

                return angleInRadians * 180 / Math.PI;
            }
        },

        draw: {

            /**
             * Draw a dot
             *
             * @param coordinates
             */
            dot: function (coordinates = {x: 0, y: 0}) {

                drawer.context.fillRect(coordinates.x, coordinates.y, 1, 1);
            },

            /**
             * Draw a line
             *
             * @param startingPoint
             * @param endingPoint
             */
            line: function (startingPoint = {x: 0, y: 0}, endingPoint = {x: 0, y: 0}) {

                drawer.context.beginPath();
                drawer.context.moveTo(startingPoint.x, startingPoint.y);
                drawer.context.lineTo(endingPoint.x, endingPoint.y);
                drawer.context.stroke();
            },

            /**
             * Draw a rectangle
             *
             * @param upperLeftCorner
             * @param width
             * @param height
             * @param filled
             */
            rectangle: function (upperLeftCorner = {x: 0, y: 0}, width = 1, height = 1, filled = false) {

                if (filled) {
                    drawer.context.fillRect(upperLeftCorner.x, upperLeftCorner.y, width, height);

                } else {
                    drawer.context.strokeRect(upperLeftCorner.x, upperLeftCorner.y, width, height);
                }
            }
        }
    };

    if (canvasElementTarget) {
        drawer.init(canvasElementTarget);
    }

    return drawer;
}