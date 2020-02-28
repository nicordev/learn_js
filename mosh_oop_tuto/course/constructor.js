function Circle(radius) {
    this.radius = radius;
    this.draw =  function () {
        console.log(`Draw a circle of ${this.radius}`);
    }
}

const circleFromConstructor = new Circle(999);

circleFromConstructor.draw();