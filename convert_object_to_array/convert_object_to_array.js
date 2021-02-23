const daysAsObject = {
    0: new Date(2021, 2, 12),
    1: new Date(2021, 3, 12),
    2: new Date(2021, 4, 12),
}

const daysAsArray = Object.values(daysAsObject);

console.log(daysAsArray);

const dayKeysAsArray = Object.keys(daysAsObject);

console.log(dayKeysAsArray);

const entries = Object.entries(daysAsObject);

console.log(entries);