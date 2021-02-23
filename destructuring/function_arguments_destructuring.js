function get(...arguments) {
    console.log('getting', arguments);
    say(arguments);
}

function say(...arguments) {
    console.log('saying', ...arguments);
}

get('hello', 'world', '!')