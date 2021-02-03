export const STOP_PROPAGATION = 'stop';

export function Event() {
    let listeners = [];
    this.addListener = function (listener) {
        listeners.push(listener);
    };
    this.removeListener = function (listener) {
        listeners = listeners.filter((currentListener) => {
            if (currentListener !== listener) {
                return currentListener;
            }
        });
    };
    this.fire = function () {
        for (const listener of listeners) {
            if (STOP_PROPAGATION === listener()) {
                break;
            }
        }
    };
}