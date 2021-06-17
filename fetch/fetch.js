function fetchUsingGet(url) {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }).then((response) => console.log(response));
}

function fetchImage() {
    const imageElement = document.createElement('img');
    document.body.appendChild(imageElement);

    fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
        .then(response => response.blob())
        .then(response => {
            const objectURL = URL.createObjectURL(response);
            imageElement.src = objectURL;
        });
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const jsonPlaceHolderPostUrl = 'https://jsonplaceholder.typicode.com/posts';
const methodGetTargets = [
    'https://developer.mozilla.org', // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin
    'https://jsonplaceholder.typicode.com/todos/1',
];

methodGetTargets.forEach(fetchUsingGet);

postData(jsonPlaceHolderPostUrl, {
    title: 'Hello World!',
    body: 'Have a nice day!',
    userId: 1,
}).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
});

fetch(`data/data.json`).then((data) => console.log(data)); // CORS error

fetchImage();