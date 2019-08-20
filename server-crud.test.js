const { addServer, countServers, createConnection, closeConnection, readServerData } = require('../src/routes/server-crud');

jest.setTimeout(10000);

beforeAll(async () => {
    await createConnection();
});

afterAll(async () => {
    await closeConnection();
});

const randomString = async () => {
    return Math.random().toString(36).substring(2, 15)
};
const server = {};
const serverFalsePar = {
    ...server,
    "_id": Math.floor(Math.random() * 100),
    "server_name": randomString(),
    "server_ip_address": randomString(),
    "server_user_type": randomString(),
    "server_access": {
        "username": "username",
        "password": "password"
    },
    "server_status": randomString()
};
const serverTruePar = {
    ...serverFalsePar,
    "server_ip_address": "127.0.0.1",
    "server_user_type": "user",
    "server_status": "active"
}

describe('Mongo', () => {
    test('Initial Number of Records to be 0', async () => {
        expect(await countServers()).toBe(0);
    });

    test('Adding an EMPTY server or a record with false parameter', async () => {
        expect(await addServer(server)).toBe(false);
    });

    test('Adding a record with false parameter', async () => {
        expect(await addServer(serverFalsePar)).toBe(false);
    });

    test('Adding a fully detailed server to the db', async () => {
        expect(await addServer(serverTruePar)).toBe(true);
    });

    test('Adding a server with one duplicated IP address', async () => {
        expect(await addServer(server)).toBe(false);
    });

    test.skip('Reading server data from the database'), async () => {
        const result = await readServerData();
        expect(result.toBe({
            _id: 1,
            server_name: "test",
            server_ip_address: "127.0.0.1",
            server_user_type: "user",
            server_access: {
                "username": "username",
                "password": "password"
            },
            server_status: "active"
        }))
    }
})
