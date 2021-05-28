let tableauGeneral = [];
let utilisateurConnecte = GetCookie("connexion");
function generationDevis(objet) {

    let elem = document.getElementById("devis");
    let writing = "";
    let totalPrix = 0;
    writing += "<table class='table table-striped table-dark'> <tr><th scope='col' >Matériel</th><th scope='col' >Nombre</th><th scope='col'>Prix</th></tr>";
    for (let i = 0 ; i < objet.length ; i++){
        writing += "<tr><td>" + objet[i].denom + "</td><td>" + objet[i].nombre + "</td><td>" + objet[i].prix + "</td></tr>"
        totalPrix += objet[i].prix;
    }
    writing += "<tr><td>Prix total</td><td></td><td>" + totalPrix + "</td></tr><table>";
    elem.innerHTML += writing;   //BUG


}
let materiel;
let xhr_materiel = new XMLHttpRequest();
xhr_materiel.open("GET", "http://localhost/materiel/json");
xhr_materiel.onload = function() {
    materiel=xhr_materiel.responseText;


};
xhr_materiel.send();

function boucle(tableau, name , number) {

    let retour = {
        id : 0,
        denom : '',
        prix : 0,
        nombre : 0,
    };
    for (let i = 0 ; i < tableau.length ; i++ ){
        if (tableau[i]['nom'] == name){
            retour.id = tableau[i]['id_materiel'];
            retour.denom = tableau[i]['nom'];
            retour.prix = tableau[i].prix;
            retour.nombre = number;
        }
    }
    tableauGeneral.push(retour);   //ajout dans un tableau général
    return retour;
}


function lightDevis (param){  //param = big,small
    let obj = {};
    let tableobj = [];
    let bdd = JSON.parse(materiel);
    if (param == "big"){
        obj = boucle(bdd,'showtec saber 60', 10);
        tableobj.push(obj);
        obj = boucle(bdd,'showtec phantom 50', 4);
        tableobj.push(obj);
        obj = boucle(bdd,'pars led', 8);
        tableobj.push(obj);
        obj = boucle(bdd,'blacklight', 2);
        tableobj.push(obj);
        obj = boucle(bdd,'showtec pixelbar Q4', 1);
        tableobj.push(obj);
        obj = boucle(bdd,'Avolite pearl 2004', 1);
        tableobj.push(obj);
    }else if (param == "small"){
        obj = boucle(bdd,'showtec saber 60', 4);
        tableobj.push(obj);
        obj = boucle(bdd,'showtec phantom 50', 2);
        tableobj.push(obj);
        obj = boucle(bdd,'pars led', 4);
        tableobj.push(obj);
        obj = boucle(bdd,'showtec pixelbar Q4', 1);
        tableobj.push(obj);
        obj = boucle(bdd,'Avolite pearl 2004', 1);
        tableobj.push(obj);

    }else {
        console.log("noshow")
    }
    return tableobj;


}

