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

        animator: new Animator(drawer, () => {

            clock.incrementTime();
            clock.drawTime(clock.eraseAllBetweenFrames);
        }),

        init: function (
            hour = 0,
            minute = 0,
            second = 0,
            drawSeconds = true,
            drawFrame = true,
            hourNeedleLengthRatio = 2/4,
            minuteNeedleLengthRatio = 2/3,
            secondNeedleLengthRatio = 2/3,
            refreshRate = 1000 // Milliseconds between 2 seconds
        ) {

            clock.hour = hour;
            clock.minute = minute;
            clock.second = second;

            clock.animator.state.refreshRate = refreshRate;

            clock.needles.hour = new clock.Needle(hourNeedleLengthRatio, 30);
            clock.needles.minute = new clock.Needle(minuteNeedleLengthRatio, 6);
            clock.needles.second = new clock.Needle(secondNeedleLengthRatio, 6);

            clock.needles.hour.length = hourNeedleLengthRatio * clock.radius;
            clock.needles.minute.length = minuteNeedleLengthRatio * clock.radius;
            clock.needles.second.length = secondNeedleLengthRatio * clock.radius;

            clock.drawSeconds = drawSeconds;
            clock.drawFrame = drawFrame;
        }
    };

    return clock;
}