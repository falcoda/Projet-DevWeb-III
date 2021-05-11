let mysql = require("mysql");
let nodemailer = require("nodemailer");
let express = require("express");
let cors = require("cors");
let app = express();
//let bootstrap = require('bootstrap');

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
			pass: "??ProjetDev33"
		}
	});
	const mailOptions = {
		from: request.body.mail,
		to: "corentin@4x4vert.be",
		subject: "Message de " + request.body.mail,
		text: request.body.commentaire
	};


	let reponses = Object.entries(request.body);
	let isValid = "";
	if (!validateEmail(request.body.mail)) {
		isValid += "-mailInvalid";

	}
	for (let i of reponses) {
		if (i[1] === "") {
			if (i[0] === "nom") {
				isValid += "-nomInvalid";
			} else if (i[0] === "prenom") {
				isValid += "-prenomInvalid";
			} else {
				isValid += "-comInvalid";
			}
		}
	}


	if (request.body.commentaire !== "" && request.body.nom !== "" && request.body.prenom !== "" && validateEmail(request.body.mail)) {
		transporter.sendMail(mailOptions);
		let con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "root",
			database: "falcohm"
		});
		con.connect(function (err) {
			if (err) throw err;
			con.query("INSERT INTO messages (identite, mail, message) VALUES (?, ?, ?)", [request.body.nom + " " + request.body.prenom, request.body.mail, request.body.commentaire], function (err, result) {
			});
		});
		response.send("success");
	}
	else {
		response.send(isValid);
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
	let reponses = Object.entries(request.body);
	let isValid = "";

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
		con.query("SELECT utilisateurs.adressemail from utilisateurs", function (err, result) {
			response.send(JSON.stringify(result));
			for (let i of reponses) {
				for (let x of result) {
					if (i[1] === x) {
						if (i[0] === "adressemail2") {
							isValid += "-adressemail2Invalid";
						}
					}
				}
			}
		});
	});
	if (request.body.adressemail2 !== "") {
		let con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "root",
			database : "falcohm"
		});
		con.connect(function(err) {
			if (err) throw err;
			con.query("INSERT INTO utilisateurs (nom, prenom, numerotelephone, adressemail, motdepasse) VALUES (?, ?, ?, ?, ?)", [request.body.nom, request.body.prenom, request.body.numerotel, request.body.adressemail2, request.body.motdepasse2], function (err, result) {
			});
		});
		response.send("success");
	}
	else {
		response.send(isValid);
	}
});

app.post("/ajouterMateriel", (request, response)=> {
	verifieAdmin(request.query.connexion, request.query.motdepasse).then((value) => {
		if (value === true) {
			let con = mysql.createConnection({
				host: "localhost",
				user: "root",
				password: "root",
				database: "falcohm"
			});
			con.connect(function (err) {
				if (err) throw err;
				con.query("INSERT INTO materiels (nom, id_categorie, prix, nombre, description) VALUES (?, ?, ?, ?, ?)", [request.body.nom, request.body.categorie, request.body.prix, request.body.nombre, request.body.description], function (err, result) {
					response.send("success");
				});
			});
		};
	});
});

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



app.get("/administration", (request, response)=> {
	response.render("pages/administration");
});


app.get("/liste_utilisateur", (request, response)=> {
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database : "falcohm"
	});
	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT utilisateurs.nom, utilisateurs.prenom, utilisateurs.numerotelephone as numero, utilisateurs.adressemail as mail from utilisateurs", function (err, result) {
			response.send(JSON.stringify(result));
		});
	});
});


app.post("/nombre_materiel", (request, response)=> {
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database : "falcohm"
	});

	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT m.nom,m.nombre from materiels as m ", function (err, result) {
			result.forEach(function(item){

				if(item.nombre !== Number(request.body[item.nom]) && request.body[item.nom] !== undefined){
							con.query("UPDATE materiels SET nombre = '" + Number(request.body[item.nom]) + "' WHERE nom ='" + item.nom + "'"
							);
				};
			});
		});
	});
});

function verifieAdmin(connexion, motdepasse) {
	return new Promise((resolve, reject)=>{
		let con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "root",
			database : "falcohm"
		});
		con.connect(function (err) {
			if (err) throw err;
			con.query("SELECT utilisateurs.adressemail, utilisateurs.motdepasse, utilisateurs.admin from utilisateurs", function (err, result) {
				for (let i of result) {
					if (connexion == i.adressemail && motdepasse == i.motdepasse && i.admin == 1) {
						resolve(true);
					}
				}
			});
		});
	});
};

app.listen(80);