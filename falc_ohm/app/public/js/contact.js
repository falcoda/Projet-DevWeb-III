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
			console.log("coucou");
			if(xhr.responseText == "success") {
				alert("Mail envoyé avec success");
				document.getElementById("prenom").classList.remove("is-invalid");
				document.getElementById("nom").classList.remove("is-invalid");
				document.getElementById("email").classList.remove("is-invalid");
				document.getElementById("commentaire").classList.remove("is-invalid");
				nom.value= "";
				prenom.value= "";
				mail.value = "";
				commentaire.value = "";
			}



			else{
				let isInvalid = xhr.responseText.split("-") ;
				console.log(isInvalid);
				for(let i of isInvalid){
					if(i === "comInvalid") {
						document.getElementById("commentaire").classList.add("is-invalid");
					}
					else if(i === "mailInvalid") {
						document.getElementById("email").classList.add("is-invalid");
					}
					else if(i === "nomInvalid") {
						document.getElementById("nom").classList.add("is-invalid");
					}
					else if(i === "prenomInvalid") {
						document.getElementById("prenom").classList.add("is-invalid");
					}
				}
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


var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var circle = L.circle([51.508, -0.11], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5,
	radius: 500
}).addTo(mymap);