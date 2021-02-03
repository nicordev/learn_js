const template = `<form id="login-form" action="#">
<div class="mb-3">
    <label class="form-label" for="login-username">Username</label>
    <input class="form-control" type="text" name="login-username" id="login-username">
</div>
<div class="mb-3">
    <label class="form-label" for="login-password">Mot de passe</label>
    <input class="form-control" type="password" name="login-password" id="login-password">
</div>
<div class="mb-3">
    <button class="btn btn-success" type="submit">Ok</button>
</div>
</form>`;

const SESSION_KEY_LOGIN_USERNAME = 'login-username';
const SESSION_KEY_LOGIN_PASSWORD = 'login-password';

const createLoginFormElement = (wrapperElement) => {
    wrapperElement.innerHTML = template;
    return wrapperElement.firstElementChild;
};

const initializeLoginFormElement = (formElement, onSubmitCallback = saveCredentialsToSession) => {
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        onSubmitCallback(event.target);
    });
    return formElement;
};

const saveCredentialsToSession = (formElement) => {
    sessionStorage.setItem(SESSION_KEY_LOGIN_USERNAME, formElement.querySelector('#login-username').value);
    sessionStorage.setItem(SESSION_KEY_LOGIN_PASSWORD, formElement.querySelector('#login-password').value);
    return formElement;
};

const getCredentialsFromSession = () => {
    return {
        username: sessionStorage.getItem(SESSION_KEY_LOGIN_USERNAME),
        password: sessionStorage.getItem(SESSION_KEY_LOGIN_PASSWORD),
    }
}

const buildLoginForm = (options) => {
    const { wrapperElement, onSubmitCallback } = options;

    const loginFormElement = createLoginFormElement(wrapperElement);
    initializeLoginFormElement(loginFormElement, onSubmitCallback);
    return loginFormElement;
};