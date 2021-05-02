/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */

let materiel;
let users;

let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost/liste_utilisateur");
xhr.onload = function() {
	users=xhr.responseText;
	class Bouttons extends React.Component {

		render(){
			return (
				<React.Fragment>
					<button onClick={afficherUtilis}>Liste utilisateurs</button>
					<button onClick={nombreMateriel}> Nombre matériel </button>
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
xhr_materiel.open("GET", "http://localhost/materiel/json");
xhr_materiel.onload = function() {
	materiel=xhr_materiel.responseText;

};
xhr_materiel.send();




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

	xhr.open("POST", "/nombre_materiel");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function () {

	};
	xhr.send(JSON.stringify(data));

}