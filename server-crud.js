const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";
// Specify a Database Name
const dbName = 'test';
// Declare the schema of the database
const schema = {
    _id: value => parseInt(value) === Number(value),
    server_ip_address: value => /\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/ug.test(value),
    server_status: value => /(?:^|\W)inactive|active(?:$|\W)/ug.test(value),
    server_user_type: value => /(?:^|\W)developer|user|admin(?:$|\W)/ug.test(value)
};

//Server parameters Validation Function
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

let currentIP;
const readCurrentServerIP = async () => {
    const result = await collection.find({}).toArray();
    for (let key in result) {
        currentIP = result[key].server_ip_address;
    }
}

const addServer = async (server) => {
    inputIP = server.server_ip_address;
    const errors = validate(server, schema);
    await readCurrentServerIP();
    if (Object.getOwnPropertyNames(server).length > 0 &&
        errors.length === 0 && (currentIP !== inputIP)) {
        collection.insertOne(server);
        console.log("Record is inserted");
        return true;
    } else {
        for (const { message } of errors) {
            console.log(message);
        }
        return false;
    }
};


const readServerData = async () => {
    const result = await collection.find({}).toArray();
    for (var key in result ) {
        return result[key];
    }

};
// TO-DO: READ & UPDATE methods for server
module.exports = {
    countServers,
    addServer,
    createConnection,
    closeConnection,
    readServerData
};
