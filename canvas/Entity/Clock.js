/**
 * Clock constructor
 *
 * @returns {{needles: {hour: null, minute: null, second: null}, init: init, frameColor: string, center: {x: number, y: number}, drawTime: drawTime, eraseAllBetweenFrames: boolean, minute: number, second: number, drawSeconds: boolean, incrementTime: incrementTime, hour: number, drawFrame: boolean, Needle: (function(*=, *=, *=): {color: string, getAngle: (function(*): number), lengthRatio: *, anglePerUnit: *}), radius: number, animator: {play: play, stop: (function(): number), start: start, drawer: *, state: {startingTimestamp: null, active: boolean, elapsedTime: number}, render: *}}}
 * @constructor
 */
function Clock(drawer, center = {x: 100, y: 100}, radius = 50) {

    let clock = {
        hour: 0,
        minute: 0,
        second: 0,
        radius: radius,
        center: center,
        drawSeconds: true,
        drawFrame: true,
        frameColor: "rgb(0, 0, 0)",
        eraseAllBetweenFrames: true,
        realTime: true,

        Needle: function (lengthRatio, anglePerUnit, color = "rgb(0, 0, 0)") {

            let needle = {
                lengthRatio: lengthRatio,
                anglePerUnit: anglePerUnit,
                color: color,
                getAngle: function (number) {
                    return number * needle.anglePerUnit;
                }
            };

            return needle;
        },

        needles: {
            hour: null,
            minute: null,
            second: null,
        },

        drawTime: function (eraseAll = false) {

            let hourAngle = clock.needles.hour.getAngle(clock.hour) - 90, // -90 to rotate to the right needle position on the clock
                minuteAngle = clock.needles.minute.getAngle(clock.minute) - 90,
                secondAngle = clock.needles.second.getAngle(clock.second) - 90,
                strokeColor = clock.animator.drawer.color.stroke;

            if (eraseAll) {
                clock.animator.drawer.erase.all();
            }

            if (clock.drawFrame) {
                clock.animator.drawer.color.setStroke(clock.frameColor);
                clock.animator.drawer.draw.circle(clock.center, clock.radius);
            }

            clock.animator.drawer.color.setStroke(clock.needles.hour.color);
            clock.animator.drawer.draw.lineFromAngle(clock.center, clock.needles.hour.length, hourAngle, false);

            clock.animator.drawer.color.setStroke(clock.needles.minute.color);
            clock.animator.drawer.draw.lineFromAngle(clock.center, clock.needles.minute.length, minuteAngle, false);

            if (clock.drawSeconds) {
                clock.animator.drawer.color.setStroke(clock.needles.second.color);
                clock.animator.drawer.draw.lineFromAngle(clock.center, clock.needles.second.length, secondAngle, false);
            }

            // Come back to the initial stroke color value
            clock.animator.drawer.color.setStroke(strokeColor);
        },

        incrementTime: function () {

            clock.second++;

            if (clock.second >= 60) {
                clock.second = 0;
                clock.minute++;
            }

            if (clock.minute >= 60) {
                clock.minute = 0;
                clock.hour++;
            }

            if (clock.hour >= 12) {
                clock.hour = 0;
            }
        },

        setCurrentTime: function () {

            let now = new Date();

            clock.hour = now.getHours();
            clock.minute = now.getMinutes();
            clock.second = now.getSeconds();
        },

        animator: new Animator(drawer, () => {

            if (clock.realTime) {
                clock.setCurrentTime();

            } else {
                clock.incrementTime();
            }
            clock.drawTime(clock.eraseAllBetweenFrames);
        }),

        init: function (
            options = {}
        ) {

            let hourNeedleLengthRatio = options.hourNeedleLengthRatio || 2/4,
                minuteNeedleLengthRatio = options.minuteNeedleLengthRatio || 2/3,
                secondNeedleLengthRatio = options.secondNeedleLengthRatio || 2/3;

            clock.hour = options.hour || 0;
            clock.minute = options.minute || 0;
            clock.second = options.second || 0;

            clock.animator.state.refreshRate = options.refreshRate || 1000; // Milliseconds between 2 seconds

            clock.needles.hour = new clock.Needle(hourNeedleLengthRatio, 30);
            clock.needles.minute = new clock.Needle(minuteNeedleLengthRatio, 6);
            clock.needles.second = new clock.Needle(secondNeedleLengthRatio, 6);

            clock.needles.hour.length = hourNeedleLengthRatio * clock.radius;
            clock.needles.minute.length = minuteNeedleLengthRatio * clock.radius;
            clock.needles.second.length = secondNeedleLengthRatio * clock.radius;

            clock.drawSeconds = typeof options.drawSeconds != "undefined" ? options.drawSeconds : true;
            clock.drawFrame = typeof options.drawFrame != "undefined" ? options.drawFrame : true;
            
            if (options.secondNeedleColor) {
                clock.needles.second.color = options.secondNeedleColor;
            }
            if (options.minuteNeedleColor) {
                clock.needles.minute.color = options.minuteNeedleColor;
            }
            if (options.hourNeedleColor) {
                clock.needles.hour.color = options.hourNeedleColor;
            }
            if (options.frameColor) {
                clock.frameColor = options.frameColor;
            }
            if (options.realTime) {
                clock.realTime = options.realTime;
            }
        }
    };

    return clock;
}

/*
TODO
    * Correct hours when > 12
    * Improve options objects by looping into it and throw exceptions if properties do not exist
    * Draw numbers and lines around the clock frame
 */