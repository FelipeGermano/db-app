class Customer {
    constructor(dbName) {
        this.dbName = dbName;
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support IndexedDB.");
        }
    }

    removeAllRows = () => {
        const request = indexedDB.open(this.dbName, 1);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const txn = db.transaction('customers', 'readwrite');
            const objectStore = txn.objectStore('customers');
            objectStore.clear();
            db.close();
            logMessage('All rows removed.');
        };

        request.onerror = (event) => {
            logMessage('Error clearing database: ' + event.target.error.message);
        };
    };

    initialLoad = (customerData) => {
        const request = indexedDB.open(this.dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore('customers', { keyPath: 'userid' });
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const txn = db.transaction('customers', 'readwrite');
            const objectStore = txn.objectStore('customers');
            customerData.forEach((customer) => {
                objectStore.put(customer);
            });
            db.close();
            logMessage('Database loaded with initial data.');
        };

        request.onerror = (event) => {
            logMessage('Error loading database: ' + event.target.error.message);
        };
    };

    queryAllRows = () => {
        const request = indexedDB.open(this.dbName, 1);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const txn = db.transaction('customers', 'readonly');
            const objectStore = txn.objectStore('customers');
            const getAllRequest = objectStore.getAll();

            getAllRequest.onsuccess = (event) => {
                const results = event.target.result;
                if (results.length > 0) {
                    displayResults(results);
                } else {
                    displayResults('No rows found.');
                }
                db.close();
            };

            getAllRequest.onerror = (event) => {
                logMessage('Error querying database: ' + event.target.error.message);
            };
        };
    };
}

const DBNAME = 'customer_db';
const notificationPanel = document.getElementById('notificationPanel');
const logPanel = document.getElementById('logPanel');
const resultsPanel = document.getElementById('resultsPanel');

const clearDB = () => {
    notify('Clearing database...');
    const customer = new Customer(DBNAME);
    customer.removeAllRows();
    toggleButtons(false, true, false);
    notify('Database cleared.');
};

const loadDB = () => {
    notify('Loading database...');
    const customerData = [
        { userid: '444', name: 'Bill', email: 'bill@company.com', lastOrder: '2025-01-01', totalSales: 1200 },
        { userid: '555', name: 'Donna', email: 'donna@home.org', lastOrder: '2025-01-02', totalSales: 800 }
    ];
    const customer = new Customer(DBNAME);
    customer.initialLoad(customerData);
    toggleButtons(false, true, true);
    notify('Database loaded.');
};

const queryDB = () => {
    notify('Querying database...');
    const customer = new Customer(DBNAME);
    customer.queryAllRows();
    notify('Query complete.');
};

const notify = (message) => {
    notificationPanel.textContent = message;
    logMessage(message);
};

const logMessage = (message) => {
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logPanel.appendChild(logEntry);
    logPanel.scrollTop = logPanel.scrollHeight;
};

const displayResults = (results) => {
    resultsPanel.textContent = '';
    if (Array.isArray(results)) {
        results.forEach((result) => {
            const resultEntry = document.createElement('div');
            resultEntry.textContent = JSON.stringify(result);
            resultsPanel.appendChild(resultEntry);
        });
    } else {
        resultsPanel.textContent = results;
    }
};

const toggleButtons = (loadEnabled, queryEnabled, clearEnabled) => {
    document.getElementById('loadDB').disabled = !loadEnabled;
    document.getElementById('queryDB').disabled = !queryEnabled;
    document.getElementById('clearDB').disabled = !clearEnabled;
};

document.getElementById('loadDB').addEventListener('click', loadDB);
document.getElementById('queryDB').addEventListener('click', queryDB);
document.getElementById('clearDB').addEventListener('click', clearDB);