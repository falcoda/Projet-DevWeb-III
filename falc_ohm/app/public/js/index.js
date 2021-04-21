
let utilisateurConnecte = GetCookie("connexion");
console.log("session sur " +utilisateurConnecte);

function GetCookie (name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal (j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}


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

function render() {
	const navbar =<div id="head">

		<nav className="navbar navbar-expand-lg  navbar-light bg-light">
			<a className="navbar-brand" href="/">
				<img  id="logoEnTete" src="img/falcohm_logo.png" alt="logo de la page" width="75px" height="75px"></img>
				FALC'OHM SYSTEM
			</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse"
					data-target="#navbarnav" aria-controls="navbarnav" aria-expanded="false"
					aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarnav">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link" href="/">A Propos<span className="sr-only">(current)</span></a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="contact">Contacts</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="materiel">Matériels</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="authentification">Authentification</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="devis">Devis</a>
					</li>
				</ul>

			</div>
		</nav>



	</div>;
	ReactDOM.render(navbar,document.querySelector("#container"));
}
render();