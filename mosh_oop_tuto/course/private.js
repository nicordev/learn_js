startTimefunction PrivateCircle(radius) {
    // Private
    let defaultLocation = {
        x: 2,
        y: 4
    }
    let computeOptimumLocation = function (factor) {
        console.log(factor, defaultLocation.x, defaultLocation.y); // Closure can acess private variables.
    }

    // Public
    this.radius = radius;
    this.draw = function () {
        computeOptimumLocation('zog');
        console.log('draw...');
    }
}

const privateCircle = new PrivateCircle(10);

privateCircle.draw();