function prefLightAndSound(objet, pref) {
    let obj = {};
    let tableobj = [];
    var bdd = JSON.parse(materiel);
    var tableauValue = Object.values(objet);

    if(obj !=={}){
        if (tableauValue[2] == "light1"){ //preferences show light
            tableobj = lightDevis('big');
            generationDevis(tableobj);
        }else if (tableauValue[2] == "light2") {
            tableobj = lightDevis('small');
            generationDevis(tableobj);
        }
    }
    else{
    if(tableauValue[1] == "sound1"){ //preference sonorisation
        obj = boucle(bdd,'nexo SI 2000', 4);
        tableobj.push(obj);
        obj = boucle(bdd,'mth4654', 10);
        tableobj.push(obj);
        obj = boucle(bdd,'cvrD3002', 1);
        tableobj.push(obj);
        obj = boucle(bdd,'dsp206', 1);
        tableobj.push(obj);
        obj = boucle(bdd,'tdController', 1);
        tableobj.push(obj);
        obj = boucle(bdd,'qscRmx2450', 1);
        tableobj.push(obj);
        generationDevis(tableobj);
        if (tableauValue[2] == "light1"){ //preferences show light
            tableobj = lightDevis('big');
            generationDevis(tableobj);
        }else if (tableauValue[2] == "light2"){
            tableobj = lightDevis('small');
            generationDevis(tableobj);
        }else if (tableauValue[2] == "light3"){
            console.log("force pasdelight");
        }else{
            console.log("pas de pref light")
        }
    }else if(tableauValue[1] == "sound2"){
        obj = boucle(bdd,'nexo SI 2000', 2);
        tableobj.push(obj);
        obj = boucle(bdd,'mth4654', 6);
        tableobj.push(obj);
        obj = boucle(bdd,'cvrD3002', 1);
        tableobj.push(obj);
        obj = boucle(bdd,'dsp206', 1);
        tableobj.push(obj);
        obj = boucle(bdd,'tdController', 1);
        tableobj.push(obj);
        obj = boucle(bdd,'qscRmx2450', 1);
        tableobj.push(obj);
        generationDevis(tableobj);
        if (tableauValue[2] == "light1"){ //preferences show light
            tableobj = lightDevis('big');
            generationDevis(tableobj);
        }else if (tableauValue[2] == "light2"){
            tableobj = lightDevis('small');
            generationDevis(tableobj);
        }else if (tableauValue[2] == "light3"){
            console.log("force pasdelight");
        }else{
            console.log("pas de pref light")
        }

    }else if(tableauValue[1] == "sound3"){
        obj = boucle(bdd,'mth30', 4);
        tableobj.push(obj);
        obj = boucle(bdd,'turbotop', 4);
        tableobj.push(obj);
        obj = boucle(bdd, 'Quadro 500DSP', 1);
        tableobj.push(obj);
        generationDevis(tableobj);
        if (tableauValue[2] == "light1"){ //preferences show light
            tableobj = lightDevis('big');
            generationDevis(tableobj);
        }else if (tableauValue[2] == "light2"){
            tableobj = lightDevis('small');
            generationDevis(tableobj);
        }else if (tableauValue[2] == "light3"){
            console.log("force pasdelight");
        }else{
            console.log("pas de pref light")
        }

    }else {
        console.log("pas de pref du coup " + tableauValue[1]);
        if (tableauValue[2] == "light1"){ //preferences show light
            tableobj = lightDevis('big');
            generationDevis(tableobj);
        }else if (tableauValue[2] == "light2"){
            tableobj = lightDevis('small');
            generationDevis(tableobj);
        }else if (tableauValue[2] == "light3"){
            console.log("force pasdelight");
        }else{
            console.log("pas de pref light")
        }
    }}


}


function auPanier(){
    let panier;
    let xhr_panier = new XMLHttpRequest();
    xhr_panier.open("POST", "http://localhost/nouveau-panier?connexion="+GetCookie("connexion")+"&motdepasse="+GetCookie("motdepasse"));
    xhr_panier.setRequestHeader("content-type", "application/json");
    xhr_panier.onload = function() {
        if (xhr_panier.responseText === "error"){
            alert('Vous possédez déjà un panier');
        }
        else if (xhr_panier.responseText === "vide"){
            alert('Merci d\'effectuer une simulation');
        }
        else if (xhr_panier.responseText === "succes"){
            alert('Vos articles ont été ajoutés au panier ! Veuillez vous rendre sur votre page panier pour le consulter');
        }
        else if (xhr_panier.responseText === "connect"){
            alert('Veuillez vous connecter pour enregistrer un panier');
        }
    };

    xhr_panier.send(JSON.stringify({data : tableauGeneral, mail :utilisateurConnecte}));
}

