import { createElementFromTemplate } from './create-element.js';

const loginFlashMessageTemplate = `<div class="login-flash-message alert"></div>`;

export const addFlashMessage = (wrapperElement, message, htmlClass) => {
    const flashMessageElement = createElementFromTemplate(
        wrapperElement,
        loginFlashMessageTemplate
    );

    flashMessageElement.textContent = message;
    flashMessageElement.classList.add(htmlClass);
    flashMessageElement.addEventListener('click', function (domEvent) {
        this.remove();
    });

    return flashMessageElement;
};

export const clearFlashMessages = (wrapperElement) =>
    (wrapperElement.innerHTML = '');
