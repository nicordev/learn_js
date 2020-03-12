function findInsertValues() {
    let i = 1;

    while (calculateInsertSortSpeed(i) > calculateMergeSortSpeed(i)) {
        i++;
    }

    return i;
}

function calculateInsertSortSpeed(stepCount) {
    return Math.pow(8, stepCount);
}

function calculateMergeSortSpeed(stepCount) {
    return 64 * stepCount * Math.log(stepCount);
}

console.log(findInsertValues());

function 