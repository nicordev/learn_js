function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.addEventListener('click', function (event) {
        this.remove();
    });
    document.getElementById('flash-message').appendChild(messageElement);
}

function displayData() {
    const dataElement = document.getElementById('data');

    dataElement.innerHTML = '';

    const transaction = database.transaction(['note'], 'readwrite');

    transaction.onerror = showMessage(
        `Could not display data due to error ${transaction.error}`
    );

    const objectStore = transaction.objectStore('note');
    const requestAllNotes = objectStore.getAll();
    let notes = [];

    requestAllNotes.onsuccess = function (event) {
        notes = requestAllNotes.result;
        console.log({ notes });
    };
}

function fillDatabase(data) {
    console.log('Filling database...');

    const transaction = database.transaction(['note'], 'readwrite');

    transaction.onerror = showMessage(
        `Could not fill database due to error ${transaction.error}`
    );

    transaction.oncomplete = function () {
        displayData();
        showMessage('Database filled.');
    };

    const objectStore = transaction.objectStore('note');

    data.map((element) => {
        console.log(element);
        let addRequest = objectStore.add(element);
        addRequest.onsuccess = (event) => showMessage('Added a note.');
    });
}

function deleteDatabase(databaseName) {
    console.log('Deleting database...');

    let deleteDatabaseRequest = indexedDB.deleteDatabase(databaseName);

    deleteDatabaseRequest.onerror = function (event) {
        console.log('Error while deleting database.');
    };

    deleteDatabaseRequest.onsuccess = function (event) {
        console.log('Database deleted successfully');

        console.log(event.result); // should be undefined
    };
}

let database = null;
const databaseName = 'learn_indexeddb_database';

const requestOpenDatabase = window.indexedDB.open(databaseName, 1);

requestOpenDatabase.onerror = (event) =>
    showMessage('Error while opening the database.');

requestOpenDatabase.onsuccess = (event) => {
    showMessage('Success! Database initialized.');
    database = requestOpenDatabase.result;
    displayData();
};

// This event handles the event whereby a new version of the database needs to be created
// Either one has not been created before, or a new version number has been submitted via the
// window.indexedDB.open line above
requestOpenDatabase.onupgradeneeded = (event) => {
    let currentDatabase = event.target.result;

    currentDatabase.onerror = (event) => showMessage('Error loading database.');

    let objectStore = currentDatabase.createObjectStore('note');

    objectStore.createIndex('title', 'title');

    showMessage('Object store created.');
};

function Note(title) {
    return { title };
}

document
    .getElementById('database-delete')
    .addEventListener('click', function (event) {
        deleteDatabase(databaseName);
    });
document
    .getElementById('fill-database')
    .addEventListener('click', function (event) {
        notes = [
            new Note('Hello World!'),
            new Note('Buy some apples.'),
            new Note('Code awesome stuff.'),
        ];
        fillDatabase(notes);
    });
