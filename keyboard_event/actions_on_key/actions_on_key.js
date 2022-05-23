class KeyCombination {
    #actionOnCombinationPressed = () => console.log(this.#keys);
    #keys = {};
    #hasActionBeenExecuted = false;

    constructor(keys, actionOnCombinationPressed) {
        keys.map(key => this.#keys[ key ] = false);

        if (actionOnCombinationPressed) {
            this.#actionOnCombinationPressed = actionOnCombinationPressed;
        }
    }

    refresh(eventType, key) {
        if (false === [ 'keydown', 'keyup' ].includes(eventType)) {
            return;
        }

        if ('keydown' === eventType) {
            this.#keys[ key ] = true;
            return;
        }

        this.#keys[ key ] = false;
    }

    executeAction() {
        const isPressed = this.#isPressed();

        if (false === isPressed) {
            this.#hasActionBeenExecuted = false;

            return;
        }

        if (true === this.#hasActionBeenExecuted) {

            return;
        }

        this.#actionOnCombinationPressed();
        this.#hasActionBeenExecuted = true;
    }

    #isPressed() {
        return Object.values(this.#keys).reduce((previousKeyState, currentKeyState) => (previousKeyState && currentKeyState));
    }
}

class Keyboard {
    #keyCombinations = [];

    constructor(...keyCombinations) {
        this.#keyCombinations = keyCombinations;
    }

    refresh(event) {
        this.#keyCombinations.forEach(keyCombination => {
            keyCombination.refresh(event.type, event.key);
            keyCombination.executeAction();
        });
    }

    attachTo(element) {
        const keyboard = this;

        element.addEventListener('keydown', function (event) {
            keyboard.refresh(event);
        });
        element.addEventListener('keyup', function (event) {
            keyboard.refresh(event);
        });
    }
}

function initializeCtlEnterDetection(actionOnControlEnterPressed) {
    const controlEnterCombination = new KeyCombination([ 'Control', 'Enter' ], actionOnControlEnterPressed);
    const keyboard = new Keyboard(controlEnterCombination);
    keyboard.attachTo(document);
}

initializeCtlEnterDetection(function () {
    console.log('ctl + enter pressed');
});
