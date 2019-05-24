/**
 * Animator constructor
 *
 * @param drawer
 * @param render
 * @returns {{play: play, stop: (function(): number), start: start, drawer: *, state: {startingTimestamp: null, active: boolean, elapsedTime: number}, render: *}}
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
         * Information on the current animation
         */
        state: {
            /**
             * Boolean used to continue the animation
             */
            active: false,
            /**
             * Starting timestamp
             */
            startingTimestamp: null,
            /**
             * Elapsed time
             */
            elapsedTime: 0.0,
            /**
             * Delay before next frame
             */
            refreshRate: 0,
            /**
             * Previous timestamp
             */
            previousTimestamp: null
        },

        /**
         * Play the animation
         */
        play: function (timestamp) {

            // Elapsed time
            if (!animator.state.startingTimestamp) {
                animator.state.startingTimestamp = timestamp;
            }
            animator.state.elapsedTime = timestamp - animator.state.startingTimestamp;

            // Next frame
            if (!animator.state.previousTimestamp || timestamp - animator.state.previousTimestamp >= animator.state.refreshRate) {
                animator.state.previousTimestamp = timestamp;
                animator.render(animator.state.elapsedTime); // We pass the elapsed time to the render function
            }

            if (animator.state.active) {
                requestAnimationFrame(animator.play);
            }
        },

        /**
         * Stop the animation and return the elapsed time
         */
        stop: function () {

            let elapsedTime = animator.state.elapsedTime;

            animator.state.active = false;
            animator.state.startingTimestamp = null;
            animator.state.elapsedTime = 0.0;
            animator.state.previousTimestamp = null;

            return elapsedTime;
        },

        /**
         * Start the animation
         */
        start: function () {

            animator.state.active = true;
            animator.play();
        }
    };

    return animator;
}