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
						<button onClick={afficherPanier} id="bouton_panier" className="btn btn-light ml-1 mr-1">Panier</button>
						<button onClick={afficherCommande} id="bouton_commande" className="btn btn-light ml-1 mr-1"> Commande </button>
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
xhr_commande.open("POST", "http://localhost/commande?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
xhr_commande.setRequestHeader("content-type", "application/json");
xhr_commande.onload = function() {
	commandes=xhr_commande.responseText;
};
xhr_commande.send(JSON.stringify({mail :utilisateurConnecte}));
console.log(commandes);
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

				<button onClick={passerCommande} className="btn btn-light ml-1 mr-1">Commander </button>
				<button onClick={viderPanier} className="btn btn-light ml-1 mr-1">Vider le panier </button>

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
	xhr.onload = function() {
		if (xhr.responseText === "valide"){
			document.getElementsByClassName("utilis")[0].innerHTML = "<p> Merci de votre commande</p>"
		}
	};

	xhr.send(JSON.stringify({mail :utilisateurConnecte}));



}

function viderPanier(){
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost/reset-panier?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function() {
		if (xhr.responseText === "error"){
			alert("Vous possédez aucun panier, veuillez en créer un");
		}

	};

	xhr.send(JSON.stringify({mail :utilisateurConnecte}));

	location.reload();


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
						<button className="btn btn-light" type="button" data-toggle="collapse" onClick={this.creerCommande} value={this.props.commande[0]}
								data-target={"#"+this.props.commande[0]} aria-expanded="false" aria-controls="collapseExample" >
							Détail
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
				<Commande key={Number(key.replace("c", ""))} commande = {[Number(key.replace("c", "")),this.props.commande[key][0]]} prix = {this.props.commande[key][1]} date = {this.props.commande[key][2]}/>
			);
		}


		return (
			<div  className="overflow">

				<table className="table">
					<thead>
					<tr>
						<th scope="col">Date</th>
						<th scope="col">ID</th>
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
	JSON.parse(commandes).forEach((item)=>{
		if(item.adressemail ===utilisateurConnecte && !("c"+item.id_commande in commandeDiff)){
			commandeDiff["c"+item.id_commande] = [item.adressemail, item.prix ,date(item.date)];
		}
		else if("c"+item.id_commande in commandeDiff){
			commandeDiff["c"+item.id_commande][1] += item.prix;
		}

	});

	ReactDOM.render(<AfficherCommande commande={commandeDiff}/>,document.getElementById("conteneur"));
}

