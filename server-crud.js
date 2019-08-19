const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";
// Specify a Database Name
const dbName = 'test';
// Declare the schema of the database
const schema = {
    server_id: value => parseInt(value) === Number(value),
    server_ip_address: value => /\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/ug.test(value),
    server_status: value => /\b(\w*inactive\w*)|(\w*active\w*)\b/ug.test(value),
    user_type: value => /\b(\w*user\w*)|(\w*developer\w*)|(\w*admin\w*)\b/ug.test(value)
};

const validate = (object, schema) => Object.entries(schema).map(([property, validate]) => [
    property, validate(object[property])
]).reduce((errors, [property, valid]) => {
    if (!valid) {
        errors.push(new Error(`${property} is invalid`));
    }
    return errors;
}, []);

// Connect to MongoDB
let client;
let collection;
const createConnection = async () => {
    client = await MongoClient.connect(url);
    const db = await client.db(dbName);
    collection = db.collection('mycol');
};

const closeConnection = async () => {
    client.close();
};

const countServers = async () => {
    return await collection.countDocuments();
};

const addServer = async (server) => {
    const errors = validate(server, schema);
    if (Object.getOwnPropertyNames(server).length === 0) {
        console.log("Empty record")
        return false;
    } else if (
        errors.length > 0
        // (server.server_access.user_type === "admin" || "user" || "developer") ||
        // server.server_status === "active" || "inactive"
    ) {
        for (const { message } of errors) {
            console.log(message);
        }
        return false;
        // insert a record if the record is not empty or does not have any null or undefined ip value
    } else {
        await collection.insertOne(server);
        console.log("Record is inserted");
        return true;

    }
};
// TO-DO: READ & UPDATE methods for server
module.exports = {
    countServers,
    addServer,
    createConnection,
    closeConnection
};
