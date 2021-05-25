/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
let materiel;
let users;
let commandes;

let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost/liste-utilisateur?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
xhr.onload = function() {
	users=xhr.responseText;
	class Bouttons extends React.Component {

		render(){
			return (
				<React.Fragment>
					<button onClick={afficherUtilis}>Liste utilisateurs</button>
					<button onClick={nombreMateriel}> Nombre matériel </button>
					<button onClick={ajoutMateriel}> Ajouter matériel </button>
					<button onClick={afficherCommande}> Commandes effectuées </button>
				</React.Fragment>);
		}
	}
	ReactDOM.render(
		<Bouttons/>,
		document.getElementById("bouttons")

	);
};
xhr.send();

//permet d'enregistrer le matériel
let xhr_materiel = new XMLHttpRequest();
xhr_materiel.open("GET", "http://localhost/materiel/json?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
xhr_materiel.onload = function() {
	materiel=xhr_materiel.responseText;

};
xhr_materiel.send();

let xhr_commande = new XMLHttpRequest();
xhr_commande.open("GET", "http://localhost/all-commande");
xhr_commande.onload = function() {
	commandes=xhr_commande.responseText;

};
xhr_commande.send();


class User extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<React.Fragment>
				<tr>
					<td scope="row">{this.props.utilisateur.nom}</td>
					<td>{this.props.utilisateur.prenom}</td>
					<td>{this.props.utilisateur.mail}</td>
					<td>{this.props.utilisateur.numero}</td>
				</tr>
			</React.Fragment>
		);

	}
}





class ListeUtilis extends React.Component {
	constructor(props){
		super(props);

	}

	render() {
		const rows = [];
		this.props.utilisateurs.forEach((utilis) => {

			rows.push(
				<User key={utilis.mail} utilisateur = {utilis}/>
			);

		});

		return (
			<div id={"utilisateurs"} className="overflow utilis">

				<table className="table">
					<thead>
					<tr>
						<th scope="col">Nom</th>
						<th scope="col">Prénom</th>
						<th scope="col">Mail</th>
						<th scope="col">Numéro de téléphone</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</table>
			</div>
		);
	}
}






class Materiel extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<React.Fragment>
				<tr>
					<td scope="row">{this.props.materiel.nom}</td>
					<td>{this.props.materiel.nom_categorie}</td>
					<td><input className="colNumber" name={this.props.materiel.nom} type="number" min="0" max="99" defaultValue={this.props.materiel.nombre}/></td>
				</tr>
			</React.Fragment>
		);

	}
}


class ListeMateriel extends React.Component {
	constructor(props){
		super(props);

	}

	render() {
		const rows = [];
		this.props.materiels.forEach((items) => {

			rows.push(
				<Materiel key={items.nom} materiel = {items}/>
			);

		});

		return (
			<div id={"utilisateurs"} className="overflow utilis">

				<table className="table">
					<thead>
					<tr>
						<th scope="col">Nom</th>
						<th scope="col">Catégorie</th>
						<th scope="col">Nombre</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</table>
				<button onClick={sendNumber}>Envoyer</button>
			</div>
		);
	}
}







function afficherUtilis(){
	ReactDOM.render(
		<ListeUtilis utilisateurs={JSON.parse(users)} />,
		document.getElementById("conteneur")
	);
}

function nombreMateriel() {
	ReactDOM.render(
		<ListeMateriel materiels={JSON.parse(materiel)} />,
		document.getElementById("conteneur")
	);


}

function sendNumber() {

	let data = {};
	for(let i of JSON.parse(materiel)){
		if(i.nombre !== Number(document.getElementsByName(i.nom)[0].value)){
			data[i.nom] =document.getElementsByName(i.nom)[0].value;
		}
	}

	let xhr = new XMLHttpRequest();

	xhr.open("POST", "/nombre-materiel?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function () {
		if (xhr.responseText === "succes"){
			alert('Modification effectuée');
		}
	};
	xhr.send(JSON.stringify(data));


}
class AjoutMateriel extends React.Component {
	state = {
		nom: "",
		categorie: "",
		prix: "",
		nombre: "",
		description: "",
	};

	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		let nom = document.getElementById("nom");
		let categorie = document.getElementById("categorie");
		let prix = document.getElementById("prix");
		let nombre = document.getElementById("nombre");
		let description = document.getElementById("description");

		let data = {
			nom: nom.value,
			categorie: categorie.value,
			prix: prix.value,
			nombre: nombre.value,
			description: description.value
		};

		let tableMateriel = [];

		let xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost/materiel/json?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
		xhr.setRequestHeader("content-type", "application/json");
		xhr.onload = function () {
			tableMateriel = JSON.parse(xhr.responseText);
		};
		xhr.send();

