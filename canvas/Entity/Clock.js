/**
 * Clock constructor
 *
 * @returns {{needles: {hour: null, minute: null}, getPoint: (function(*=, *, *=, *=): {x: number, y: number}), init: init, hour: number, center: {x: number, y: number}, Needle: Needle, radius: number, animator: {play: play, stop: (function(): number), start: start, drawer: *, state: {startingTimestamp: null, active: boolean, elapsedTime: number}, render: *}, minute: number}}
 * @constructor
 */
function Clock(center = {x: 100, y: 100}, radius = 50) {

    let clock = {
        hour: 0,
        minute: 0,
        radius: radius,
        center: center,

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
            minute: null
        },

        animator: new Animator(drawers[21], (elapsedTime) => {

            clock.minute++;

            if (clock.minute >= 60) {
                clock.minute = 0;
                clock.hour++;
            }

            if (clock.hour >= 12) {
                clock.hour = 0;
            }

            let hourAngle = clock.needles.hour.getAngle(clock.hour) - 90, // -90 to rotate to the right needle position on the clock
                minuteAngle = clock.needles.minute.getAngle(clock.minute) - 90;

            clock.animator.drawer.erase.all();
            clock.animator.drawer.draw.circle(clock.center, clock.radius);
            clock.animator.drawer.draw.line(clock.center, clock.getPoint(hourAngle, clock.needles.hour.length, clock.center));
            clock.animator.drawer.draw.line(clock.center, clock.getPoint(minuteAngle, clock.needles.minute.length, clock.center));
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

        init: function (hour = 0, minute = 0, hourNeedleLengthRatio = 2/4, minuteNeedleLengthRatio = 2/3) {

            clock.hour = hour;
            clock.minute = minute;
            clock.needles.hour = new clock.Needle(hourNeedleLengthRatio, 30);
            clock.needles.minute = new clock.Needle(minuteNeedleLengthRatio, 6);
            clock.needles.hour.length = hourNeedleLengthRatio * clock.radius;
            clock.needles.minute.length = minuteNeedleLengthRatio * clock.radius;
        }
    };

    return clock;
}