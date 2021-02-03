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

/**
 * Login event to execute some logic on login
 */
function LoginEvent() {
    let listeners = [];
    this.addListener = function (listener) {
        listeners.push(listener)
    }
    this.removeListener = function (listener) {
        listeners = listeners.filter((currentListener) => {
            if (currentListener !== listener) {
                return currentListener;
            }
        })
    }
    this.fire = function () {
        listeners.map(function (listener) {
            listener();
        })
    }
}

const loginEvent = new LoginEvent();

/**
 * Session storage keys
 */
const SESSION_KEY_LOGIN_USERNAME = 'login-username';
const SESSION_KEY_LOGIN_PASSWORD = 'login-password';

/**
 * Create the login form element
 *
 * @param {DomElement} wrapperElement
 */
const createLoginFormElement = (wrapperElement) => {
    wrapperElement.innerHTML = template;
    return wrapperElement.firstElementChild;
};

/**
 * Initialize login form event
 *
 * Add saveCredentialsToSession as a listener of loginEvent
 * Set loginEvent to be fired on login form submit
 *
 * @param {DomElement} formElement
 * @param {callable} onSubmitCallback
 */
const initializeLoginFormElement = (formElement) => {
    loginEvent.addListener(() => saveCredentialsToSession(formElement));
    formElement.addEventListener('submit', function (domEvent) {
        domEvent.preventDefault();
        loginEvent.fire();
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

const buildLoginForm = (wrapperElement) => {
    const loginFormElement = createLoginFormElement(wrapperElement);
    initializeLoginFormElement(loginFormElement);
    return loginFormElement;
};