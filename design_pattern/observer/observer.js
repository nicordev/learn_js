/**
 * The subject (or event) on which we can attach observers (or listeners).
 */
function AddToCartSubject() {
    let observers = [];

    this.subscribe = function (observer) {
        observers.push(observer)
    }

    this.unsubscribe = function (observer) {
        observers = observers.filter(function (currentObserver) {
            if (currentObserver !== observer) {
                return currentObserver;
            }
        })
    }

    this.fire = function () {
        console.log('AddToCartSubject is firing...');
        observers.map(function (observer) {
            observer();
        })
    }
}

/**
 * Activate flash message display by subscribing flash message display.
 */
function activateFlashMessage(addToCartSubject) {
    addToCartSubject.subscribe(displayFlashMessage);
}

/**
 * Deactivate flash message by unsubscribing flash message display.
 */
function deactivateFlashMessage(addToCartSubject) {
    addToCartSubject.unsubscribe(displayFlashMessage)
}

/**
 * Display a flash message.
 */
function displayFlashMessage() {
    let flashMessageElement = document.getElementById('flash-message');

    flashMessageElement.textContent = '1 product added to cart!';
    setTimeout(function () {
        flashMessageElement.textContent = '';
    }, 1000)
}

/**
 * Set product elements to fire AddToCart subject on click.
 */
function initializeAddToCartSubject(addToCartSubject) {
    let productElements = document.getElementsByClassName('product');

    for (let productElement of productElements) {
        productElement.addEventListener('click', addToCartSubject.fire);
    }
}

/**
 * Let's go!
 */
function run() {
    const addToCartSubject = new AddToCartSubject();
    let cartSizeElement = document.getElementById('cart-size');

    addToCartSubject.subscribe(() => cartSizeElement.textContent++);
    activateFlashMessage(addToCartSubject);

    initializeAddToCartSubject(addToCartSubject);

    document.getElementById('flash-message-switch').addEventListener('click', function () {
        if (this.textContent === 'Turn off flash message') {
            deactivateFlashMessage(addToCartSubject)
            this.textContent = 'Turn on flash message'
        } else {
            activateFlashMessage(addToCartSubject)
            this.textContent = 'Turn off flash message'
        }
    });
}

run();