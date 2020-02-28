const CircleUnderTheHood = new Function('radius', `this.radius = radius;
this.draw =  function () {
    console.log('Draw a circle of ' + this.radius);
}`);

let circleUnderTheHood = new CircleUnderTheHood(5932);

circleUnderTheHood.draw();

console.log(circleUnderTheHood);