		let xhr2 = new XMLHttpRequest();
		xhr2.open("POST", "http://localhost/ajouterMateriel?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
		xhr2.setRequestHeader("content-type", "application/json");
		xhr2.onload = function () {
			console.log(xhr2.responseText);
			if (xhr.responseText == "success") {
				alert("Matériel ajouté avec succès");
				nom.value = "";
				categorie.value = "";
				prix.value = "";
				nombre.value = "";
				description = "";
			}
			else if (xhr.responseText === "nomInvalid") {
				alert("nomInvalid");
				document.getElementById("nom").innerHTML =
					"<input type=\"text\" className=\"form-control w-25\" id=\"nom\" placeholder=\"Nom du matériel\" required>"
			}
			else if (xhr.responseText === "descriptionInvalid") {
				alert("descriptionInvalid");
				document.getElementById("description").innerHTML = "<textarea type=\"text\" className=\"form-control notValid\" rows=\"5\" id=\"description\" placeholder=\"Description du matériel\"  required></textarea>"
			}
			else if (xhr.responseText === "success") {
				document.getElementById("nom").classList.remove("is-invalid");
				document.getElementById("description").classList.remove("is-invalid");
			}
			for (let i of tableMateriel) {
				if (data.nom == i.nom) {
					// ANNULE LE XHR2.SEND
				}
			}
		};
		xhr2.send(JSON.stringify(data));
		event.preventDefault();
	}
	render() {
		return (
			<div  className="m-auto px-2">
				<h3>Ajouter du matériel en tant qu'administrateur</h3>
				<form id="formAjouterMateriel" onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>Veuillez remplir les champs ci-dessous pour ajouter du matériel.</legend>
						<div className="form-group">
							<label htmlFor="nom">Entrez le nom du matériel</label>
							<input type="text" className="form-control w-25" id="nom" placeholder="Nom du matériel" required/>
						</div>
						<div className="form-group">
							<label htmlFor="categorie">Choisissez la catégorie</label>
							<select className="form-control w-25" id="categorie" name="select" required>
								<option value="1">Caisson</option>
								<option value="2">Top 2 voies</option>
								<option value="3">Ampli</option>
								<option value="4">Processeur</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="prix">Entrez le prix</label>
							<input type="number" name="prix" className="form-control w-25" id="prix" min="0"
								   placeholder="0" required/>
						</div>
						<div className="form-group">
							<label htmlFor="nombre">Entrez le nombre d'articles</label>
							<input type="number" name="nombre" className="form-control w-25" id="nombre" min="0"
								   placeholder="0" required/>
						</div>
						<div className="form-group">
							<label htmlFor="description">Entrez la description du matériel</label>
							<textarea type="text" className="form-control" rows="2" id="description" placeholder="Description du matériel" required></textarea>
						</div>
						<input type="submit" className="btn btn-light" id="buttonSubmit" value={"Ajouter matériel"} />
					</fieldset>
				</form>
			</div>
		);
	}
}

function ajoutMateriel() {
	ReactDOM.render(<AjoutMateriel/>,document.getElementById("conteneur"));
}


class Commande extends React.Component {
	constructor(props) {
		super(props);
		this.creerCommande = this.creerCommande.bind(this);
	}

	creerCommande(mail){
		let commandeUtilis = "";
		console.log(typeof mail.target.value);

		JSON.parse(commandes).forEach((item)=>{
			console.log(typeof item.id_commande);
			if(Number(mail.target.value)  === item.id_commande){
				console.log("toto");
				commandeUtilis+= "<tr><td scope='row'>"+item.nom+"</td><td>"+item.nombre+"</td><td>"+item.prix+"</td> </tr>";
			}

		});

		document.getElementById("recapCommande"+mail.target.value).innerHTML = commandeUtilis;

	}
	render() {
		return(
			<React.Fragment>
				<tr>

					<td>{this.props.commande[1]}</td>
					<td scope="row">{this.props.commande[0]}</td>
					<td>{this.props.prix}</td>
					<td>
						<button className="btn btn-primary" type="button" data-toggle="collapse" onClick={this.creerCommande} value={this.props.commande[0]}
								data-target={"#"+this.props.commande[0]} aria-expanded="false" aria-controls="collapseExample" >
							V
						</button></td>
				</tr>
				<tr className="collapse infoC" id={this.props.commande[0]} >
					<td colSpan="4" className="infoCommande" >
						<table className="table">
							<thead>
							<tr>
								<th scope="col">Matériel</th>
								<th scope="col">Nombre</th>
								<th scope="col">Prix</th>
								<th scope="col"></th>
							</tr>
							</thead>
							<tbody id={"recapCommande"+this.props.commande[0]}>

							</tbody>
						</table>
					</td>

				</tr>
			</React.Fragment>
		);

	}
}

class AfficherCommande extends React.Component {
	constructor(props){
		super(props);

	}

	render() {
		const rows = [];
		for(let key in this.props.commande){
			rows.push(
				<Commande key={Number(key.replace("c", ""))} commande = {[Number(key.replace("c", "")),this.props.commande[key][0]]} prix = {this.props.commande[key][1]}/>
			);
		}


		return (
			<div  className="overflow">

				<table className="table">
					<thead>
					<tr>
						<th scope="col">Mail</th>
						<th scope="col">ID commande</th>
						<th scope="col">prix</th>
						<th scope="col"></th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</table>

			</div>
		);
	}
}
function afficherCommande() {
	let commandeDiff = {};
	JSON.parse(commandes).forEach((item)=>{
		if(!("c"+item.id_commande  in commandeDiff)){
			commandeDiff["c"+item.id_commande] = [item.adressemail, item.prix];
		}
		else {
			commandeDiff["c"+item.id_commande][1] += item.prix;
		}
	});
	ReactDOM.render(<AfficherCommande commande={commandeDiff}/>,document.getElementById("conteneur"));
}

