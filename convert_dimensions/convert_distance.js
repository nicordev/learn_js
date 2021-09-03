/**
 * px == cm * (96 / 2.54)
 */
function convertCentimeterToPixel(value) {
    return value * (96 / 2.54);
}

function convertMillimeterToPixel(value) {
    return value * (96 / 25.4);
}

function convertMeterToPixel(value) {
    return value * (96 / 25.4 * 1000);
}
