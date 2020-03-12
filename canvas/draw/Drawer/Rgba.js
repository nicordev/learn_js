/**
 * Return an object to generate css rgba() code.
 */
function RgbaGenerator (red, green, blue, transparency = 1) {
    return {
        red: red,
        green: green,
        blue: blue,
        transparency: transparency,
        get rgba() {
            return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.transparency + ")";
        }
    }
}