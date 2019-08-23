const randomString = Math.random().toString(36).substring(2, 15);
const serverEmpty = {};

/*To Be Used Later
// const randomIP = (Math.floor(Math.random() * 255) + 1) + "."
//     + (Math.floor(Math.random() * 255)) + "."
//     + (Math.floor(Math.random() * 255)) + "."
//     + (Math.floor(Math.random() * 255));
// const randomInt = Math.floor(Math.random() * 100);
 */

const serverFalsePar = {
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
    "_id": 1,
    "server_name": "some string",
    "server_ip_address": "127.0.0.1",
    "server_user_type": "developer",
    "server_access": {
        "username": "username",
        "password": "password"
    },
    "server_status": "active"
};

const myQuery = {
    server_ip_address: "127.0.0.1"
};

const updateTrueQuery = {
    ...serverTruePar,
    server_ip_address: "127.0.0.2"
};

const deleteQuery1 = { server_ip_address: "127.0.0.0" };

module.exports = {
    serverEmpty,
    serverFalsePar,
    serverTruePar,
    deleteQuery1,
    myQuery,
    updateTrueQuery
};
