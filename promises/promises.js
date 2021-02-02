const createMessagesWrapperElement = () => {
    const wrapperElement = document.createElement('div');
    wrapperElement.classList.add('message-wrapper');
    console.log('creating wrapper element...');
    return wrapperElement;
};

const createMessageElement = (message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    console.log('creating message element...');
    return messageElement;
};

const addElementToBody = (element) => {
    console.log('appending element...');
    document.body.appendChild(element);
    return element;
};

const initialFunctionExecutedOnSuccess = () => {
    console.log("Let's go!");
    return createMessagesWrapperElement();
};
const initialFunctionExecutedOnError = () => {
    throw Error('Error at the beginning...');
    console.log('this statement is never reached');
};

const handleFailure = (error) => console.log('From the catch function:', error);

const tryWithAnError = false;

const build = new Promise((myResolveFunction, myRejectFunction) => {
    if (tryWithAnError) {
        myRejectFunction();
    }
    myResolveFunction();
});

addElementToBody(createMessageElement('Try Promise...'));

build
    .then(initialFunctionExecutedOnSuccess, initialFunctionExecutedOnError)
    .then((wrapperElement) => {
        wrapperElement.appendChild(createMessageElement('Hello World!'));
        return wrapperElement;
    })
    .then(addElementToBody)
    .then((element) => console.log('Success! Message added!', element))
    .catch(handleFailure);

addElementToBody(createMessageElement('Is it working?'));
