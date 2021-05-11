class Connexion extends React.Component {
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
					// eslint-disable-next-line no-undef
					utilisateurConnecte = GetCookie("connexion");
					motdepasse = GetCookie("motdepasse");
					console.log("succès");
					document.location.href="profil"
					break;
				}
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
			<form id="formConnexion" onSubmit={this.handleSubmit}>
				<h1>Authentification</h1>
				<fieldset>
					<legend>Connexion</legend>
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
					<input type="submit" className="btn btn-light" id="buttonSubmit" value={"Connexion"}/>
				</fieldset>
			</form>
		);
	}
}

class Inscription extends React.Component {
	state = {
		nom: "",
		prenom: "",
		numerotel: "",
		adressemail2: "",
		motdepasse2: "",
		confirmation: ""
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
		let numerotel = document.getElementById("numerotel");
		let adressemail2 = document.getElementById("adressemail2");
		let motdepasse2 = document.getElementById("motdepasse2");
		let confirmation = document.getElementById("confirmation");

		let data2 = {
			nom: nom.value,
			prenom: prenom.value,
			numerotel: numerotel.value,
			adressemail2: adressemail2.value,
			motdepasse2: motdepasse2.value,
			confirmation: confirmation.value
		};

		if (data2.motdepasse2.length >= 8 && data2.motdepasse2 == data2.confirmation) {
			let xhr = new XMLHttpRequest();
			xhr.open("POST", "http://localhost/inscription");
			xhr.setRequestHeader("content-type", "application/json");
			xhr.onload = function () {
				let compteur = 0;
				let check = true;
				for (let i of tableUtilisateurs) {
					compteur++;
					if (data2.adressemail2 == i.adressemail) {
						check = false;
						// MESSAGE D ERREUR
						break;
					}

					if (check && compteur == tableUtilisateurs.length) {
						let duree_cookie = 100;         // durée de vie du cookie en jours
						let expiration = new Date();    // date et heure courante en format texte
						expiration.setTime(expiration.getTime() + (duree_cookie * 24*60*60*1000));
						// => on peut utiliser la variable "expiration"
						SetCookie ("connexion",data2.adressemail2,expiration,null,null,false);
						SetCookie ("motdepasse",data2.motdepasse2,expiration,null,null,false);
						// eslint-disable-next-line no-undef
						utilisateurConnecte = GetCookie("connexion");
						motdepasse = GetCookie("motdepasse");
						// eslint-disable-next-line no-undef
						if (utilisateurConnecte != 0){
							console.log("le cookie est bien sur " + GetCookie("connexion"));
				if(xhr.responseText == "success") {
					document.getElementById("adressemail2").classList.remove("is-invalid");
					adressemail2.value = "";
				}
				else{
					let isInvalid = xhr.responseText.split("-") ;
					console.log(isInvalid);
					for(let i of isInvalid) {
						if (i === "adressemail2Invalid") {
							document.getElementById("adressemail2").classList.add("is-invalid");
						}
					}
				}

				let duree_cookie = 100;         // durée de vie du cookie en jours
				let expiration = new Date();    // date et heure courante en format texte
				expiration.setTime(expiration.getTime() + (duree_cookie * 24*60*60*1000));
				// => on peut utiliser la variable "expiration"
				SetCookie ("connexion",data2.adressemail2,expiration,null,null,false);
				// eslint-disable-next-line no-undef
				utilisateurConnecte = GetCookie("connexion");
				// eslint-disable-next-line no-undef
				if (utilisateurConnecte != 0){
					console.log("le cookie est bien sur " + GetCookie("connexion"));
				}
				console.log("utilisateur bien créé");
			};
			xhr.send(JSON.stringify(data2));
			event.preventDefault();

		}
	}
	render() {
		return (
			<form id="formInscription" onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>Inscription</legend>
					<div className="form-group">
						<label htmlFor="nom">Entrez votre nom</label>
						<input type="text" className="form-control w-25" id="nom" placeholder="Nom" required/>
					</div>
					<div className="form-group">
						<label htmlFor="prenom">Entrez votre prénom</label>
						<input type="text" className="form-control w-25" id="prenom" placeholder="Prénom" required/>
					</div>
					<div className="form-group">
						<label htmlFor="numerotel">Entrez votre numéro de téléphone</label>
						<input type="tel" className="form-control w-25" id="numerotel" pattern="^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$"
							   placeholder="(+32)499 999999" required/>
					</div>
					<div className="form-group">
						<label htmlFor="adressemail2">Entrez votre adresse mail</label>
						<input type="email" className="form-control w-25" id="adressemail2"
							   placeholder="Adresse mail"
							   required/>
					</div>
					<div className="form-group">
						<label htmlFor="motdepasse2">Entrez votre mot de passe</label>
						<input type="password" className="form-control w-25" id="motdepasse2"
							   placeholder="Mot de passe"
						<input type="password" className="form-control w-25" id="motdepasse2" placeholder="Min. 8 caractères" minlength="8"
							   required/>
					</div>
					<div className="form-group">
						<label htmlFor="confirmation">Veuillez confirmer votre mot de passe</label>
						<input type="password" className="form-control w-25" id="confirmation" minlength="8"
							   placeholder="Confirmation du mot de passe" required/>
					</div>
					<input type="submit" className="btn btn-light" id="buttonSubmit2" value={"Inscription"}/>
				</fieldset>
			</form>
		);
	}
}

class PageAuthentification extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	render() {
		if (utilisateurConnecte == null) {
			return (
				<div id="content" className="m-auto px-2">
					<React.Fragment>
						<Connexion/>
						<Inscription/>
					</React.Fragment>
				</div>
			);
		}
		else {
			return (
				<div id="content" className="m-auto px-2">
					<h3>Vous êtes déjà connecté.</h3>
				</div>
			)
		}
	}
}

ReactDOM.render(<PageAuthentification/>,document.getElementById("PageAuthentification"));