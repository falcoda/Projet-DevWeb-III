
let panier_utilis;

let xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost/panier");
xhr.setRequestHeader("content-type", "application/json");
xhr.onload = function() {
	panier_utilis=xhr.responseText;
	class Bouttons extends React.Component {

		render(){
			return (
				<React.Fragment>
					<button onClick={afficherPanier}>Panier</button>
					<button onClick={afficherInfos}> informations </button>
					<button onClick={afficherCommande}> commande </button>
				</React.Fragment>);
		}
	}
	ReactDOM.render(
		<Bouttons/>,
		document.getElementById("bouttons")

	);

};

xhr.send(JSON.stringify({mail :utilisateurConnecte}));


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

function afficherCommande() {

}