function tryGeolocation() {
    if (isGeolocationAvailable()) {
        console.log('The bird is flying!');
    } else {
        console.warn('The clouds are too thick.');
    }

    const sayWhereTheUserIs = function (position) {
        console.log('Here you are !', position);
    }
    const sayWeCanNotFindYou = function (error) {
        console.log('We can not find you!', error);
    }
    let geolocationId = startGeolocation(sayWhereTheUserIs, sayWeCanNotFindYou);

    setTimeout(stopGeolocation, 3000, geolocationId);
}

function tryGeolocator() {
    const geolocator = new Geolocator();

    const geolocationIsAvailable = geolocator.isGeolocationAvailable();

    if (!geolocationIsAvailable) {
        console.warn('Geolocation is not available.');
    } else {
        console.log('Geolocation available.');
    }

    geolocator.watchPosition(
        (position) => console.log('watching...', position),
        (error) => console.log('geolocation error!', error),
        3000
    );
}

console.log('Trying geolocation.js...');

tryGeolocation();

setTimeout(() => {
    console.log('Trying Geolocator.js...');
    tryGeolocator();
}, 5000);