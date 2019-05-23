/**
 * Animator constructor
 *
 * @param drawer
 * @param render
 * @returns {{play: play, stop: stop, drawer: *, active: boolean, render: *}}
 * @constructor
 */
function Animator(drawer, render) {

    let animator = {

        /**
         * Drawer object to draw stuff
         */
        drawer: drawer,
        /**
         * Render callback function used to draw the next frame and stop when needed
         */
        render: render,
        /**
         * Boolean used to continue the animation
         */
        active: true,

        /**
         * Begin the animation
         */
        play: function () {

            animator.render();

            if (animator.active) {
                requestAnimationFrame(animator.play);
            }
        },

        /**
         * Stop the animation
         */
        stop: function () {

            animator.active = false;
        },

        /**
         * Restart the animation after a stop
         */
        replay: function () {

            animator.active = true;
            animator.play();
        }
    };

    return animator;
}