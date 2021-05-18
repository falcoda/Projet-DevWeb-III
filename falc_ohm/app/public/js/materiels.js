import React from "react"
import ReactDOM from "react-dom";

/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
class MaterielCard extends React.Component {
	render() {
		const materiel = this.props.materiel;
		const image = (materiel.nom_categorie == "ampli" || materiel.nom_categorie == "processeur") ? "img/ampli.jpg" : "img/"+ materiel.nom +".jpg";
		const nom = materiel.nom;
		const description = materiel.description;

		return (
			<div className="card_container">
				<div className="card">
					<div className="card_front">
						<img src={image} className={"photo"}/>
					</div>
					<div className="card_back">
						<p>{description}</p>
					</div>
				</div>
				<div className="card_info">
					<p>{nom}</p>
				</div>
			</div>
		);
	}
}

class MaterielsTable extends React.Component {
	render() {
		const filtre = this.props.filtre;
		const rows = [];

		this.props.materiels.forEach((product) => {
			if(product.nom_categorie == filtre || filtre == "All"){
				rows.push(
					<MaterielCard key={product.nom} materiel={product}/>
				);
			}
		});
		return <div id={"materielsTable"}>{rows}</div>;
	}
}

class TypeSelect extends React.Component {

	constructor(props){
		super(props);
		this.changerFiltre = this.changerFiltre.bind(this);
	}

	changerFiltre(e) {
		this.props.changementFiltre(e.target.value);
	}

	render() {
		return (
			<div id={"typeSelect"}>
				<label>Sélectionner une catégorie </label>
				<select className={"form-control selcls"} id={"gender1"} value={this.props.filtre} onChange={this.changerFiltre}>
					<option value={"All"}>All</option>
					<option value={"caisson"}>Caisson</option>
					<option value={"ampli"}>Ampli</option>
					<option value={"processeur"}>Processeur</option>
					<option value={"top 2 voies"}>Top 2 voies</option>
				</select>
			</div>
		);
	}
}

export default class PageMateriels extends React.Component {
	constructor(props){
		super(props);
		this.state = {filtre: "All"};
		this.changerFiltre = this.changerFiltre.bind(this);
	}


	changerFiltre(filtre) {
		this.setState({
			filtre: filtre
		});
	}

	render() {
		return (
			<React.Fragment>
				<TypeSelect filtre={this.state.filtre} changementFiltre={this.changerFiltre}/>
				<MaterielsTable materiels={this.props.materiels} filtre={this.state.filtre}/>
			</React.Fragment>
		);
	}
}


let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost/materiel/json");
xhr.onload = function() {
	ReactDOM.render(
		<PageMateriels materiels={JSON.parse(xhr.responseText)} />,
		document.getElementById("container2")
	);
};
xhr.send();