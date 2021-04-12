class FormsPage extends React.Component {
	state = {
		nom: "",
		prenom: "",
		email: "",
		message: "",

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
		let prenom = document.getElementById("prenom");
		let mail = document.getElementById("email");
		let commentaire = document.getElementById("commentaire");

		let data = {
			nom: nom.value,
			prenom: prenom.value,
			mail: mail.value,
			commentaire: commentaire.value,
		};

		console.log(data);

		let xhr = new XMLHttpRequest();

		xhr.open("POST", "/mail");
		xhr.setRequestHeader("content-type", "application/json");
		xhr.onload = function () {
			console.log(xhr.responseText);
			if(xhr.responseText == "success") {
				alert("Mail envoyé avec success");


				nom.value= "";
				prenom.value= "";
				mail.value = "";
				commentaire.value = "";
			}
			else if(xhr.responseText === "comInvalid") {
				alert("comInvalid");
				document.getElementById("nom").innerHTML = <input type="email" className="form-control form-control-lg w-25 notValid" defaultValue="j@mail.com" id="email"
																  placeholder="email" required/>
			}
			else if(xhr.responseText === "mailInvalid") {
				alert("mailInvalid");
			}
			else if(xhr.responseText === "nomInvalid") {
				alert("identiteInvalid");
				document.getElementById("nom").classList.add("is-invalid");
			}
			else if(xhr.responseText === "prenomInvalid") {
				alert("identiteInvalid");
				document.getElementById("prenom").classList.add("is-invalid");
			}
			else if(xhr.responseText === "succes") {
				document.getElementById("prenom").classList.remove("is-invalid");
				document.getElementById("nom").classList.remove("is-invalid");
				document.getElementById("mail").classList.remove("is-invalid");
			}

		};
		xhr.send(JSON.stringify(data));
		event.preventDefault();
	}

	render() {
		return (

			<div id="content" className="m-auto px-2">
				<h1>Contact</h1>
				<form id="formContact" className="needs-validation"
					onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>Pour tout renseignement supplémentaire, veuillez nous contacter</legend>

						<div className="form-group">
							<label htmlFor="nom">Entrez votre nom</label>
							<input value={this.state.value} onChange={this.handleChange} type="text" className="form-control w-25" id="nom" placeholder="Nom" />
							<div className="valid-feedback">Looks good!</div>
						</div>
						<div className="form-group">
							<label htmlFor="prenom">Entrez votre prenom</label>
							<input type="text" className="form-control w-25" id="prenom" placeholder="Prénom" />
						</div>

						<div className="form-group">
							<label htmlFor="email">Entrez votre mail</label>
							<input type="email" className="form-control form-control-lg w-25"  id="email"
								   placeholder="email" required/>
						</div>

						<div className="form-group">
							<label htmlFor="bio">Commentaire</label>
							<textarea className="form-control " id="commentaire" rows="5" ></textarea>
						</div>
						<input type="submit" className="btn btn-light" id="buttonSubmit" value={"envoyer"} />


					</fieldset>

				</form>

			</div>
		);
	}
}


ReactDOM.render(<FormsPage/>,document.getElementById("FormsPage"));

