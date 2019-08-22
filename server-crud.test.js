const { addServer, countServers, createConnection, closeConnection, checkForDuplicateIP, checkServer, updateServer, deleteServer, validateServer } = require('./server-crud');
const { serverEmpty, serverFalsePar, serverTruePar, deleteQuery, myQuery, updateTrueQuery } = require('./sample-data');

jest.setTimeout(10000);

beforeAll(async () => {
    await createConnection();
});

afterAll(async () => {
    await closeConnection();
});

describe('Mongo', () => {

    test.skip('Initial Number of Records to be 0', async () => {
        expect(await countServers()).toBe(0);
    });

    test('Adding an EMPTY server or a record with false parameter', async () => {
        expect(await addServer(serverEmpty)).toBe(false);
    });

    test('Validate a correct server', async () => {
        expect(await validateServer(serverTruePar)).toBe(true);
    });

    test('Validate an invalid server', async () => {
        expect(await validateServer(serverFalsePar)).toBe(false);
    });

    test('Adding a record with false parameter', async () => {
        expect(await addServer(serverFalsePar)).toBe(false);
    });

    test('Check if a record exists within the db', async () => {
        expect(await checkServer()).toBe(true)
    });

    test('Adding a fully detailed server to the db', async () => {
        expect(await addServer(serverTruePar)).toBe(true);
    });

    test('Check for duplicate IP Address', async () => {
        expect(await checkForDuplicateIP(serverTruePar)).toBe(true)
    });

    test('Adding a record with one duplicated IP address', async () => {
        expect(await addServer(serverTruePar)).toBe(false);
    });

    test('Update a current record with false parameter record ', async () => {
        expect(await updateServer(myQuery ,serverFalsePar)).toBe(false);
    });

    test('Update a current record with a duplicate IP address ', async () => {
        expect(await updateServer(myQuery,serverTruePar)).toBe(false);
    });

    test('Update a record with correct parameter', async () => {
        expect(await updateServer(myQuery, updateTrueQuery)).toBe(true);
    });

    // test('Delete a record in an empty Database', async () => {
    //     expect(await deleteServer(deleteQuery)).toBe(false);
    // });

    // test('Delete a record successfully in a Database with record(s)', async () => {
    //     expect(await deleteServer(deleteQuery)).toBe(true);
    // });

});
