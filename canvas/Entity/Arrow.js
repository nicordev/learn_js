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
            arrow.drawer.context.rotate(arrow.direction);

            // Arrow body
            let arrowHead = {
                x: arrow.length,
                y: 0
            };

            arrow.drawer.draw.line({x:0, y:0}, arrowHead);

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
        }
    };

    return arrow;
}