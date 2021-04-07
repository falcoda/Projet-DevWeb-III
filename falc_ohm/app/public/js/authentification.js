let form1 = document.getElementById("formConnexion");
let form2 = document.getElementById("formInscription");
let adressemail1 = document.getElementById("adressemail1");
let motdepasse1 = document.getElementById("motdepasse1");
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let numerotel = document.getElementById("numerotel");
let adressemail2 = document.getElementById("adressemail2");
let motdepasse2 = document.getElementById("motdepasse2");

form.addEventListener("submit", (param)=>{
    param.preventDefault();

    let data1 = {
        adressemail1: adressemail1.value,
        motdepasse1: motdepasse1.value,
    };

    let data2 = {
        nom: nom.value,
        prenom: prenom.value,
        numerotel: numerotel.value,
        adressemail2: adressemail2.value,
        motdepasse2: motdepasse2.value,
    };

    console.log(data1);
    console.log(data2);

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
            if (adressemail1 == i.utilisateur && motdepasse1 == i.motdepasse) {
                // CODE POUR FAIRE LES COOKIES
            }
            else if (compteur = tableUsers.length) {
                // MESSAGE D'ERREUR
            }

        }
    };
    xhr.send();
});

class buttonSubmit extends React.Component {
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

const domContainer = document.querySelector('#buttonSubmit');
ReactDOM.render(React.createElement(buttonSubmit), domContainer);
