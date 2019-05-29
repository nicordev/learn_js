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
     * @param options
     * @returns {{init: init, random: {x: (function(*=): number), y: (function(*=): number), point: (function(*=, *=): (drawer.Point|{x: number, y: number}))}, context: null, isBrowserCompatible: isBrowserCompatible, Point: (function(*=, *=): {x: number, y: number}), convert: {degToRad: (function(*): number), radToDeg: (function(*): number)}, draw: {arc: arc, line: line, dot: dot, rectangle: rectangle, triangle: triangle}, element: null}}
     */
    buildWithNewCanvas: function (parentElement = null, options = {}) {

        let element = document.createElement("canvas");

        if (parentElement) {
            parentElement.appendChild(element);
        }

        let drawer = new Drawer();

        drawer.init(element, options);

        return drawer;
    }
};


/**
 * Drawer constructor
 *
 * @returns {{init: init, random: {x: (function(*=): number), y: (function(*=): number), point: (function(*=, *=): (drawer.Point|{x: number, y: number}))}, context: null, isBrowserCompatible: isBrowserCompatible, Point: (function(*=, *=): {x: number, y: number}), convert: {degToRad: (function(*): number), radToDeg: (function(*): number)}, draw: {arc: arc, line: line, dot: dot, rectangle: rectangle, triangle: triangle}, element: null}}
 * @constructor
 */
