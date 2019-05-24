/**
 * Clock constructor
 *
 * @returns {{needles: {hour: null, minute: null}, getPoint: (function(*=, *, *=, *=): {x: number, y: number}), init: init, hour: number, center: {x: number, y: number}, Needle: Needle, radius: number, animator: {play: play, stop: (function(): number), start: start, drawer: *, state: {startingTimestamp: null, active: boolean, elapsedTime: number}, render: *}, minute: number}}
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
        eraseAllBetweenFrames: true,

        Needle: function (lengthRatio, anglePerUnit) {

            let needle = {
                lengthRatio: lengthRatio,
                anglePerUnit: anglePerUnit,
                getAngle(number) {
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
                secondAngle = clock.needles.second.getAngle(clock.second) - 90;

            if (eraseAll) {
                clock.animator.drawer.erase.all();
            }
            if (clock.drawFrame) {
                clock.animator.drawer.draw.circle(clock.center, clock.radius);
            }
            clock.animator.drawer.draw.line(clock.center, clock.getPoint(hourAngle, clock.needles.hour.length, clock.center));
            clock.animator.drawer.draw.line(clock.center, clock.getPoint(minuteAngle, clock.needles.minute.length, clock.center));
            if (clock.drawSeconds) {
                clock.animator.drawer.draw.line(clock.center, clock.getPoint(secondAngle, clock.needles.second.length, clock.center));
            }
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

        getPoint: function (angle, length, center = {x: 0, y: 0}, angleInRadians = false) {

            if (!angleInRadians) {
                angle = clock.animator.drawer.convert.degToRad(angle);
            }

            return {
                x: center.x + length * Math.cos(angle),
                y: center.y + length * Math.sin(angle)
            }
        },

        init: function (
            hour = 0,
            minute = 0,
            second = 0,
            hourNeedleLengthRatio = 2/4,
            minuteNeedleLengthRatio = 2/3,
            secondNeedleLengthRatio = 2/3,
            drawSeconds = true,
            drawFrame = true,
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