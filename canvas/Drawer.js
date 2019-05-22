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
         * The coordinates you want for default points values
         */
        defaultPoint: {
            x: 0,
            y: 0
        },

        /**
         * Initialise the drawer by setting its element and context
         *
         * @param canvasElement
         * @param defaultPoint
         */
        init: function (canvasElement, defaultPoint = { x: 0, y: 0 }) {

            drawer.element = canvasElement;
            drawer.context = drawer.element.getContext("2d");
            drawer.defaultPoint = defaultPoint;
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
        Point: function (x = drawer.defaultPoint.x, y = drawer.defaultPoint.y) {

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
            dot: function (coordinates = drawer.defaultPoint) {

                drawer.context.fillRect(coordinates.x, coordinates.y, 1, 1);
            },

            /**
             * Draw a line
             *
             * @param startingPoint
             * @param endingPoint
             */
            line: function (startingPoint = drawer.defaultPoint, endingPoint = drawer.defaultPoint) {

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
            rectangle: function (upperLeftCorner = drawer.defaultPoint, width = 1, height = 1, filled = false) {

                if (filled) {
                    drawer.context.fillRect(upperLeftCorner.x, upperLeftCorner.y, width, height);

                } else {
                    drawer.context.strokeRect(upperLeftCorner.x, upperLeftCorner.y, width, height);
                }
            },

            /**
             * Draw a rectangle with rounded angles (from MDN)
             *
             * @param initialPoint
             * @param width
             * @param height
             * @param radius
             */
            roundedRectangle: function (initialPoint, width, height, radius) {

                drawer.context.beginPath();
                drawer.context.moveTo(initialPoint.x, initialPoint.y + radius);
                drawer.context.lineTo(initialPoint.x, initialPoint.y + height - radius);
                drawer.context.quadraticCurveTo(initialPoint.x, initialPoint.y + height, initialPoint.x + radius, initialPoint.y + height);
                drawer.context.lineTo(initialPoint.x + width - radius, initialPoint.y + height);
                drawer.context.quadraticCurveTo(initialPoint.x + width, initialPoint.y + height, initialPoint.x + width, initialPoint.y + height - radius);
                drawer.context.lineTo(initialPoint.x + width, initialPoint.y + radius);
                drawer.context.quadraticCurveTo(initialPoint.x + width, initialPoint.y, initialPoint.x + width - radius, initialPoint.y);
                drawer.context.lineTo(initialPoint.x + radius, initialPoint.y);
                drawer.context.quadraticCurveTo(initialPoint.x, initialPoint.y, initialPoint.x, initialPoint.y + radius);
                drawer.context.stroke();
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
                startingPoint = drawer.defaultPoint,
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
            },

            /**
             * Draw a quadratic curve (one type of Bézier curve with a single control point)
             *
             * @param initialPoint
             * @param controlPoints
             * @param finalPoints
             * @param filled
             */
            quadraticCurve: function (
                initialPoint = drawer.defaultPoint,
                controlPoints = drawer.defaultPoint,
                finalPoints = drawer.defaultPoint,
                filled = false
            ) {

                drawer.context.beginPath();
                drawer.context.moveTo(initialPoint.x, initialPoint.y);

                if (Array.isArray(controlPoints) && Array.isArray(finalPoints)) {
                    for (let i = 0, size = controlPoints.length; i < size; i++) {
                        drawer.context.quadraticCurveTo(
                            controlPoints[i].x,
                            controlPoints[i].y,
                            finalPoints[i].x,
                            finalPoints[i].y
                        );
                    }

                } else {
                    drawer.context.quadraticCurveTo(
                        controlPoints.x,
                        controlPoints.y,
                        finalPoints.x,
                        finalPoints.y
                    );
                }

                filled ? drawer.context.fill() : drawer.context.stroke();
            },

            /**
             * Draw a Bézier curve
             *
             * @param initialPoint
             * @param aControlPoints
             * @param bControlPoints
             * @param finalPoints
             * @param filled
             */
            bezierCurve: function (
                initialPoint = drawer.defaultPoint,
                aControlPoints = drawer.defaultPoint,
                bControlPoints = drawer.defaultPoint,
                finalPoints = drawer.defaultPoint,
                filled = false
            ) {

                drawer.context.beginPath();
                drawer.context.moveTo(initialPoint.x, initialPoint.y);

                if (Array.isArray(aControlPoints) && Array.isArray(finalPoints)) {
                    for (let i = 0, size = aControlPoints.length; i < size; i++) {
                        drawer.context.bezierCurveTo(
                            aControlPoints[i].x,
                            aControlPoints[i].y,
                            bControlPoints[i].x,
                            bControlPoints[i].y,
                            finalPoints[i].x,
                            finalPoints[i].y
                        );
                    }

                } else {
                    drawer.context.bezierCurveTo(
                        aControlPoints.x,
                        aControlPoints.y,
                        bControlPoints.x,
                        bControlPoints.y,
                        finalPoints.x,
                        finalPoints.y
                    );
                }

                filled ? drawer.context.fill() : drawer.context.stroke();
            }
        },

        /**
         * Draw with an animation
         */
        animate: {

            /**
             * Draw dot by dot
             *
             * @param dots
             */
            dotByDot: function (dots) {

                let drawing = {
                    dots: dots,
                    index: 0,
                    dotsCount: dots.length,

                    draw: function () {

                        drawer.draw.dot(drawing.dots[drawing.index]);
                        drawing.index++;
                        if (drawing.index <= drawing.dotsCount) {
                            requestAnimationFrame(drawing.draw);
                        }
                    }
                };

                drawing.draw();
            },

            /**
             * Draw a line dot by dot
             *
             * @param initialPoint
             * @param finalPoint
             */
            line: function (initialPoint, finalPoint) {

                let dots = [],
                    dx = finalPoint.x - initialPoint.x,
                    dy = finalPoint.y - initialPoint.y;

                let a = drawer.linearMath.slope(initialPoint, finalPoint),
                    b = drawer.linearMath.originY(initialPoint, a);

                if (dx === 0) {
                    if (dy >= 0) {
                        for (let y = initialPoint.y; y <= finalPoint.y; y++) {
                            dots.push(new drawer.Point(initialPoint.x, y));
                        }

                    } else {
                        for (let y = initialPoint.y; y >= finalPoint.y; y--) {
                            dots.push(new drawer.Point(initialPoint.x, y));
                        }
                        console.log(dots[dots.length - 1]);
                    }

                } else if (dx > 0) {
                    for (let x = initialPoint.x, y; x <= finalPoint.x; x++) {
                        y = drawer.linearMath.calculateY(x, a, b);
                        dots.push(new drawer.Point(x, y));
                    }

                } else {
                    for (let x = initialPoint.x, y; x >= finalPoint.x; x--) {
                        y = drawer.linearMath.calculateY(x, a, b);
                        dots.push(new drawer.Point(x, y));
                    }
                }

                drawer.animate.dotByDot(dots);
            }
        },

        /**
         * Some dummy math calculations for linear functions
         */
        linearMath: {

            /**
             * Give the slope a of a line (y = a * x + b)
             *
             * @param pointA
             * @param pointB
             * @returns {number}
             */
            slope: function (pointA, pointB) {

                let dx = pointB.x - pointA.x,
                    dy = pointB.y - pointA.y;

                if (dx !== 0) {
                    return dy / dx;
                } else {
                    return 0;
                }
            },

            /**
             * Give the b value of a line (y = a * x + b)
             *
             * @param pointA
             * @param slope
             * @returns {*}
             */
            originY: function (pointA, slope) {

                if (slope !== 0) {
                    return pointA.y / (slope * pointA.x);
                } else {
                    return pointA.y;
                }
            },

            /**
             * Calculate y with a linear function
             *
             * @param x
             * @param a
             * @param b
             * @returns {*}
             */
            calculateY: function (x, a, b) {

                return a * x + b;
            },

            /**
             * Calculate y from 2 points
             *
             * @param x
             * @param pointA
             * @param pointB
             * @returns {*}
             */
            interpolateY: function (x, pointA, pointB) {

                let a = drawer.linearMath.slope(pointA, pointB),
                    b = drawer.linearMath.originY(pointA, a);

                return drawer.linearMath.calculateY(x, a, b);
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