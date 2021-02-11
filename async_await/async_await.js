async function getNumber1() {
    return 10;
}

async function getNumber2() {
    return 4;
}

async function compute() {
    const number1 = await getNumber1();
    const number2 = await getNumber2();

    return number1 + number2;
}

compute().then((result) => console.log(`Sum is ${result}`));
