import {
    buildLoginForm,
    loginEvent,
    loginFailureEvent,
    logoutEvent,
    getCredentialsFromSession,
} from './js/login-component.js';
import { addFlashMessage, clearFlashMessages } from './js/flash-message.js';

const resultElement = document.getElementById('result');
const loginFormElement = buildLoginForm(
    document.getElementById('login-wrapper')
);
console.log('login form created!', loginFormElement);

loginEvent.addListener(() => {
    clearFlashMessages(resultElement);
    addFlashMessage(
        resultElement,
        JSON.stringify(getCredentialsFromSession()),
        'alert-success'
    );
    addFlashMessage(resultElement, 'LoginEvent fired!', 'alert-success');
});

loginFailureEvent.addListener(() => {
    clearFlashMessages(resultElement);
    addFlashMessage(
        resultElement,
        'Enter a username and a password.',
        'alert-warning'
    );
});

logoutEvent.addListener(() => {
    clearFlashMessages(resultElement);
    addFlashMessage(
        resultElement,
        JSON.stringify(getCredentialsFromSession()),
        'alert-success'
    );
    addFlashMessage(resultElement, 'LogoutEvent fired!', 'alert-success');
});
