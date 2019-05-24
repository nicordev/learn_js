/**
 * Ball constructor
 *
 * @returns {{center: {x: number, y: number}, vector: {dx: number, dy: number}, radius: number, animator: {play: play, stop: (function(): number), start: start, drawer: *, state: {startingTimestamp: null, active: boolean, elapsedTime: number}, render: *}}}
 * @constructor
 */
function Ball(drawer) {

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
        animator: new Animator(drawer, function () {

            ball.animator.drawer.erase.all();
            ball.animator.drawer.draw.circle(ball.center, ball.radius, true);

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

    return ball;
}