function Drawer() {

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
         * Default point used in drawing methods
         */
        defaultPoint: {x: 0, y: 0},

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

        /**
         * Initialise the drawer by setting its element and context
         *
         * @param canvasElement
         * @param options
         */
        init: function (canvasElement, options = {}) {

            drawer.element = canvasElement;
            drawer.context = drawer.element.getContext("2d");

            // Optional parameters
            if (options.canvasElementWidth) drawer.element.width = options.canvasElementWidth;
            if (options.canvasElementHeight) drawer.element.height = options.canvasElementHeight;
            if (options.canvasElementHtmlClass) drawer.element.className = options.canvasElementHtmlClass;
            if (options.canvasElementHtmlId) drawer.element.id = options.canvasElementHtmlId;
            if (options.defaultPoint) drawer.defaultPoint = options.defaultPoint;
            if (options.fillingColor) {
                drawer.color.setFill(options.fillingColor);
            }
            if (options.strokeColor) {
                drawer.color.setStroke(options.strokeColor);
            }
            if (options.background) {
                drawer.color.setBackground(background);
            }
        },

        /**
         * Set the next lines width
         *
         * @param width
         */
        setLineWidth: function (width = 1) {

            drawer.context.lineWidth = width;
        },

        /**
         * Set the shadow
         *
         * @param options
         */
        setShadow: function (options = {}) {

            let shadow = {
                offsetX: 0,
                offsetY: 0,
                blur: 0.0,
                color: "rgb(0, 0, 0)"
            };

            drawer.helper.checkOptionsObject(options, shadow);

            if (typeof options.offsetX != "undefined") drawer.context.shadowOffsetX = options.offsetX;
            if (typeof options.offsetY != "undefined") drawer.context.shadowOffsetY = options.offsetY;
            if (typeof options.blur != "undefined") drawer.context.shadowBlur = options.blur;
            if (typeof options.color != "undefined") drawer.context.shadowColor = options.color;
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
         * Colors used in drawing methods
         */
        color: {

            /**
             * Color of the canvas background
             */
            background: "white",

            /**
             * Color for filled shapes
             */
            filling: "rgb(0, 0, 0)",

            /**
             * Color for strokes
             */
            stroke: "rgb(0, 0, 0)",

            /**
             * Set the color used when filling a shape and update the context
             *
             * @param fillingColor
             */
            setFill(fillingColor = drawer.color.filling) {

                drawer.color.filling = fillingColor;
                drawer.context.fillStyle = fillingColor;
            },

            /**
             * Set the color used for strokes and update the context
             *
             * @param strokeColor
             */
            setStroke(strokeColor = drawer.color.stroke) {

                drawer.color.stroke = strokeColor;
                drawer.context.strokeStyle = strokeColor;
            },

            /**
             * Set the color used for background and update the context
             *
             * @param background
             */
            setBackground: function (background = drawer.color.background) {

                drawer.color.background = background;
                drawer.context.background = background;
            },

            /**
             * Return a color string rgba()
             *
             * @param red
             * @param green
             * @param blue
             * @param transparency
             * @returns {string}
             */
            rgba: function (red, green, blue, transparency = 1) { // TODO: make a Color object with red, green, blue and transparency properties and a get method

                return "rgba(" + red + ", " + green + ", " + blue + ", " + transparency + ")";
            }
        },

        /**
         * Give random stuff
         */
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
         * Draw lines and shapes and dot and...
         */
        draw: {

            /**
             * Draw using SVG path
             *
             * @param svgPath
             * @param filled
             */
            svgPath: function (svgPath, filled = false) {

                let path = new Path2D(svgPath);

                filled ? drawer.context.fill(path) : drawer.context.stroke(path);

                return path;
            },

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
             * Draw a line from a point, a length and an angle. Return the ending point.
             *
             * @param initialPoint
             * @param length
             * @param angle
             * @param inRadians
             * @returns {*|{x: number, y: number}}
             */
            lineFromAngle: function (
                initialPoint = drawer.defaultPoint,
                length,
                angle = 0,
                inRadians = false
            ) {
                let endingPoint = drawer.trigonometry.getPointFromAngle(angle, length, initialPoint, inRadians);
                drawer.draw.line(initialPoint, endingPoint);

                return endingPoint;
            },

            /**
             * Draw a rectangle
             *
             * @param upperLeftCorner
             * @param width
             * @param height
             * @param filled
             */
            rectangle: function (
                upperLeftCorner = drawer.defaultPoint,
                width = 1,
                height = 1,
                filled = false
            ) {

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
            roundedRectangle: function (
                initialPoint,
                width,
                height,
                radius
            ) {

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
            triangle: function (
                pointA,
                pointB,
                pointC,
                filled = false
            ) {

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
         * Erase stuff
         */
        erase: {

            /**
             * Erase all the canvas with a color
             *
             * @param background
             */
            all: function (background = drawer.color.background) {

                let initialFillStyle = drawer.context.fillStyle;

                drawer.context.fillStyle = background;
                drawer.context.fillRect(0, 0, drawer.element.width, drawer.element.height);
                drawer.context.fillStyle = initialFillStyle;
            },

            /**
             * Erase a rectangle area
             *
             * @param upperLeftCorner
             * @param width
             * @param height
             * @param background
             */
            rectangle: function (
                upperLeftCorner = drawer.defaultPoint,
                width = 10,
                height = 10,
                background = drawer.color.background
            ) {

                let initialFillStyle = drawer.context.fillStyle;

                drawer.context.fillStyle = background;
                drawer.context.fillRect(upperLeftCorner.x, upperLeftCorner.y, width, height);
                drawer.context.fillStyle = initialFillStyle;
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
                    dy = finalPoint.y - initialPoint.y,
                    a = drawer.linearMath.slope(initialPoint, finalPoint),
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
                    return pointA.y - slope * pointA.x;
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
        },

        /**
         * Some trigonometry utilities
         */
        trigonometry: {

            /**
             * Calculate the coordinates of a point from another point and an angle
             *
             * @param angle
             * @param length
             * @param center
             * @param angleInRadians
             * @returns {{x: number, y: number}}
             */
            getPointFromAngle: function (
                angle,
                length,
                center = {x: 0, y: 0},
                angleInRadians = false
            ) {

                if (!angleInRadians) {
                    angle = drawer.convert.degToRad(angle);
                }

                return {
                    x: center.x + length * Math.cos(angle),
                    y: center.y + length * Math.sin(angle)
                }
            }
        },

        helper: {

            /**
             * Check if the options object has incorrect keys
             *
             * @param optionsToCheck
             * @param optionsAllowed
             * @returns {boolean}
             */
            checkOptionsObject: function (optionsToCheck, optionsAllowed) {

                let propertiesToCheck = Object.keys(optionsToCheck),
                    forbiddenProperties = [];

                for (let propertyToCheck of propertiesToCheck) {
                    if (!propertyToCheck in optionsAllowed) {
                        forbiddenProperties.push(propertyToCheck);
                    }
                }

                if (forbiddenProperties.length > 0) {
                    throw "The option object contains wrong keys: " + forbiddenProperties.join(", ");
                }

                return true;
            }
        }
    };

    return drawer;
}

/*
TODO
    * Use of Path2D for drawing methods and return the path
    * Set line width
*/