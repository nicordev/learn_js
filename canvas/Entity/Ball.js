/**
 * Ball constructor
 *
 * @returns {{center: {x: number, y: number}, vector: {dx: number, dy: number}, radius: number, animator: {play: play, stop: (function(): number), start: start, drawer: *, state: {startingTimestamp: null, active: boolean, elapsedTime: number}, render: *}}}
 * @constructor
 */
function Ball(drawer, options = {}) {

    let ball = {
        center: {
            x: 15,
            y: 10
        },
        radius: 10,
        vector: {
            dx: 5,
            dy: 1,
        },
        filled: typeof options.filled != "undefined" ? options.filled : true,
        color: options.color || "rgb(0, 0, 0)",
        eraseAll: typeof options.eraseAll != "undefined" ? options.eraseAll : true,
        animator: new Animator(drawer, function () {

            if (ball.eraseAll) {
                ball.animator.drawer.erase.all();
            }
            ball.filled ? ball.animator.drawer.color.setFill(ball.color) : ball.animator.drawer.color.setStroke(ball.color);
            ball.animator.drawer.draw.circle(ball.center, ball.radius, ball.filled);

            ball.center.x += ball.vector.dx;
            ball.center.y += ball.vector.dy;

            if (ball.center.x + ball.radius > drawers[19].element.width || ball.center.x - ball.radius < 0) {
                ball.vector.dx *= -1;
            }
            if (ball.center.y + ball.radius > drawers[19].element.height || ball.center.y - ball.radius < 0) {
                ball.vector.dy *= -1;
            }
        })
    };

    if (options.withTrail && options.withTrail === true) {
        ball.animator.drawer.color.background = "rgba(255, 255, 255, 0.3)";
    }

    return ball;
}