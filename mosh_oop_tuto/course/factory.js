function createCircle(radius) {
    return {
        radius,
        draw: function () {
            console.log(`Draw a circle of ${this.radius}`);
        }
    }
}

const circle = createCircle(10);

circle.draw();
