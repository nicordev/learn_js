function Arrow(drawer, options = {}) {

    let arrow = {
        initialPoint: options.initialPoint || {
            x: 50,
            y: 50
        },
        direction: options.direction || 45,
        length: options.length || 50,
        drawer: drawer,
        head: options.head || {
            width: 6,
            length: 10
        },
        animator: new Animator(drawer, () => {

            arrow.drawer.erase.all();
            arrow.draw();
        }),

        /**
         * Draw the arrow
         */
        draw: function () {

            arrow.drawer.context.save();
            arrow.drawer.context.translate(arrow.initialPoint.x, arrow.initialPoint.y);
            arrow.drawer.context.rotate(arrow.animator.drawer.convert.degToRad(arrow.direction));

            // Arrow body
            let arrowHead = {
                x: arrow.length,
                y: 0
            };

            arrow.drawer.draw.line({ x: 0, y: 0 }, arrowHead);

            // Arrow head
            arrow.drawer.draw.line(arrowHead, {
                x: arrowHead.x - arrow.head.length,
                y: arrowHead.y - arrow.head.width
            });
            arrow.drawer.draw.line(arrowHead, {
                x: arrowHead.x - arrow.head.length,
                y: arrowHead.y + arrow.head.width
            });


            arrow.drawer.context.restore();
        },

        /**
         * Set the arrow direction to face the mouse pointer
         */
        setMouseDirection: function (event) {

            let canvasRect = arrow.drawer.element.getBoundingClientRect(),
                absoluteArrowPoint = {
                    x: arrow.initialPoint.x + canvasRect.x,
                    y: arrow.initialPoint.y + canvasRect.y
                },
                dx = event.clientX - absoluteArrowPoint.x,
                dy = event.clientY - absoluteArrowPoint.y;

            arrow.direction = arrow.drawer.convert.radToDeg(Math.atan2(dy, dx));
        }
    };

    return arrow;
}