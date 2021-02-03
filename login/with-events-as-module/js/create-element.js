/**
 * Create an element using a template
 *
 * @param {DomElement} wrapperElement
 */
export const createElementFromTemplate = (wrapperElement, template) => {
    wrapperElement.insertAdjacentHTML('afterbegin', template);
    return wrapperElement.firstElementChild;
};