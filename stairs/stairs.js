
function getStepsCount(availableHeight, stepHeight) {
    return availableHeight / stepHeight;
}

function getStairLength(stepCount, stepDepth) {
    return stepCount * stepDepth;
}

function getStairSurface(stairLength, stairWidth) {
    return stairLength * stairWidth;
}

function measureStair(availableHeight, stairWidth, stepHeight, stepDepth) {
    const stepsCount = getStepsCount(availableHeight, stepHeight);
    const stairLength = getStairLength(stepsCount, stepDepth);
    const stairSurface = getStairSurface(stairLength, stairWidth);

    return {
        stairSurface: stairSurface.toFixed(2),
        stairLength: stairLength.toFixed(2),
        stairWidth: parseFloat(stairWidth).toFixed(2),
        stepsCount: stepsCount.toFixed(1),
    };
}

function getStepComfort(stepHeight, stepDepth) {
    return stepHeight * 2 + stepDepth;
}

function isStepComfortable(stepHeight, stepDepth) {
    const comfort = getStepComfort(stepHeight, stepDepth);

    return 0.6 <= comfort && comfort <= 0.65;
}

const availableHeight = 2.7;
const stairWidth = 1;
const stepHeight = 0.18;
const stepDepth = 0.25;

console.log(measureStair(availableHeight, stairWidth, stepHeight, stepDepth));
console.log({
    stepComfort: getStepComfort(stepHeight, stepDepth).toFixed(2),
    isStepComfortable: isStepComfortable(stepHeight, stepDepth),
});
