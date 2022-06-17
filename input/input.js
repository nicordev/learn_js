function askName() {
    const name = window.prompt("What is your name?", 'world');

    return name;
}

function main() {
    const resultElement = document.createElement('div');
    document.body.appendChild(resultElement);

    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'ask';
    buttonElement.addEventListener('click', function (event) {
        const name = askName();
        resultElement.textContent = `hello ${name}`;
    });
    document.body.appendChild(buttonElement);
}

main();
