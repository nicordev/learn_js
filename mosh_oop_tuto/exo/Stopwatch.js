function Stopwatch()
{
    let duration = 0;
    let started = false;
    let startTime = 0;

    this.start = function () {
        if (started) {
            throw Error('Stopwatch has already started.');
        }
        started = true;
        startTime = Date.now();
    }

    this.stop = function () {
        if (!started) {
            throw Error('Stopwatch is not started.');
        }
        started = false;
        duration += (Date.now() - startTime) / 1000;
        console.log(duration);
    }

    this.reset = function () {
        duration = 0;
    }

    Object.defineProperty(this, 'duration', {
        get: function () {
            return duration;
        }
    })
}

const stopwatch = new Stopwatch();