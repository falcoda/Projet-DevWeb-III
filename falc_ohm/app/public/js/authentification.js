//******************************************************************************
//  Cookie Functions -- "Night of the Living Cookie" Version (25-Jul-96)
//  Written by:  Bill Dortch, hIdaho Design <bdortch@hidaho.com>


//  "Internal" function to return the decoded value of a cookie
function getCookieVal (offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}


//  Function to return the value of the cookie specified by "name".
//    name -    String object containing the cookie name.
//    returns - String object containing the cookie value,
//              or null if the cookie does not exist.
//
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


//  Function to create or update a cookie.
//    name - String object containing the cookie name.
//    value - String object containing the cookie value.  May contain
//         any valid string characters.
//    [expires] - Date object containing the expiration data of the cookie.  If
//         omitted or null, expires the cookie at the end of the current session.
//    [path] - String object indicating the path for which the cookie is valid.
//         If omitted or null, uses the path of the calling document.
//    [domain] - String object indicating the domain for which the cookie is
//         valid. If omitted or null, uses the domain of the calling document.
//    [secure] - Boolean (true/false) value indicating whether cookie
//         transmission requires a secure channel (HTTPS).
//
//  The first two parameters are required.  The others, if supplied, must
//  be passed in the order listed above.  To omit an unused optional field,
//  use null as a place holder.  For example, to call SetCookie using name,
//  value and path, you would code:
//
//      SetCookie ("myCookieName", "myCookieValue", null, "/");
//
//  Note that trailing omitted parameters do not require a placeholder.
//
//  To set a secure cookie for path "/myPath", that expires after the
//  current session, you might code:
//
//      SetCookie (myCookieVar, cookieValueVar, null, "/myPath", null, true);
//
function SetCookie (name,value,expires,path,domain,secure) {
	document.cookie = name + "=" + escape (value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}


//  Function to delete a cookie. (Sets expiration date to start of epoch)
//    name -   String object containing the cookie name
//    path -   String object containing the path of the cookie to delete.
//             This MUST be the same as the path used to create the cookie, or
//             null/omitted if no path was specified when creating the cookie.
//    domain - String object containing the domain of the cookie to delete.
//             This MUST be the same as the domain used to create the cookie, or
//             null/omitted if no domain was specified when creating the cookie.
//
/*
function DeleteCookie (name,path,domain) {
	if (GetCookie(name)) {
		document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}
*/
//******************************************************************************

let form1 = document.getElementById("formConnexion");
let form2 = document.getElementById("formInscription");
let adressemail1 = document.getElementById("adressemail1");
let motdepasse1 = document.getElementById("motdepasse1");
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let numerotel = document.getElementById("numerotel");
let adressemail2 = document.getElementById("adressemail2");
let motdepasse2 = document.getElementById("motdepasse2");
let confirmation = document.getElementById("confirmation");

form1.addEventListener("submit", (param)=>{
	param.preventDefault();

	let data1 = {
		adressemail1: adressemail1.value,
		motdepasse1: motdepasse1.value,
	};

	console.log(data1);

	let tableUtilisateurs = [];

	let xhr = new XMLHttpRequest();

	xhr.open("GET", "http://localhost/utilisateurs");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function () {
		console.log(xhr.responseText);
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
				// eslint-disable-next-line no-undef
				utilisateurConnecte = GetCookie("connexion");
				console.log("succès");
				break;
			}
			// eslint-disable-next-line no-cond-assign
			else if (compteur == tableUtilisateurs.length) {
				// MESSAGE D'ERREUR
			}

		}
	};
	xhr.send();
});

form2.addEventListener("submit", (param)=>{
	param.preventDefault();

	let data2 = {
		nom: nom.value,
		prenom: prenom.value,
		numerotel: numerotel.value,
		adressemail2: adressemail2.value,
		motdepasse2: motdepasse2.value,
		confirmation: confirmation.value
	};

	console.log(data2);

	let tableUtilisateurs = [];

	let xhr = new XMLHttpRequest();

	xhr.open("GET", "http://localhost/utilisateurs");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function () {
		console.log(xhr.responseText);
		tableUtilisateurs =  JSON.parse(xhr.responseText);
	};
	xhr.send();

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
					// eslint-disable-next-line no-undef
					utilisateurConnecte = GetCookie("connexion");
					// eslint-disable-next-line no-undef
					if (utilisateurConnecte != 0){
						console.log("le cookie est bien sur " + GetCookie("connexion"));
					}
					console.log("utilisateur bien créé");
				}
			}
		};
		xhr.send(JSON.stringify(data2));
	}
});



/*
class buttonSubmit1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };
    }

    render() {
        if (this.state.clicked) {
            return <div><button type="submit" className="btn btn-light" onClick={() => this.setState({clicked: true})}>
                Envoyer
            </button>
                Message bien envoyé
            </div>
        }

        return <button type="submit" class="btn btn-light" onClick={() => this.setState({clicked: true})}>
            Envoyer
        </button>
    }
}

const domContainer = document.querySelector('#buttonSubmit1');
ReactDOM.render(React.createElement(buttonSubmit1), domContainer);
*/