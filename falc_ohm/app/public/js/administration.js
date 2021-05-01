class listeUtilis extends React.Component {
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


ReactDOM.render(<listeUtilis/>,document.getElementById("listeUtilis"));


