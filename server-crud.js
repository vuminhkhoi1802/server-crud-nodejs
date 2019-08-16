const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";
// Specify a Database Name
const dbName = 'test';
const fs = require("fs");

// Connect to MongoDB
let collection;
const createConnection = async () => {
    const client = await MongoClient.connect(url);
    const db = await client.db(dbName);
    collection = db.collection('mycol');
};

const countServers = async () => {
    return await collection.countDocuments();
};

const addServer = async () => {
    let obj = {};
    await collection.insertOne(obj);
    if (obj.length === 0) {
        return true;
    } else {
        return false;
    }
};


// TO-DO: READ & UPDATE methods for server
module.exports = {
    countServers,
    addServer,
    createConnection
};
