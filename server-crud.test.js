const { addServer, countServers, createConnection } = require('../src/routes/server-crud');

jest.setTimeout(10000);

beforeAll(async () => {
    await createConnection();
});

describe('Mongo', () => {a
    test('Initial Number of Records to be 0', async () => {
        expect(await countServers()).toEqual(0);
    });

    test('Adding an empty server', async () => {
        const server = {};
        addServer(server);
        expect(await addServer(true));
    });

    test.skip('Adding a fully detailed server to the db', async () => {
        const server = {};
        addServer(server);
        expect(await addServer(false));
    });

    test.skip('Adding a server with one duplicated parameter', async () => {
        const server = {};
        addServer(server);
        expect(await addServer(true));
    });
});
