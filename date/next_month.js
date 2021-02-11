const getNextMonth = (date) => {
    const nextMonth = new Date(date.getFullYear(), 1, 1);

    nextMonth.setMonth(date.getMonth() + 1);

    return nextMonth;
};

const currentMonth = new Date(2020, 8, 13);
const nextMonth = getNextMonth(currentMonth);

console.log('Current month is: ', currentMonth);
console.log('Next month is: ', nextMonth);

