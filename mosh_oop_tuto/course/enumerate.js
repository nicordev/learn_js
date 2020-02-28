function enumerate(targetObject) {
    console.log('Enumerate...');

    for (let key in targetObject) {
        console.log(targetObject[key]);
    }

    console.log('Enumeration done.');
}

function enumerateProperties(targetObject) {
    console.log('Enumerate...');

    for (let key in targetObject) {
        if ('function' !== typeof targetObject[key])
            console.log(targetObject[key]);
    }

    console.log('Enumeration done.');
}

if ('undefined' !== typeof circle) {
    enumerateProperties(circle);
}

const circleKeys = Object.keys(circle);

console.log(circleKeys);

if ('radius' in circle) {
    console.log('circle has a radius.');
}