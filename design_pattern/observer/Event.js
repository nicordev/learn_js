function Event(name, parameters = {}) {
    let listeners = [];

    this.addListener = function (listener) {
        listeners.push(listener)
    }

    this.removeListener = function (listener) {
        listeners = listeners.filter(function (currentObserver) {
            if (currentObserver !== listener) {
                return currentObserver;
            }
        })
    }

    this.dispatch = function () {
        console.log(`${name} dispatched.`);
        listeners.map(function (listener) {
            listener(name, parameters);
        })
    }
}
