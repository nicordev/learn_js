/**
 * Drawer constructor
 *
 * @param canvasElementTarget
 * @returns {{init: init, random: {x: (function(*=): number), y: (function(*=): number), point: (function(*=, *=): (drawer.Point|{x: number, y: number}))}, context: null, isBrowserCompatible: isBrowserCompatible, Point: (function(*=, *=): {x: number, y: number}), convert: {degToRad: (function(*): number), radToDeg: (function(*): number)}, draw: {arc: arc, line: line, dot: dot, rectangle: rectangle, triangle: triangle}, element: null}}
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
            },

            /**
             * Draw a triangle
             *
             * @param pointA
             * @param pointB
             * @param pointC
             * @param filled
             */
            triangle: function (pointA, pointB, pointC, filled = false) {

                if (filled) {
                    drawer.context.beginPath();
                    drawer.context.moveTo(pointA.x, pointA.y);
                    drawer.context.lineTo(pointB.x, pointB.y);
                    drawer.context.lineTo(pointC.x, pointC.y);
                    drawer.context.fill();

                } else {
                    drawer.draw.line(pointA, pointB);
                    drawer.draw.line(pointB, pointC);
                    drawer.draw.line(pointA, pointC);
                }
            },

            /**
             * Draw an arc
             *
             * @param startingPoint
             * @param length
             * @param initialAngle
             * @param finalAngle
             * @param filled
             * @param counterClockwise
             * @param radians
             */
            arc: function (
                startingPoint = {x: 0, y: 0},
                length = 0,
                initialAngle = 0,
                finalAngle = 0,
                filled = false,
                counterClockwise = false,
                radians = false
            ) {

                drawer.context.beginPath();
                drawer.context.arc(
                    startingPoint.x,
                    startingPoint.y,
                    length,
                    radians ? initialAngle : drawer.convert.degToRad(initialAngle),
                    radians ? finalAngle : drawer.convert.degToRad(finalAngle),
                    counterClockwise
                );
                if (filled) {
                    drawer.context.fill();
                } else {
                    drawer.context.stroke();
                }
            },

            /**
             * Draw a circle
             *
             * @param center
             * @param radius
             * @param filled
             */
            circle: function (center, radius, filled = false) {

                drawer.draw.arc(center, radius, 0, 2 * Math.PI, filled, true, true);
            }
        }
    };

    if (canvasElementTarget) {
        drawer.init(canvasElementTarget);
    }

    return drawer;
}

/**
 * Drawer Factory "singleton"
 *
 * @type {{buildWithNewCanvas: (function(*=, *=, *=, *=, *=): {init: init, random: {x: (function(*=): number), y: (function(*=): number), point: (function(*=, *=): (drawer.Point|{x: number, y: number}))}, context: null, isBrowserCompatible: isBrowserCompatible, Point: (function(*=, *=): {x: number, y: number}), convert: {degToRad: (function(*): number), radToDeg: (function(*): number)}, draw: {arc: arc, line: line, dot: dot, rectangle: rectangle, triangle: triangle}, element: null})}}
 */
const drawerFactory = {

    /**
     * Return a Drawer with a canvas element appended to another DOM element
     *
     * @param parentElement
     * @param canvasWidth
     * @param canvasHeight
     * @param htmlClass
     * @param htmlId
     * @returns {{init: init, random: {x: (function(*=): number), y: (function(*=): number), point: (function(*=, *=): (drawer.Point|{x: number, y: number}))}, context: null, isBrowserCompatible: isBrowserCompatible, Point: (function(*=, *=): {x: number, y: number}), convert: {degToRad: (function(*): number), radToDeg: (function(*): number)}, draw: {arc: arc, line: line, dot: dot, rectangle: rectangle, triangle: triangle}, element: null}}
     */
    buildWithNewCanvas: function (parentElement = null, canvasWidth = null, canvasHeight = null, htmlClass = null, htmlId = null) {

        let element = document.createElement("canvas");

        if (canvasWidth) {
            element.width = canvasWidth;
        }
        if (canvasHeight) {
            element.height = canvasHeight;
        }
        if (htmlClass) {
            element.className = htmlClass;
        }
        if (htmlId) {
            element.id = htmlId;
        }
        if (parentElement) {
            parentElement.appendChild(element);
        }

        return new Drawer(element);
    }
};

/*
TODO
    * set the color of the pen
        * as a drawer property
        * directly in each method
 */