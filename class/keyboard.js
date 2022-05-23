class Key {
    key;
    isPressed = false;

    constructor(key) {
        this.key = key;
    }
}

class Keyboard {
    keys = [];

    constructor(...keys) {
        this.keys = keys;
    }

    isKeyExists(key) {
        return [] !== this.keys.filter();
    }
}

function createKeyboard() {
    const ctlKey = new Key('Control');
    const enterKey = new Key('Enter');

    return new Keyboard(ctlKey, enterKey);
}

const keyboard = createKeyboard();

console.log(keyboard);
