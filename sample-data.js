const randomString = Math.random().toString(36).substring(2, 15);
const randomInt = Math.floor(Math.random() * 100);
const serverEmpty = {};
const randomIP = (Math.floor(Math.random() * 255) + 1) + "."
    + (Math.floor(Math.random() * 255) + 0) + "."
    + (Math.floor(Math.random() * 255) + 0) + "."
    + (Math.floor(Math.random() * 255) + 0);

const serverFalsePar = {
    ...serverEmpty,
    "_id": Math.floor(Math.random() * 100),
    "server_name": randomString,
    "server_ip_address": randomString,
    "server_user_type": randomString,
    "server_access": {
        "username": "username",
        "password": "password"
    },
    "server_status": randomString
};

const serverTruePar = {
    ...serverFalsePar,
    "_id": randomInt,
    "server_ip_address": "127.0.0.1",
    "server_user_type": "user",
    "server_status": "active"
};

const myQuery = {
    "server_ip_address": "127.0.0.1",
};

const updateTrueQuery = {
    ...serverTruePar,
    "server_ip_address": randomIP
}


const deleteQuery = { server_ip_address: "127.0.0.1" };

module.exports = {
    serverEmpty,
    serverFalsePar,
    serverTruePar,
    deleteQuery,
    myQuery,
    updateTrueQuery
};
