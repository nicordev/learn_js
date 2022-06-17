
const measures = {
    architectWidth: 0.22 * 2 + 2.93 * 2 + 0.07,
    architectNorthWidth: 0.22 + 2.56 + 0.07,
    architectSouthWidth: 0.22 + 1.93 + 0.07,
    openingWidth: 1.30,
};

measures.architectWidthSum = measures.architectNorthWidth + measures.openingWidth + measures.architectSouthWidth;

function formatMeasure(measure) {
    return measure.toFixed(2) + " m";
}

function printMeasures(measures) {
    const formattedMeasures = {};

    for (let measure in measures) {
        formattedMeasures[ measure ] = formatMeasure(measures[ measure ]);
    }

    console.log(formattedMeasures);
}

printMeasures(measures);
