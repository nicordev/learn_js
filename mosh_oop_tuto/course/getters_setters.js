function Myshape()
{
    let defaultLocation = {
        x: 10,
        y: 20
    };


    Object.defineProperty(this, 'defaultLocation', {
        get: function () {
            return defaultLocation;
        },
        set: function (value) {
            if (!value.x || !value.y) {
                throw Error('Invalid location.');
            }

            defaultLocation = value;
        }
    })
}

const shape = new Myshape();

console.log(shape.defaultLocation); // Call the getter
shape.defaultLocation = {x: 30, y: 40}; // Call the setter
shape.defaultLocation = 'zog'; // Throw error