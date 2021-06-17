const flashMessageTemplate = ""
const buttonTemplate = `<button className="btn btn-primary">Ok</button>`

/**
 * Create an element using a template
 *
 * @param {DomElement} wrapperElement
 */
const appendElementFromTemplateBeforeEnd = (parentElement, template) => {
    parentElement.insertAdjacentHTML('beforeend', template);
    
    return parentElement.lastElementChild;
};

const buttonElement = appendElementFromTemplateBeforeEnd(document.body, buttonTemplate)

console.log(buttonElement);