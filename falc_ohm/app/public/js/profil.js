class ChangerUtilisateur extends React.Component {
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

        console.log(data1);

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
                    utilisateurConnecte = GetCookie("connexion");
                    motdepasse = GetCookie("motdepasse");
                    console.log("succès");
                    document.location.href="profil"
                    break;
                }
                // eslint-disable-next-line no-cond-assign
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
            <div  className="m-auto px-2">
                <form id="formChangerUtilisateur" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Changer d'utilisateur</legend>
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
                        <input type="submit" className="btn btn-light" id="buttonSubmit" value={"Changer d'utilisateur"} />
                    </fieldset>
                </form>
            </div>
        );
    }
}

class Deconnexion extends React.Component {
    handleSubmit(event) {
        DeleteCookie ("connexion",null,null);
        DeleteCookie ("motdepasse",null,null);
        document.location.href = "authentification";
    }
    render() {
        return (
            <div  className="m-auto px-2">
                <form id="formDeconnexion" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type="submit" className="btn btn-light" id="buttonSubmit2" value={"Déconnexion"} />
                    </fieldset>
                </form>
            </div>
        );
    }
}

class Profil extends React.Component {
    render(){
        if (utilisateurConnecte != null) {
            return (
                <React.Fragment>
                    <div id="content" className="m-auto px-2">
                        <div className="m-auto px-2">
                            <h1>Profil de {utilisateurConnecte}</h1>
                        </div>
                        <ChangerUtilisateur/><br/>
                        <Deconnexion/>
                    </div>
                </React.Fragment>)
        }
        else {
            return (
                <div id="content" className="m-auto px-2">
                    <h3>Vous n'êtes pas connecté.</h3>
                </div>
            )
        }
    }
}

ReactDOM.render(<Profil/>,document.getElementById("profil"));