const { addServer, countServers, createConnection, closeConnection } = require('./server-crud');

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

    test('Adding an EMPTY server', async () => {
        const server = {}; // empty object used
        expect(await addServer(server)).toBe(false);
    });

    test('Adding a fully detailed server to the db', async () => {
        // test by reading a JSON file from local directory
        const server = {
            "server_id": 1,
            "server_name": "test",
            "server_ip_address": "127.0.0.1",
            "server_access": {
                "user_type": "user",
                "credential": {
                    "username": "username",
                    "password": "password"
                }
            },
            "server_status": "active"
        }
        expect(await addServer(server)).toBe(true);
    });

    test.skip('Adding a server with one duplicated IP address', async () => {
        const server = {
            "server_id": "2",
            "server_name": "test2",
            "server_ip_address": "127.0.0.1",
            "server_access": {
                "user_type": "user2",
                "credential": {
                    "username": "username",
                    "password": "password"
                }
            },
            "server_status": "active"
        };
        expect(await addServer(server).toBe(false));
    });
});
