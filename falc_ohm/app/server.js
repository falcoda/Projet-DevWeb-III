let mysql = require('mysql');
let nodemailer = require('nodemailer');
let express = require("express");
let cors = require("cors");
let app = express();
//<<<<<<< HEAD
//let bootstrap = require('bootstrap');

/*const bootstrap = require('bootstrap');
>>>>>>> 86bb03ddd7877e17cedca3d0eadb0465ea7e9483*/

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", (request, response)=> {
    response.render("pages/accueil");
});

app.get("/contact", (request, response)=> {
    response.render("pages/contact");
});

app.post("/sendMail", (request, response)=>{
    console.log(request.body);
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
    if (request.body.commentaire !== undefined && request.body.identite !== undefined && validateEmail(request.body.mail)) {
        transporter.sendMail(mailOptions);
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database : "falcohm"
        });
        con.connect(function(err) {
            if (err) throw err;
            con.query("INSERT INTO messages (identite, mail, message) VALUES (?, ?, ?)", [request.body.identite, request.body.mail, request.body.commentaire], function (err, result) {
            });
        });
        response.send("success")
    }
    else {
        response.send("error")
    }
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
