let mysql = require('mysql');
let nodemailer = require('nodemailer');
let express = require("express");
let app = express();
//<<<<<<< HEAD
//let bootstrap = require('bootstrap');

/*const bootstrap = require('bootstrap');
>>>>>>> 86bb03ddd7877e17cedca3d0eadb0465ea7e9483*/

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (request, response)=> {
    response.render("pages/accueil")
});

app.get("/contact", (request, response)=> {
    response.render("pages/contact");
});

app.post("/contact", (request, response)=>{
    console.log(request.body);
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database : "falcohm"
    });
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("INSERT INTO messages (identite, mail, message) VALUES (?, ?, ?)", [request.body.identite, request.body.mail, request.body.commentaire], function (err, result) {
        });
    });

    const transporter = nodemailer.createTransport({
        host: 'ssl0.ovh.net',
        port: 587,
        secure: false,
        auth: {
            user: "corentin@4x4vert.be",
            pass: "??ProjetDev3"
        }
    });
    const mailOptions = {
        from: request.body.mail,
        to: "corentin@4x4vert.be",
        subject: "Message de " + request.body.mail,
        text: request.body.commentaire
    };

    transporter.sendMail(mailOptions);

    response.send("success")
});

app.get("/materiel", (request, response)=> {
    response.render("pages/materiel")
});

app.get("/devis", (request, response)=> {
    response.render("pages/devis")
});

app.get("/connexion", (request, response)=> {
    response.render("pages/connexion")
});

app.listen(83);

/*
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database : "falcohm"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("INSERT INTO messages (identite, mail, message) VALUES ('francois charlier', 'charlierfrancois@gmail.com', 'Bonjour, le site est très beau !')", function (err, result) {
        if (err) throw err;
        console.log("Données injectées !");
    });

});
*/
