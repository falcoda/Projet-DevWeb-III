/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

function changeHead() { // animation visuelles au niveau de la photo de couverture et de  la barre d'état



	if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {  //lorsqu'on descend de 180 px
		document.getElementById("imgCouv").style.transform = "scale(1.20)";  //augmenter l'échelle

	}
	else {                                                                                 //quand on remonte
		document.getElementById("imgCouv").style.transform = "scale(1)";
	}

}

function zoomeIn(n) {    //zoom lors du passage sur les images
	document.getElementsByClassName("zoom")[n].style.transform= "scale(0.90)";
	document.getElementsByClassName("zoom")[n].style.transition= "all .3s";
}
function zoomOut(n) {  // dézoom lorsque la souris sort de la photo
	document.getElementsByClassName("zoom")[n].style.transform= "scale(1)";
	document.getElementsByClassName("zoom")[n].style.transition= "all .3s";
}

function renderSiPasConnecte() {
	const navbar =<div id="head">
		<title>falc'ohm system</title>
		<nav className="navbar navbar-expand-lg fixed-top bg-light ">
			<div className="container-fluid">
				<div className="navbar-header">
					<a className="navbar-brand" href="/">
						<img  id="logoEnTete" src="img/falcohm_logo.png" alt="logo de la page" width="75px" height="75px"></img>
						FALC'OHM SYSTEM
					</a>
				</div>

				<ul className="nav navbar-nav">
					<li className="nav-item"><a href="/" className="nav-link">A Propos</a></li>
					<li className="nav-item"><a href="contact" className="nav-link">Contacts</a></li>
					<li className="nav-item"><a href="materiel" className="nav-link">Matériels</a></li>
					<li className="nav-item"><a href="authentification" className="nav-link">Authentification</a></li>
					<li className="nav-item"><a href="devis" className="nav-link">Devis</a></li>
				</ul>

			</div>

		</nav>

	</div>;
	ReactDOM.render(navbar,document.querySelector("#container"));
}

function renderSiConnecte() {
	const navbar =<div id="head">
		<title>falc'ohm system</title>
		<nav className="navbar navbar-expand-lg fixed-top bg-light ">
			<div className="container-fluid">
				<div className="navbar-header">
					<a className="navbar-brand" href="/">
						<img  id="logoEnTete" src="img/falcohm_logo.png" alt="logo de la page" width="75px" height="75px"></img>
						FALC'OHM SYSTEM
					</a>
				</div>

				<ul className="nav navbar-nav">
					<li className="nav-item"><a href="/" className="nav-link">A Propos</a></li>
					<li className="nav-item"><a href="contact" className="nav-link">Contacts</a></li>
					<li className="nav-item"><a href="materiel" className="nav-link">Matériels</a></li>
					<li className="nav-item"><a href="devis" className="nav-link">Devis</a></li>
					<li className="nav-item"><a href="profil"><img id="logoProfil" src="img/profil.png" alt="icone de profil" width="50px" height="50px"></img></a></li>
				</ul>

			</div>

		</nav>

	</div>;
	ReactDOM.render(navbar,document.querySelector("#container"));
}

if (utilisateurConnecte == null) {
	renderSiPasConnecte();
}

if (utilisateurConnecte != null) {
	renderSiConnecte();
}