function conditionForms(etat){
    const data = JSON.stringify(etat);

    let tableobj = [];
    let obj = {};
    let bdd = JSON.parse(materiel);
    if (etat.typeEvenement == "event1") { //soiree dansante
        obj = boucle(bdd, 'Allen & Heath ZED-14', 1);  //materiel par defaut
        tableobj.push(obj);
        if (parseInt(etat.tailleSalle) <= 100) { //nombre de personnes
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'mth30', 2);
            tableobj.push(obj);
            obj = boucle(bdd, 'turbotop', 2);
            tableobj.push(obj);
            obj = boucle(bdd, 'Quadro 500DSP', 1);
            tableobj.push(obj);

            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 100 && parseInt(etat.tailleSalle) <= 200) {
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'mth30', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'turbotop', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'Quadro 500DSP', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 200 && parseInt(etat.tailleSalle) <= 300) {
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'nexo SI 2000', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'mth4654', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'cvrD3002', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'dsp206', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'tdController', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'qscRmx2450', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 300 && parseInt(etat.tailleSalle) <= 500) {
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'nexo SI 2000', 2);
            tableobj.push(obj);
            obj = boucle(bdd, 'mth4654', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'cvrD3002', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'dsp206', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'tdController', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'qscRmx2450', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 500 && parseInt(etat.tailleSalle) <= 1000) {
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'nexo SI 2000', 2);
            tableobj.push(obj);
            obj = boucle(bdd, 'mth4654', 6);
            tableobj.push(obj);
            obj = boucle(bdd, 'cvrD3002', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'dsp206', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'tdController', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'qscRmx2450', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else {
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'nexo SI 2000', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'mth4654', 10);
            tableobj.push(obj);
            obj = boucle(bdd, 'cvrD3002', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'dsp206', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'tdController', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'qscRmx2450', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        }
    } else if (etat.typeEvenement == "event2") { //mariage
        obj = boucle(bdd, 'Allen & Heath ZED-14', 1);
        tableobj.push(obj);
        if (parseInt(etat.tailleSalle) <= 100) { //nombre de personnes
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'mth30', 2);
            tableobj.push(obj);
            obj = boucle(bdd, 'turbotop', 2);
            tableobj.push(obj);
            obj = boucle(bdd, 'Quadro 500DSP', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 100 && parseInt(etat.tailleSalle) <= 200) {

            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'mth30', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'turbotop', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'Quadro 500DSP', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 200 && parseInt(etat.tailleSalle) <= 500) {

            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'mth4654', 2);
            tableobj.push(obj);
            obj = boucle(bdd, 'turbotop', 6);
            tableobj.push(obj);
            obj = boucle(bdd, 'Quadro 500DSP', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'cvrD3002', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 500) {
            console.log("Nous somme pas en mesure de fournir une telle préstation, veuillez nous contacter pour plus d'info")
        } else {
            console.log("error holder")
        }

    } else if (etat.typeEvenement == "event3" || etat.typeEvenement == "event4") { //festival ou festival car mêmes valeurs
        obj = boucle(bdd, 'Allen & Heath ZED-14', 1);
        tableobj.push(obj);
        if (parseInt(etat.tailleSalle) <= 100) { //nombre de personnes
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'mth30', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'turbotop', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'Quadro 500DSP', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 100 && parseInt(etat.tailleSalle) <= 200) {
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'nexo SI 2000', 2);
            tableobj.push(obj);
            obj = boucle(bdd, 'mth4654', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'cvrD3002', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'dsp206', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'tdController', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'qscRmx2450', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 200 && parseInt(etat.tailleSalle) <= 500) {

            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'nexo SI 2000', 2);
            tableobj.push(obj);
            obj = boucle(bdd, 'mth4654', 6);
            tableobj.push(obj);
            obj = boucle(bdd, 'cvrD3002', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'dsp206', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'tdController', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'qscRmx2450', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 500) {
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'nexo SI 2000', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'mth4654', 10);
            tableobj.push(obj);
            obj = boucle(bdd, 'cvrD3002', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'dsp206', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'tdController', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'qscRmx2450', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        }
        //}else if(etat.typeEvenement == "event4"){ //teuf
    } else if (etat.typeEvenement == "event5") { //conference ou seminaire
        obj = boucle(bdd, 'Allen & Heath ZED-14', 1);
        tableobj.push(obj);
        if (parseInt(etat.tailleSalle) <= 200) { //nombre de personnes  (ici 0-200 = meme sono)
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'mth30', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'turbotop', 4);
            tableobj.push(obj);
            obj = boucle(bdd, 'Quadro 500DSP', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else if (parseInt(etat.tailleSalle) > 200 && parseInt(etat.tailleSalle) <= 500) {
            //ajout du matériel spécifique a cette config
            obj = boucle(bdd, 'mth4654', 2);
            tableobj.push(obj);
            obj = boucle(bdd, 'turbotop', 6);
            tableobj.push(obj);
            obj = boucle(bdd, 'Quadro 500DSP', 1);
            tableobj.push(obj);
            obj = boucle(bdd, 'cvrD3002', 1);
            tableobj.push(obj);
            generationDevis(tableobj);
            if (etat.typeSound != "soundAuto") {
                prefLightAndSound(etat, "sound");
            } else if (etat.typeLight != "lightAuto") {
                prefLightAndSound(etat, "light");
            }
        } else {
            alert("Nous somme pas en mesure de fournir une telle préstation, veuillez nous contacter pour plus d'info")
        }

    } else {   //pas de type d'event séléctionné => l'afficher sur la page html qe c'est requis
        alert("choisisez un type d'événement")
    }
}


class MyForm extends React.Component {
    state = {
        typeEvenement : '',   //valeur par défaut
        typeSound : 'soundAuto',
        typeLight : 'lightAuto',
    };
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
        this.setState({
            [name]: e.target.value   //changer les valeur dans state
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const data = JSON.stringify(this.state);

        let tableobj = [];
        let obj = {};
        let bdd = JSON.parse(materiel);
        let elem = document.getElementById("devis");
        if (elem.innerText === "") {    //vérification si la simulation a deja ete faite
            conditionForms(this.state);
        } else {
            elem.innerHTML = "";
            tableauGeneral=[];
            conditionForms(this.state);
        }
    }

    //ici on crée le html qui sera la simulation
    render() {
        return (
            <React.Fragment>
            <div className="container m-auto" id = "content">
                <h1 className="display-4" ><u>Votre devis personnalisé</u></h1>
                <p className={'lead'}>C'est ici que vous pouvez générer votre devis personnalisé et automatisé , Il vous suffit simplement de remplir les
                différentes parties du formulaire ci-dessous. Le devis est proposé en fonction de vos besoins et de nos disponiblités matérielles! </p>
                <p className={'lead'}>Après avoir générer la prévisualisation de notre estimation en fonction de vos besoin, vous pouvez ajouter
                le matériel à votre panier. Ensuite si le prix et les baffles vous conviennent vous pouvez nous envoyer votre commande et nous vous
                guideront personnlement vers un devis parfait pour vos besoins </p>
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <div className="form-group">
                        {/* Entrée type d'événement */}
                            <label htmlFor="typeEvent " className="font-weight-bold">Type d'évenement : </label>
                            <select className={"form-control selcls"} id={"gender1"} name="typeEvenement" value={this.state.typeEvenement} onChange={this.handleChange} required style={{width :"200px"}} >
                                <option value="pasDeChoix">Faites votre choix </option>
                                <option value="event1">Soirée dansante</option>
                                <option value="event2">Mariage</option>
                                <option value="event3">Festival</option>
                                <option value="event4">Teuf</option>
                                <option value="event5">Conférence ou séminaire</option>
                            </select>
                    </div>

                    {/* Entrée taille de la salle */}
                    <div className="form-group">
                        <label htmlFor="tailleSalle" className="form-label font-weight-bold">Taille de votre salle qui acceuilera la
                                sonorisation :</label>
                        <div className="form-row indentation">
                            <input onChange={this.handleChange}  type="number"
                                   className="form-control form-control" id="superficie" name="tailleSalle" min="1"
                                   max="1000" required style={{width :"130px"}} />
                            <div className="col-auto milieu font-weight-light" > M² </div>
                        </div>
                    </div>
                    {/* Entrée nombre de personnes */}
                    <div className="form-group">
                        <label htmlFor="nombrePersonne" className="form-label font-weight-bold">Nombre de personnes maximale
                            attendues à l'événement :</label>
                        <div className="form-row indentation">
                            <input onChange={this.handleChange} type="number"
                                   className="form-control form-control" id="public" name="nombrePersonne"
                                   min="1" max="1000" required style={{width :"130px"}}/>

                            <div className="col-auto milieu font-weight-light"> Personnes </div>
                        </div>
                    </div>
                    {/* Entrée select sound */}
                    <div className="form-group" >
                        <label aria-label="Default select example" className="font-weight-bold">Taille du soundsystem : </label>
                        <select className={"form-control selcls"} id={"gender1"} name="typeSound" value={this.state.typeSound} onChange={this.handleChange} required style={{width :"200px"}}>
                            <option value="soundAuto">Pas de préférences</option>
                            <option value="sound1">SoundSystem complet</option>
                            <option value="sound2">SoundSystem moyen</option>
                            <option value="sound3">Petit soundsystem</option>
                        </select>
                    </div>
                    {/* Entrée select lights */}
                    <div className="form-group">
                        <label htmlFor="typeLight" className="font-weight-bold">Show light voulu : </label>
                        <select className={"form-control selcls"} id={"gender1"} name="typeLight" value={this.state.typeLight} onChange={this.handleChange} required style={{width :"200px"}}>
                            <option value="lightAuto">Pas de préférences</option>
                            <option value="light1">Show light complet</option>
                            <option value="light2">Show light léger</option>
                            <option value="light3">Pas de show light</option>
                        </select>
                    </div>
                    <input type="submit" className="btn btn-light fontsized" value="Génération de la simulation" />
                </fieldset>
            </form>
                <div className="m-auto" id = "content">
                    <h3 className="titre"><u> Voici le devis associé à la simulation : </u></h3>
                    <div id="devis"></div>
                        <input onClick={auPanier} type="submit" className="btn btn-light fontsized" value="Rajouter au panier"/>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));  // id du div où on rajoute le code