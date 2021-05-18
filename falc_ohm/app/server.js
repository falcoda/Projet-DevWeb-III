import mysql from "mysql";
import nodemailer from "nodemailer";
import express from "express";
import cors from "cors";
import React from "react";
import rateLimit from "express-rate-limit";

let con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "falcohm",
	multipleStatements: true
});
con.connect();

const limiter = rateLimit({
	windowMs: 60 * 1000,
	max: 250
});

let app = express();

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

app.set("view engine", "ejs");

app.use(limiter);
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
		con.query("INSERT INTO messages (identite, mail, message) VALUES (?, ?, ?)", [request.body.nom + " " + request.body.prenom, request.body.mail, request.body.commentaire], function (err, result) {
		});
		response.send("success");
	} 
	else {
		response.send(isValid);
	}
});

app.get("/materiel/:format?", (request, response)=> {
	if (request.params.format == "json") {
		con.query("SELECT m.nom,m.prix,m.description,m.nombre,m.en_location,c.nom_categorie from materiels as m JOIN categories c on m.id_categorie = c.id_categorie", function (err, result) {
			response.send(JSON.stringify(result));
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
	con.query("SELECT utilisateurs.id_utilisateurs, utilisateurs.adressemail, utilisateurs.motdepasse, utilisateurs.nom, utilisateurs.prenom, utilisateurs.numerotelephone, utilisateurs.admin from utilisateurs", function (err, result) {
		response.send(JSON.stringify(result));
	});
});

app.post("/inscription", (request, response)=> {
	con.query("INSERT INTO utilisateurs (nom, prenom, numerotelephone, adressemail, motdepasse) VALUES (?, ?, ?, ?, ?)", [request.body.nom, request.body.prenom, request.body.numerotel, request.body.adressemail2, request.body.motdepasse2], function (err, result) {
		response.send("succes");
	});
});


app.post("/ajouterMateriel", (request, response)=> {
	verifieAdmin(request.query.connexion, request.query.motdepasse).then((value) => {
		if (value === true) {
			con.query("INSERT INTO materiels (nom, id_categorie, prix, nombre, description) VALUES (?, ?, ?, ?, ?)", [request.body.nom, request.body.categorie, request.body.prix, request.body.nombre, request.body.description], function (err, result) {
				response.send("success");
			});
		};
	});
});




app.get("/administration", (request, response)=> {
	response.render("pages/administration");
});


app.get("/liste_utilisateur", (request, response)=> {
	verifieAdmin(request.query.connexion, request.query.motdepasse).then((value) => {
		if (value === true) {
			con.query("SELECT utilisateurs.nom, utilisateurs.prenom, utilisateurs.numerotelephone as numero, utilisateurs.adressemail as mail from utilisateurs", function (err, result) {
				response.send(JSON.stringify(result));
			});
		}
	});
});


app.post("/nombre_materiel", (request, response)=> {
	verifieAdmin(request.query.connexion, request.query.motdepasse).then((value) => {
		if (value === true) {
			con.query("SELECT m.nom,m.nombre from materiels as m ", function (err, result) {
				result.forEach(function (item) {

					if (item.nombre !== Number(request.body[item.nom]) && request.body[item.nom] !== undefined) {

						con.query("UPDATE materiels SET nombre = '" + Number(request.body[item.nom]) + "' WHERE nom ='" + item.nom + "'"
						);
					};
				});
			});
		};
	});
});



app.post("/panier", (request, response)=> {
	let mail= request.body.mail;
	con.query("select materiels.nom, panier_elem.nombre from panier_elem join materiels on materiels.id_materiel = panier_elem.id_materiel join panier on panier.id_panier = panier_elem.id_panier join utilisateurs on utilisateurs.id_utilisateurs = panier.id_utilisateurs where utilisateurs.adressemail ='" +mail +"'", function (err, result) {
		response.send(JSON.stringify(result));
	});
});




app.get("/administration", (request, response)=> {
	response.render("pages/administration");
});

app.get("/mentionslegales", (request, response)=> {
	response.render("pages/mentionslegales");
});

app.get("/all-commande", (request, response)=> {
		con.query(`select commande.id_commande, utilisateurs.adressemail, materiels.nom,commande_elem.nombre , (materiels.prix*commande_elem.nombre) as prix, commande.date from commande
			    join commande_elem  on commande.id_commande = commande_elem.id_commande
			    join materiels on materiels.id_materiel = commande_elem.id_materiel
			    join utilisateurs on utilisateurs.id_utilisateurs = commande.id_utilisateurs`, function (err, result) {
			response.send(JSON.stringify(result));
		});
});

app.post("/commande", (request, response)=> {
	let user = request.body.mail;
	console.log(request.body);
	con.query(`select commande.id_commande, utilisateurs.adressemail, materiels.nom,commande_elem.nombre , (materiels.prix*commande_elem.nombre) as prix, commande.date from commande
			    join commande_elem  on commande.id_commande = commande_elem.id_commande
			    join materiels on materiels.id_materiel = commande_elem.id_materiel
			    join utilisateurs on utilisateurs.id_utilisateurs = commande.id_utilisateurs
				where utilisateurs.adressemail = ?`,[user], function (err, result) {
		response.send(JSON.stringify(result));
	});
});
app.post("/commande-utilisateur", (request, response)=> {
	let mail = request.body.mail;
	con.query("select * from panier join utilisateurs on utilisateurs.id_utilisateurs = panier.id_utilisateurs where utilisateurs.adressemail =?", [mail],function (err, result) {

		if(result.length !==0 ){



			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			let yyyy = today.getFullYear();

			today = yyyy + "-" + mm + "-" + dd;

			con.query("select utilisateurs.id_utilisateurs from utilisateurs where utilisateurs.adressemail = ?" , [mail],function (err, result) {
				if (err) throw err;
				let utilis = JSON.parse(JSON.stringify(result[0].id_utilisateurs));

				con.query("insert into commande(id_utilisateurs,date) values (?,?)",[utilis,today], function (err, result) {
					con.query(`select materiels.id_materiel, panier_elem.nombre,materiels.prix*panier_elem.nombre as prix from panier_elem
									join materiels on materiels.id_materiel = panier_elem.id_materiel
									join panier on panier.id_panier = panier_elem.id_panier
									join utilisateurs on utilisateurs.id_utilisateurs = panier.id_utilisateurs
		
									where utilisateurs.adressemail =?; select commande.id_commande from commande where id_utilisateurs=?`, [mail,utilis],function (err, result) {


						let id_com =JSON.parse(JSON.stringify(result[1])).pop();
						let donnee = JSON.parse(JSON.stringify(result[0]));

						console.log(donnee);
						if (donnee.length != 0){
							for(let item of donnee){
								con.query("insert into commande_elem(id_commande,id_materiel,nombre) values (?,?,?)",[id_com.id_commande,item.id_materiel,item.nombre], function (err, result) {
								});
							}
							con.query("select id_panier from panier where id_utilisateurs =? ; ",[utilis], function (err, result) {
								console.log(JSON.parse(JSON.stringify(result)));
								con.query("delete from panier_elem where id_panier = ? ; delete from panier where id_utilisateurs = ? ",[JSON.parse(JSON.stringify(result))[0].id_panier,utilis],function (err, result) {
									envoyerCommandeMail(id_com.id_commande);
								});
							});
						}
					});
				});
			});
		}
	});
});

function envoyerCommandeMail(idCom){
	con.query(`select commande.date, materiels.nom,commande_elem.nombre , (materiels.prix*commande_elem.nombre) as prix, utilisateurs.adressemail as mail from commande
			join commande_elem  on commande.id_commande = commande_elem.id_commande
			join materiels on materiels.id_materiel = commande_elem.id_materiel
			join utilisateurs on utilisateurs.id_utilisateurs = commande.id_utilisateurs
			where commande.id_commande = ?`,[idCom], function (err, result) {
		let materiel = "" ;
		let resultat = JSON.parse(JSON.stringify(result));
		let total = 0;
		for(let i  of resultat){
			materiel += "<tr style='border: 1px solid black;padding: 5px;text-align: center;'><td>"+i.nom+"</td><td>"+i.nombre+"</td><td>"+i.prix+"</td></tr>";
			total += i.prix;
		}


		let mailAEnvoyer = `<div style="margin-left: auto;
margin-right: auto;
width: 50%">
	<h1>Récapitulatif de votre commande</h1>
	<h2>Commande du `+new Date(resultat[0].date).toLocaleDateString()+` </h2>

	<table className="table" style="border:1px gray solid;border-radius:5px;width :100%; ">
		<thead>
		<tr>
			<th scope="col">Article</th>
			<th scope="col">Nombre</th>
			<th scope="col">Prix /€</th>
		</tr>
		</thead>
		<tbody>`+materiel+`
		
		</tbody>
		<tfoot style="color:red; padding: 15%;"> <tr><th>prix total : </th><th></th> <th>`+total+`</th></tr></tfoot>
	</table>
	<p>Merci pour votre commande. Nous vous contacterons très bientôt afin d\'étudier au mieux votre projet.</p>
</div>`;

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
			from: "falcohm6tm@hotmail.com",
			to: resultat[0].mail,
			subject: "Récapitulatif de commande" ,
			html: mailAEnvoyer
		};
		transporter.sendMail(mailOptions);
	});
}

function verifieAdmin(connexion, motdepasse) {
	return new Promise((resolve, reject)=>{
		con.query("SELECT utilisateurs.adressemail, utilisateurs.motdepasse, utilisateurs.admin from utilisateurs", function (err, result) {
			for (let i of result) {
				if (connexion == i.adressemail && motdepasse == i.motdepasse && i.admin == 1) {
					resolve(true);
				}
			}
		});
	});
}

app.listen(80);