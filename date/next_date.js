const getNextDate = (date) => {
    const tomorrow = new Date(date.getFullYear(), date.getMonth(), 1);

    tomorrow.setDate(date.getDate() + 1);

    return tomorrow;
};

const today = new Date(2021, 1, 28);
const tomorrow = getNextDate(today);

console.log('Today is: ', today);
console.log('Tomorrow is: ', tomorrow);
