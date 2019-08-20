const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";
// Specify a Database Name

let obj = {
    "server_id": "2",
    "server_name": "test2",
    "server_ip_address": "127.0.0.0",
    "server_user_type": "admin",
    "server_access": {
        "username": "username",
        "password": "password"
    },
    "server_status": "active"
};
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.collection("mycol").find({}).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    inputIP = obj.server_ip_address.toString();
    console.log(inputIP);
    for (let key in result) {
        console.log(result[key]);
    }
    db.close();
  });
});
