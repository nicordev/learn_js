function ColorHandler() {

    let colorHandler = {

        random: function () {

            let red = colorHandler._randomValue(),
                green = colorHandler._randomValue(),
                blue = colorHandler._randomValue();

            return new ColorRGBA(red, green, blue);
        },

        _randomValue() {
            return Math.floor(Math.random() * 255);
        }
    };

    return colorHandler;
}

function ColorRGBA(red = 0, green = 0, blue = 0, transparency = 1) {

    let color = {
        red: red,
        green: green,
        blue: blue,
        transparency: transparency,
        toString: function () {

            return "rgba(" + color.red + ", " + color.green + ", " + color.blue + ", " + color.transparency + ")";
        }
    };

    return color;
}