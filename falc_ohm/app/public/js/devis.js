function generationDevis(objet) {
    var sizeTableau = Object.keys(objet).length; //récuperer la taille du tableau pour la boucle
    var tableauValue = Object.values(objet);
    var tableauKeys = Object.keys(objet);

    /* for (let i = 0 ; i <= sizeTableau ; i++ ){
        console.log(tableauValue[i]);
    } */
}
let materiel;
let xhr_materiel = new XMLHttpRequest();
xhr_materiel.open("GET", "http://localhost/materiel/json");
xhr_materiel.onload = function() {
    materiel=xhr_materiel.responseText;
    console.log(JSON.parse(materiel));

};
xhr_materiel.send();

function boucle(tableau, name , number) {
    console.log(tableau[0]['nom']);
    let retour = {
        denom : '',
        prix : 0,
        nombre : 0,
    };
    for (let i = 0 ; i < tableau.length ; i++ ){
        if (tableau[i]['nom'] == name){
            console.log(tableau[i]['nom']);
            retour.denom = tableau[i]['nom'];
            retour.prix = tableau[i].prix;
            retour.nombre = number;
        }
    }
    return retour;
}

function ecritureDevis (data){

}

function basicMaterial(objet) {
    var tableauValue = Object.values(objet);
    console.log(panier);
    //if (tableauValue[]
    //matériel de base pour chaque préstation (ne variant pas avec les param)
}

