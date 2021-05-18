let utilisateurConnecte = GetCookie("connexion");

let panier_utilis;

let xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost/panier?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
xhr.setRequestHeader("content-type", "application/json");
xhr.onload = function() {
	panier_utilis=xhr.responseText;
	class Bouttons extends React.Component {

		render(){
			if (utilisateurConnecte != null) {
				return (
					<React.Fragment>
						<div className="m-auto px-2">
							<h1>Profil de {utilisateurConnecte}</h1>
						</div>
						<button onClick={afficherPanier}>Panier</button>
						<button onClick={afficherInfos}> informations </button>
						<button onClick={afficherCommande}> commande </button>
					</React.Fragment>);
			}
			else {
				return (
					<div id="content" className="m-auto px-2">
						<h3>Vous n'êtes pas connecté.</h3>
					</div>
				)
			}
		}
	}
	ReactDOM.render(
		<Bouttons/>,
		document.getElementById("bouttons")

	);

};

xhr.send(JSON.stringify({mail :utilisateurConnecte}));

let commandes;
let xhr_commande = new XMLHttpRequest();
xhr_commande.open("GET", "http://localhost/commande?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
xhr_commande.onload = function() {
	commandes=xhr_commande.responseText;
};
xhr_commande.send(JSON.stringify({mail :utilisateurConnecte}));

class Panier extends React.Component {


	constructor(props) {
		super(props);
	}
	render() {
		return(
			<React.Fragment>
				<tr>
					<th scope="row">{this.props.nombre +1}</th>
					<td>{this.props.panierElem.nom}</td>
					<td>{this.props.panierElem.nombre}</td>
				</tr>
			</React.Fragment>
		);

	}
}



class PanierUtilis extends React.Component {
	constructor(props){
		super(props);

	}

	render() {
		const rows = [];
		this.props.panier.forEach((elem, index) => {

			rows.push(
				<Panier key={elem.nom} panierElem = {elem} nombre={index}/>
			);

		});

		return (
			<div id={"utilisateurs"} className="overflow utilis">

				<table className="table table-striped">
					<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nom</th>
						<th scope="col">Nombre</th>

					</tr>
					</thead>
					<tbody>
					{rows}

					</tbody>
				</table>

				<button onClick={passerCommande} className="btn btn-secondary">Commander </button>

			</div>
		);
	}
}

function afficherPanier() {
	ReactDOM.render(
		<PanierUtilis panier={JSON.parse(panier_utilis)} />,

		document.getElementById("conteneur")
	);
}

function afficherInfos() {
	console.log(JSON.parse(panier_utilis));
}


function passerCommande() {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost/commande-utilisateur?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function() {};

	xhr.send(JSON.stringify({mail :utilisateurConnecte}));

}
class Commande extends React.Component {
	constructor(props) {
		super(props);
		this.creerCommande = this.creerCommande.bind(this);
	}

	creerCommande(mail){
		let commandeUtilis = "";


		JSON.parse(commandes).forEach((item)=>{

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

					<td>{this.props.date}</td>
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
				<Commande key={key} commande = {[key,this.props.commande[key][0]]} prix = {this.props.commande[key][1]} date = {this.props.commande[key][2]}/>
			);
		}


		return (
			<div  className="overflow">

				<table className="table">
					<thead>
					<tr>
						<th scope="col">Date</th>
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
function date(param) {
	var today = new Date(param);
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + "/" + mm + "/" + yyyy;
	return today;
}
function afficherCommande() {
	let commandeDiff = {};
	console.log(JSON.parse(commandes));
	JSON.parse(commandes).forEach((item)=>{
		if(item.adressemail ===utilisateurConnecte && !(item.id_commande in commandeDiff)){
			commandeDiff[item.id_commande] = [item.adressemail, item.prix ,date(item.date)];
		}
		else if(item.id_commande in commandeDiff){
			commandeDiff[item.id_commande][1] += item.prix;
		}

	});
	console.log(commandeDiff);
	ReactDOM.render(<AfficherCommande commande={commandeDiff}/>,document.getElementById("conteneur"));
}

class ChangerUtilisateur extends React.Component {
	state = {
		adressemail1: "",
		motdepasse1: "",
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
		let adressemail1 = document.getElementById("adressemail1");
		let motdepasse1 = document.getElementById("motdepasse1");

		let data1 = {
			adressemail1: adressemail1.value,
			motdepasse1: motdepasse1.value,
		};

		console.log(data1);

		let tableUtilisateurs =[];
		let xhr = new XMLHttpRequest();

		xhr.open("GET", "http://localhost/utilisateurs");
		xhr.setRequestHeader("content-type", "application/json");
		xhr.onload = function () {
			tableUtilisateurs =  JSON.parse(xhr.responseText);
			let compteur = 0;
			for (let i of tableUtilisateurs) {
				compteur++;
				if (data1.adressemail1 == i.adressemail && data1.motdepasse1 == i.motdepasse) {
					let duree_cookie = 100;         // durée de vie du cookie en jours
					let expiration = new Date();    // date et heure courante en format texte
					expiration.setTime(expiration.getTime() + (duree_cookie * 24*60*60*1000));
					// => on peut utiliser la variable "expiration"
					SetCookie ("connexion",data1.adressemail1,expiration,null,null,false);
					SetCookie ("motdepasse",data1.motdepasse1,expiration,null,null,false);
					utilisateurConnecte = GetCookie("connexion");
					motdepasse = GetCookie("motdepasse");
					console.log("succès");
					document.location.href="profil"
					break;
				}
				// eslint-disable-next-line no-cond-assign
				else if (compteur == tableUtilisateurs.length) {
					// MESSAGE D'ERREUR
				}

			}
		};
		xhr.send();
		event.preventDefault();
	}
	render() {
		return (
			<div  className="m-auto px-2">
				<form id="formChangerUtilisateur" onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>Changer d'utilisateur</legend>
						<div className="form-group">
							<label htmlFor="adressemail1">Entrez votre adresse mail</label>
							<input type="email" className="form-control w-25" id="adressemail1"
								   placeholder="Adresse mail" required/>
						</div>
						<div className="form-group">
							<label htmlFor="motdepasse1">Entrez votre mot de passe</label>
							<input type="password" className="form-control w-25" id="motdepasse1"
								   placeholder="Mot de passe" required/>
						</div>
						<input type="submit" className="btn btn-light" id="buttonSubmit" value={"Changer d'utilisateur"} />
					</fieldset>
				</form>
			</div>
		);
	}
}

class Deconnexion extends React.Component {
	handleSubmit(event) {
		DeleteCookie ("connexion",null,null);
		DeleteCookie ("motdepasse",null,null);
		document.location.href = "authentification";
	}
	render() {
		return (
			<div  className="m-auto px-2">
				<form id="formDeconnexion" onSubmit={this.handleSubmit}>
					<fieldset>
						<input type="submit" className="btn btn-light" id="buttonSubmit2" value={"Déconnexion"} />
					</fieldset>
				</form>
			</div>
		);
	}
}

class Profil extends React.Component {
	render(){
		if (utilisateurConnecte != null) {
			return (
				<React.Fragment>
					<div id="content" className="m-auto px-2">
						<ChangerUtilisateur/><br/>
						<Deconnexion/>
					</div>
				</React.Fragment>)
		}
		else {
			return (
				<div id="content" className="m-auto px-2" hidden>
				</div>
			)
		}
	}
}

ReactDOM.render(<Profil/>,document.getElementById("profil"));