let mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "gdy3U94E"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});