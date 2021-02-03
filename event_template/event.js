function Event(name) {
    const that = this;
    let listeners = [];
    this.name = name;
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
        listeners.map(function (listener) {
            listener(that);
        });
    };
}

const greetEvent = new Event('greet');
const askEvent = new Event('ask');
const endEvent = new Event('end');

greetEvent.addListener((event) => console.log(event.name));
askEvent.addListener((event) => console.log(event.name));
endEvent.addListener((event) => console.log(event.name));

greetEvent.myCustomProperty = 'sarah';

greetEvent.addListener((event) => console.log(`Hello ${greetEvent.myCustomProperty}!`));
askEvent.addListener((event) => console.log('How are you?'));
endEvent.addListener((event) => console.log('See ya!'));

greetEvent.fire();
askEvent.fire();
endEvent.fire();
