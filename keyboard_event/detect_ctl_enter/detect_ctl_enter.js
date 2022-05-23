class Keyboard {
    #pressedKeys = {
        "Control": false,
        "Enter": false,
    };
    #hasActionBeenDone = false;
    #actionOnControlEnterPressed;

    constructor(actionOnControlEnterPressed) {
        this.actionOnControlEnterPressed = actionOnControlEnterPressed;
    }

    refresh(event) {
        if (this.#isKeydownEvent(event) && Object.keys(this.#pressedKeys).includes(event.key)) {
            this.#pressedKeys[ event.key ] = true;
        }

        if (this.#isKeyupEvent(event) && Object.keys(this.#pressedKeys).includes(event.key)) {
            this.#pressedKeys[ event.key ] = false;
        }

        if (false === this.#isControlEnterPressed()) {
            this.#hasActionBeenDone = false;
        }

        if (this.#hasActionBeenDone || false === this.#isControlEnterPressed()) {
            return;
        }

        this.actionOnControlEnterPressed();
        this.#hasActionBeenDone = true;
    }

    #isControlEnterPressed() {
        return this.#pressedKeys.Enter && this.#pressedKeys.Control;
    }

    #isKeydownEvent(event) {
        return 'keydown' === event.type;
    }

    #isKeyupEvent(event) {
        return 'keyup' === event.type;
    }
}

function initializeCtlEnterDetection(actionOnControlEnterPressed) {
    const keyboard = new Keyboard(actionOnControlEnterPressed);

    document.addEventListener('keydown', function (event) {
        keyboard.refresh(event);
    });
    document.addEventListener('keyup', function (event) {
        keyboard.refresh(event);
    });
}

initializeCtlEnterDetection(function () {
    console.log('ctl + enter pressed');
});