function prefLightAndSound(objet) {
    var donnees = JSON.parse(materiel)
    var tableauValue = Object.values(objet);
    if(tableauValue[1] == "sound1"){ //preference sonorisation
        console.log("force grosSound");
        if (tableauValue[2] == "light1"){ //preferences show light
            console.log("force biglight");
        }else if (tableauValue[2] == "light2"){
            console.log("force legerLight");
        }else if (tableauValue[2] == "light3"){
            console.log("force pasdelight");
        }else{
            console.log("pas de pref light")
        }
    }else if(tableauValue[1] == "sound2"){
        console.log("force moyenSound")
        if (tableauValue[2] == "light1"){ //preferences show light
            console.log("force biglight");
        }else if (tableauValue[2] == "light2"){
            console.log("force legerLight");
        }else if (tableauValue[2] == "light3"){
            console.log("force pasdelight");
        }else{
            console.log("pas de pref light")
        }

    }else if(tableauValue[1] == "sound3"){
        console.log("force petitSound")
        if (tableauValue[2] == "light1"){ //preferences show light
            console.log("force biglight");
        }else if (tableauValue[2] == "light2"){
            console.log("force legerLight");
        }else if (tableauValue[2] == "light3"){
            console.log("force pasdelight");
        }else{
            console.log("pas de pref light")
        }

    }else {
        console.log("pas de pref du coup " + tableauValue[1])
        if (tableauValue[2] == "light1"){ //preferences show light
            console.log("force biglight");
        }else if (tableauValue[2] == "light2"){
            console.log("force legerLight");
        }else if (tableauValue[2] == "light3"){
            console.log("force pasdelight");
        }else{
            console.log("pas de pref light")
        }
    }


}
class MyForm extends React.Component {
    state = {
        typeEvenement : '',   //valeur par défaut
        typeSound : 'soundAuto',
        typeLight : 'lightAuto',
    }
    constructor(props) {
        super(props);
        this.state = {
            typeEvenement : 'teuf',   //valeur par défaut
            typeSound : 'soundAuto',
            typeLight : 'lightAuto',
            tailleSalle : '500',
            nombrePersonne : '501',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const name = e.target.name;
        //console.log(e.target.name)
        //console.log(Object.keys(this.state).length);
        generationDevis(this.state);
        this.setState({
            [name]: e.target.value   //changer les valeur dans state
        })
    }
    handleSubmit(e){
        e.preventDefault()
        const data = JSON.stringify(this.state)
        console.log(data);
        let tableobjet = [];
        let obj = {};
        let bdd = JSON.parse(materiel);
        //console.log(this.state.typeSound) //soundauto si rien choisi;
        if (this.state.typeEvenement == "event1"){ //soiree dansante
            if (parseInt(this.state.tailleSalle) <= 100) { //nombre de personnes

                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    obj = boucle(bdd,'mth30', 2);
                    tableobjet.push(obj);
                }
            }else if (parseInt(this.state.tailleSalle) > 100 && parseInt(this.state.tailleSalle) <= 200){
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup petit sound");
                }
            }else if (parseInt(this.state.tailleSalle) > 200 && parseInt(this.state.tailleSalle) <= 300){
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup 2 mth 1 nexos");
                }
            }else if (parseInt(this.state.tailleSalle) > 300 && parseInt(this.state.tailleSalle) <= 500){
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup 4mth 2 nexos");
                }
            }else if (parseInt(this.state.tailleSalle) > 500 && parseInt(this.state.tailleSalle) <= 1000){
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup 6 mth 2 nexos");
                }
            }else{
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup 10mth 4 nexos");
                }
            }
        }
        else if(this.state.typeEvenement == "event2"){ //mariage
            if (parseInt(this.state.tailleSalle) <= 100){ //nombre de personnes
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup petit sound");
                }
            }else if (parseInt(this.state.tailleSalle) > 100 && parseInt(this.state.tailleSalle) <= 200){
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup petit sound complet ");
                }
            }else if (parseInt(this.state.tailleSalle) > 200 && parseInt(this.state.tailleSalle) <= 500){
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup 2mth 6top 2 voie");
                }
            }else if (parseInt(this.state.tailleSalle) > 500){
                console.log("Nous somme pas en mesure de fournir une telle préstation, veuillez nous contacter pour plus d'info")
                }else {
                console.log("error holder")
            }

        }
        else if(this.state.typeEvenement == "event3" || this.state.typeEvenement == "event4"){ //festival ou festival car mêmes valeurs
            if (parseInt(this.state.tailleSalle) <= 100){ //nombre de personnes
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup petit sound complet");
                }
            }else if (parseInt(this.state.tailleSalle) > 100 && parseInt(this.state.tailleSalle) <= 200){
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup 4 mth 2 nexos");
                }
            }else if (parseInt(this.state.tailleSalle) > 200 && parseInt(this.state.tailleSalle) <= 500){
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup 6 mth 2 nexos");
                }
            }else if (parseInt(this.state.tailleSalle) > 500){
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup 10 mth 4 nexos");
                }
            }else {
                console.log("error holder")
            }
        //}else if(this.state.typeEvenement == "event4"){ //teuf
        }
        else if(this.state.typeEvenement == "event5"){ //conference ou seminaire
            if (parseInt(this.state.tailleSalle) <= 200 ){ //nombre de personnes  (ici 0-200 = meme sono)
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup petit sound complet");
                }
            }else if (parseInt(this.state.tailleSalle) > 200 && parseInt(this.state.tailleSalle) <= 500){
                if (this.state.typeSound != "soundAuto" || this.state.typeLight != "lightAuto") {
                    prefLightAndSound(this.state);
                }else {
                    //ajout du matériel spécifique a cette config
                    console.log("pas de pref");
                    console.log("du coup 2mth 6 top 2 voie");
                }
            }else {
                console.log("Nous somme pas en mesure de fournir une telle préstation, veuillez nous contacter pour plus d'info")
            }

        }
        else{   //pas de type d'event séléctionné => l'afficher sur la page html qe c'est requis
            console.log("choisisez un type d'événement")
        }

    }

    //ici on crée le html qui sera la simulation
    render() {

        return (
            <div id = "content">
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <div className="row align-items-center">
                        {/* Entrée type d'événement */}
                        <div className="col-12">
                            <label htmlFor="typeEvent">Type d'évenement : </label>
                            <select name="typeEvenement" value={this.state.typeEvenement} onChange={this.handleChange}>
                                <option value="pasDeChoix">Faites votre choix </option>
                                <option value="event1">Soirée dansante</option>
                                <option value="event2">Mariage</option>
                                <option value="event3">Festival</option>
                                <option value="event4">Teuf</option>
                                <option value="event5">Conférence ou séminaire</option>
                            </select>
                            {/* <a href="javascript:alert('Vous avez choisi soirée dansante');">Soirée dansante</a>
                            <a href="javascript:alert('Vous organisez un mariage, ajustements en cours ! Appuyez sur OK pour continuer votre configuration')">Mariage</a>
                            <a href="javascript:alert('Vous organisez un Festival, ajustements en cours ! Appuyez sur OK pour continuer votre configuration')">Festival</a>
                            <a href="javascript:alert('Vous organisez une Teuf, ajustements en cours ! Appuyez sur OK pour continuer votre configuration')">Teuf</a>
                            <a href="javascript:alert('Vous organisez une conférence, ajustements en cours ! Appuyez sur OK pour continuer votre configuration')">Conférence</a>
                            <a href="javascript:alert('Vous organisez un séminaire, ajustements en cours ! Appuyez sur OK pour continuer votre configuration')">Séminaire</a> */}
                        </div>
                    </div>

                    {/* Entrée taille de la salle */}
                    <div className="form-group">
                        <div className="col-auto">
                            <label htmlFor="tailleSalle" className="form-label">Taille de votre salle qui acceuilera la
                                sonorisation :</label>
                        </div>
                        <div className="col-auto">
                            <input onChange={this.handleChange}  type="number"
                                   className="form-control form-control-sm" id="superficie" name="tailleSalle" min="1"
                                   max="1000"/>
                        </div>
                        <div className="col-auto">
                                    <span id="formHelpMeter" className="form-text">
                                        M²
                                    </span>
                        </div>
                    </div>
                    {/* Entrée nombre de personnes */}
                    <div className="form-group">
                        <div className="col-auto">
                            <label htmlFor="nombrePersonne" className="form-label">Nombre de personnes maximale
                                attendues à l'événement :</label>
                        </div>
                        <div className="col-auto">
                            <input onChange={this.handleChange} type="number"
                                   className="form-control form-control-sm" id="public" name="nombrePersonne"
                                   min="1" max="1000"/>
                        </div>
                        <div className="col-auto">
                                     <span id="formHelpMeter" className="form-text">
                                        Personnes
                                    </span>
                        </div>
                    </div>
                    {/* Entrée radio sound */}
                    <div>
                        <label htmlFor="typeSound">Taille du soundsystem : </label>
                        <select name="typeSound" value={this.state.typeSound} onChange={this.handleChange}>
                            <option value="soundAuto">Pas de préférences</option>
                            <option value="sound1">SoundSystem complet</option>
                            <option value="sound2">SoundSystem moyen</option>
                            <option value="sound3">Petit soundsystem</option>
                        </select>
                    </div>
                    {/* Entrée radio lights */}
                    <div className="col-auto form-check">
                        <label htmlFor="typeLight">Show light voulu : </label>
                        <select name="typeLight" value={this.state.typeLight} onChange={this.handleChange}>
                            <option value="lightAuto">Pas de préférences</option>
                            <option value="light1">Show light complet</option>
                            <option value="light2">Show light léger</option>
                            <option value="light3">Pas de show light</option>
                        </select>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Génération de la simulation"/>
                        <input type="submit" className="btn btn-primary" value="Resimuler"/>
                            <input type="submit" className="btn btn-primary" value="Enregister la simulation"/>
                                <input type="submit" className="btn btn-primary"
                                       value="Télécharger la simulation au format JPG"/>
                    {JSON.stringify(this.state)}
                </fieldset>
            </form>
                <div className="m-auto" id = "content">
                    <h5> Voici le devis associé à la simulation 2D et à vos choix : </h5>
                    <form>
                        <input type="submit" className="btn btn-primary" value="Télécharger le devis au format PDF"/>
                            <input type="submit" className="btn btn-primary" value="Envoyer un mail avec le devis"/>
                    </form>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));  // id du div où on rajoute le code