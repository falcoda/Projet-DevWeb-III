/*
let form1 = document.getElementById("formConnexion");
let form2 = document.getElementById("formInscription");
let adressemail1 = document.getElementById("adressemail1");
let motdepasse1 = document.getElementById("motdepasse1");
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let numerotel = document.getElementById("numerotel");
let adressemail2 = document.getElementById("adressemail2");
let motdepasse2 = document.getElementById("motdepasse2");

form1.addEventListener("submit", (param)=>{
    param.preventDefault();

    let data1 = {
        adressemail1: adressemail1.value,
        motdepasse1: motdepasse1.value,
    };

    console.log(data1);

    let tableUtilisateurs = [];

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/utilisateurs");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
        console.log(xhr.responseText);
        tableUtilisateurs =  JSON.parse(xhr.responseText);
        let compteur = 0;
        for (let i of tableUtilisateurs) {
            compteur++;
            if (adressemail1.value == i.utilisateur && motdepasse1.value == i.motdepasse) {
                // CODE POUR FAIRE LES COOKIES
            }
            else if (compteur = tableUsers.length) {
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
    };

    console.log(data2);

    let tableUtilisateurs = [];

    let nom = form2.nom.value;
    let prenom = formualire.prenom.value;
    let pseudo = formualire.pseudo.value;
    let motDePasse = formualire.motDePasse.value;
    let confirmation = formualire.confirmation.value;
    let adresseMail = formualire.adresseMail.value;
    let date = formualire.date.value;
    let genre = formualire.genre.value;

    if (motDePasse.length >= 8 && motDePasse == confirmation) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost/get_usersTable', true);
        xhr.onload = function jsonToTable() {
            let compteur = 0;
            let check = true;
            tableUtilisateurs =  JSON.parse(xhr.responseText);
            for (let i of tableUsers) {
                compteur++;
                if (pseudo == i.userPseudo || adresseMail == i.userMail) {
                    check = false;
                    getElemId('messageErreur1').hidden= false;
                    getElemId('messageErreur2').hidden= true;
                    break;
                }

                if (check && compteur == tableUsers.length){
                    let xhr2 = new XMLHttpRequest;
                    xhr2.open('get', 'http://localhost/get_createUser?nom=' + nom + '&prenom=' + prenom + '&pseudo=' + pseudo + '&motDePasse=' + motDePasse + '&mail=' + adresseMail + '&naissance=' + date + '&sexe='+ genre, true);
                    xhr2.send();
                    formualire.nom.value = "";
                    formualire.prenom.value="";
                    formualire.pseudo.value="";
                    formualire.motDePasse.value="";
                    formualire.adresseMail.value="";
                    formualire.date.value="";
                    formualire.genre.value="M";
                    goToConnexion();
                }
            }
        };
        xhr.send();
};
*/

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
