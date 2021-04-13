let mysql = require("mysql");
let nodemailer = require("nodemailer");
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

app.post("/mail", (request, response)=>{
	console.log(request.body);
	const transporter = nodemailer.createTransport({
		host: "ssl0.ovh.net",
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
	if(request.body.commentaire ===""){
	    response.send("comInvalid");
    }
	else if(request.body.nom ==="" ) {
		response.send("nomInvalid");
	}
	else if(request.body.prenom ==="") {
		response.send("prenomInvalid");
	}
	else if(request.body.mail ===undefined || validateEmail(request.body.mail) ===false  ) {
		response.send("mailInvalid");
	}
	else if (request.body.commentaire !== undefined && request.body.nom !== undefined &&request.body.prenom !== undefined && validateEmail(request.body.mail)) {
		transporter.sendMail(mailOptions);
		let con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "root",
			database : "falcohm"
		});
		con.connect(function(err) {
			if (err) throw err;
			    con.query("INSERT INTO messages (identite, mail, message) VALUES (?, ?, ?)", [request.body.nom +" " +request.body.prenom, request.body.mail, request.body.commentaire], function (err, result) {
			});
		});
		response.send("success");
	}

});

app.get("/materiel/:format?", (request, response)=> {

	if (request.params.format == "json") {

		let con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "root",
			database: "falcohm"
		});
		con.connect(function (err) {
			if (err) throw err;
			con.query("SELECT m.nom,m.prix,m.description,m.nombre,m.en_location,c.nom_categorie from materiels as m JOIN categories c on m.id_categorie = c.id_categorie GROUP BY nom_categorie", function (err, result) {
				response.send(JSON.stringify(result));
			});
		});
	}
	else{
		response.render("pages/materiel");
	}
});

app.get("/devis", (request, response)=> {
	response.render("pages/devis");
});

app.get("/authentification", (request, response)=> {
	response.render("pages/authentification");
});

app.get("/profil", (request, response)=> {
	response.render("pages/profil");
});

app.get("/utilisateurs", (request, response)=> {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database : "falcohm"
    });
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT utilisateurs.id_utilisateurs, utilisateurs.adressemail, utilisateurs.motdepasse, utilisateurs.nom, utilisateurs.prenom, utilisateurs.numerotelephone, utilisateurs.admin from utilisateurs", function (err, result) {
            response.send(JSON.stringify(result));
        });
    });
});

app.post("/inscription", (request, response)=> {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database : "falcohm"
    });
    con.connect(function(err) {
        if (err) throw err;
        con.query("INSERT INTO utilisateurs (nom, prenom, numerotelephone, adressemail, motdepasse) VALUES (?, ?, ?, ?, ?)", [request.body.nom, request.body.prenom, request.body.numerotel, request.body.adressemail2, request.body.motdepasse2], function (err, result) {
            response.send("succes");
        });
    });
});

app.post("/ajouterMateriel", (request, response)=> {
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database : "falcohm"
	});
	con.connect(function(err) {
		if (err) throw err;
		con.query("INSERT INTO materiels (nom, id_categorie, prix, nombre, description) VALUES (?, ?, ?, ?, ?)", [request.body.nom, request.body.categorie, request.body.prix, request.body.nombre, request.body.description], function (err, result) {
			response.send("succes");
		});
	});
});

app.listen(80);

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
