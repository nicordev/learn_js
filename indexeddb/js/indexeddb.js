(function () {
    const databaseVersion = 1;
    const openDatabaseRequest = indexedDB.open('learn_indexeddb', databaseVersion);
    
    openDatabaseRequest.onsuccess = function (event) {
        console.log("Success creating/accessing IndexedDB database");
    }
  })();


