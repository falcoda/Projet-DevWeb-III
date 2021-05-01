
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



let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost/liste_utilisateur");
xhr.onload = function() {
	ReactDOM.render(
		<ListeUtilis utilisateurs={JSON.parse(xhr.responseText)} />,
		document.getElementById("listeUtilis")
	);
};
xhr.send();
