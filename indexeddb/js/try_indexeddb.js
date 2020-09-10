function createRequestOnDatabase(
    databaseName,
    databaseVersion,
    onSuccessCallback,
    onUpgradeNeededCallback,
    onErrorCallback
) {
    const requestOnDatabase = indexedDB.open(databaseName, databaseVersion);

    requestOnDatabase.onsuccess = onSuccessCallback;
    requestOnDatabase.onerror = onErrorCallback;
    requestOnDatabase.onupgradeneeded = onUpgradeNeededCallback;

    return requestOnDatabase;
}

function handleSuccess(event) {
    const database = event.target.result;
    console.log('Success creating/accessing IndexedDB database');
    console.log(database);
}

function handleError(event) {
    console.error('Error from indexeddb');
    console.log(event);
}

function saveCustomerData(event) {
    const database = event.target.result;
    const objectStore = database.createObjectStore('customer', {
        keyPath: 'socialSecurityNumber',
    });

    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });

    objectStore.transaction.oncomplete = function (event) {
        console.log('saveCustomerData transaction completed.');
        const customerObjectStore = database
            .transaction('customer', 'readwrite')
            .objectStore('customer');

        customerData.forEach((customer) => customerObjectStore.add(customer));
    };
}

const customerData = [
    {
        socialSecurityNumber: '444-44-4444',
        name: 'Bill',
        age: 35,
        email: 'bill@company.com',
    },
    {
        socialSecurityNumber: '555-55-5555',
        name: 'Donna',
        age: 32,
        email: 'donna@home.org',
    },
];
const customerDatabaseName = 'mdn_tutorial_customer_database';

const fillCustomerDatabaseRequest = createRequestOnDatabase(
    customerDatabaseName,
    1,
    handleSuccess,
    saveCustomerData,
    handleError
);

console.log(fillCustomerDatabaseRequest);

let deleteDatabaseRequest = indexedDB.deleteDatabase(customerDatabaseName);

deleteDatabaseRequest.onerror = function (event) {
    console.log('Error while deleting database.');
};

deleteDatabaseRequest.onsuccess = function (event) {
    console.log('Database deleted successfully');

    console.log(event.result); // should be undefined
};
