// Destructuring

const turtle = {
    name: 'bob',
    legs: 4,
    shell: true,
    type: 'amphibious',
    meal: 10,
    diet: 'berries'
}

function feed1({ name, meal, diet }) {
    return `Feed ${name} ${meal} ${diet}<br>`;
}

function feed2(animal) {
    const { name, meal, diet } = animal;
    return `Feed ${name} ${meal} kg of ${diet}<br>`;
}

console.log(feed1(turtle));
console.log(feed2(turtle));

// Template literals

const horse = {
    name: 'Tropher',
    size: 'large',
    skills: ['jousting', 'racing'],
    age: 7
}

const { name, size, skills } = horse;

let bio = `${name} is a ${size} horse skilled in ${skills.join(' & ')}`;
console.log(bio);

function horseAge(statements, age) {
    const ageStatement = age > 5 ? 'old' : 'young';
    return `${statements[0]}${ageStatement} at ${age} years.`;
}

const bio2 = horseAge`This horse is ${horse.age}`;
console.log(bio2);

// Object.assign vs spread syntax (...)

const blackSheep = { name: 'Black sheep' };
const stats = { hp: 40, attack: 60, defense: 45 };

const level0 = Object.assign(blackSheep, stats);
const level1 = Object.assign(blackSheep, { hp: 75 });

console.log({ blackSheep, level0, level1 });

const whiteSheep = { name: 'White sheep' };
const level2 = { ...whiteSheep, ...stats }; // Apply from left to right

console.log({ whiteSheep, level2 });

// Array push with spread syntax

const roxane = ['dog'];
const animals = ['wolf', ...roxane, 'bird'];
const insects = ['bee', 'hornet', 'fly'];
console.log(animals);
console.log([...animals, ...insects]);