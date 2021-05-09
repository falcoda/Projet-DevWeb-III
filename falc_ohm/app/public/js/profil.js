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
                    // eslint-disable-next-line no-undef
                    utilisateurConnecte = GetCookie("connexion");
                    motdepasse = GetCookie("motdepasse");
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
        event.preventDefault();
    }
    render() {
        return (
            <div  className="m-auto px-2">
                <h3>Changer d'utilisateur</h3>
                <form id="formChangerUtilisateur" onSubmit={this.handleSubmit}>
                    <fieldset>
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
                        <input type="submit" value="Changer d'utilisateur"/>
                    </fieldset>
                </form>
            </div>
        );
    }
}

class Deconnexion extends React.Component {
    state = {
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
        DeleteCookie ("connexion",null,null);
        DeleteCookie ("motdepasse",null,null);
    }
    render() {
        return (
            <div  className="m-auto px-2">
                <form id="formDeconnexion" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type="submit" value="Déconnexion"/>
                    </fieldset>
                </form>
            </div>
        );
    }
}

class Profil extends React.Component {
    render(){
        return (
            <React.Fragment>
                <ChangerUtilisateur/><br/>
                <Deconnexion/>
            </React.Fragment>)
    }
}

ReactDOM.render(<Profil/>,document.getElementById("profil"));