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

const validateServer = async (server) => {
    return (Object.getOwnPropertyNames(server).length > 0 && validate(server, schema).length === 0)
}

// Connect to MongoDB
let client;
let collection;

const createConnection = async () => {
    client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = await client.db(dbName);
    collection = db.collection('mycol');
};

const closeConnection = async () => {
    client.close();
};

const countServers = async () => {
    return await collection.countDocuments();
};

const checkServer = async () => {
    return await collection.find({}).toArray() !== {};
}

const checkForDuplicateIP = async (server) => {
    const result = await collection.find({}).toArray();
    if (checkServer()) {
        const { server_ip_address } = server || {};
        return (result.some(element => element.server_ip_address === server_ip_address));
    }
    return false
}

const addServer = async (server) => {
    if (!checkForDuplicateIP(server) && validateServer(server)) {
        return await collection.insertOne(server);
    }
    return false;
};

const updateServer = async (server, newValues) => {
    if (!checkForDuplicateIP(server) && validateServer(server)) {
        return await collection.updateOne(server, newValues);
    }
    return false;
}

const deleteServer = async (server) => {
    if (checkServer()) {
        await collection.deleteOne(server);
        console.log("Record deleted");
        return true;
    } else {
        console.log("Empty database");
        return false;
    }
}

module.exports = {
    countServers,
    addServer,
    createConnection,
    closeConnection,
    checkForDuplicateIP,
    checkServer,
    updateServer,
    deleteServer,
    validateServer
};
