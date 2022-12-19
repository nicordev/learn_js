const getRange = (currentAnnualRawSalary, expectedAnnualRawSalary) => {
    const currentMonthlyRawSalary = currentAnnualRawSalary / 12;
    const expectedMonthlyRawSalary = expectedAnnualRawSalary / 12;

    const range = expectedMonthlyRawSalary - currentMonthlyRawSalary;

    if (range < 0) {
        return -range;
    }

    return range;
};

const getStats = () => {
    const monthlyRange = getRange(35000, 40000).toFixed(0);
    const annualRange = monthlyRange * 12;

    console.log({
        monthlyRange,
        annualRange
    });
};

getStats();