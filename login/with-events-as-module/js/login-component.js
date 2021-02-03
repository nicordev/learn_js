import { createElementFromTemplate } from './create-element.js';
import { Event } from './Event.js';

const loginFormTemplate = `<form id="login-form" action="#">
<div class="mb-3">
    <label class="form-label" for="login-username">Username</label>
    <input class="form-control" type="text" name="login-username" id="login-username">
</div>
<div class="mb-3">
    <label class="form-label" for="login-password">Password</label>
    <input class="form-control" type="password" name="login-password" id="login-password">
</div>
<div class="mb-3">
    <button class="btn btn-success" type="submit">Ok</button>
</div>
</form>

<button id="logout-button" style="display: none;">Logout</button>`;

/**
 * Login event to execute some logic on login
 */
export const loginEvent = new Event();
export const loginFailureEvent = new Event();
export const logoutEvent = new Event();

/**
 * Session storage keys
 */
export const SESSION_KEY_LOGIN_USERNAME = 'login-username';
export const SESSION_KEY_LOGIN_PASSWORD = 'login-password';

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
    const logoutButtonElement = document.getElementById('logout-button');

    loginEvent.addListener(() => saveCredentialsToSession(formElement));
    loginEvent.addListener(() => {
        formElement.style.display = 'none';
    });
    loginEvent.addListener(() => (logoutButtonElement.style.display = 'block'));

    logoutEvent.addListener(() => removeCredentialsFromSession());
    logoutEvent.addListener(() => (formElement.style.display = 'block'));
    logoutEvent.addListener(() => (logoutButtonElement.style.display = 'none'));

    formElement.addEventListener('submit', function (domEvent) {
        domEvent.preventDefault();
        loginEvent.fire();
    });
    logoutButtonElement.addEventListener('click', () => logoutEvent.fire());

    return formElement;
};

export const saveCredentialsToSession = (formElement) => {
    const username = formElement.querySelector('#login-username').value;
    const password = formElement.querySelector('#login-password').value;

    if (!username || !password) {
        loginFailureEvent.fire();

        return STOP_PROPAGATION;
    }

    sessionStorage.setItem(SESSION_KEY_LOGIN_USERNAME, username);
    sessionStorage.setItem(SESSION_KEY_LOGIN_PASSWORD, password);

    return formElement;
};

export const removeCredentialsFromSession = () => {
    sessionStorage.removeItem(SESSION_KEY_LOGIN_USERNAME);
    sessionStorage.removeItem(SESSION_KEY_LOGIN_PASSWORD);
};

export const getCredentialsFromSession = () => {
    return {
        username: sessionStorage.getItem(SESSION_KEY_LOGIN_USERNAME),
        password: sessionStorage.getItem(SESSION_KEY_LOGIN_PASSWORD),
    };
};

export const buildLoginForm = (wrapperElement) => {
    const loginFormElement = createElementFromTemplate(
        wrapperElement,
        loginFormTemplate
    );
    initializeLoginFormElement(loginFormElement);
    return loginFormElement;
};
