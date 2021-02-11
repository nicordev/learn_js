const getNextMonth = (date) => {
    const nextMonth = new Date(date.getFullYear(), 1, 1);

    nextMonth.setMonth(date.getMonth() + 1);

    return nextMonth;
};

const concatenateYearMonth = (date) => {
    return `${date.getFullYear()}` + `${date.getMonth()}`.padStart(2, 0);
};

const getMonthInterval = (firstDate, lastDate) => {
    if (lastDate < firstDate) {
        throw Error('lastDate can not be before firstDate');
    }

    let currentMonth = firstDate;
    let nextMonth = undefined;
    const months = [currentMonth];

    do {
        nextMonth = getNextMonth(currentMonth);
        months.push(nextMonth);
        currentMonth = nextMonth;
    } while (
        concatenateYearMonth(currentMonth) < concatenateYearMonth(lastDate)
    );

    return months;
};

//
// Test
//

function assertEquals(expected, actual) {
    if (expected !== actual) {
        console.error(`${expected} is not equal to ${actual}`);

        return;
    }

    console.log(`Success: ${expected} is equal to ${actual}`);
}

function testGetMonthInterval() {
    const firstDate = new Date(2021, 0, 12);
    const lastDate = new Date(2021, 5, 30);
    const months = getMonthInterval(firstDate, lastDate);

    console.log({ firstDate, lastDate, months });
    assertEquals(6, months.length);
    assertEquals(lastDate.getMonth(), months[months.length - 1].getMonth());
}

function testGetMonthIntervalDifferentYears() {
    const firstDate = new Date(2020, 8, 12);
    const lastDate = new Date(2021, 5, 30);
    const months = getMonthInterval(firstDate, lastDate);

    console.log({ firstDate, lastDate, months });
    assertEquals(10, months.length);
    assertEquals(lastDate.getMonth(), months[months.length - 1].getMonth());
}

testGetMonthInterval();
testGetMonthIntervalDifferentYears();
