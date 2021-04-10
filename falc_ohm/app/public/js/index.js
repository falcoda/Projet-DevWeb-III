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

function changeHead() { // animation visuelles au niveau de la photo de couverture et de  la barre d'état

    if (document.body.scrollTop > 45 || document.documentElement.scrollTop > 45) { //lorsqu'on descend de 45px
        document.getElementById("head").style.backgroundColor = "whitesmoke";
        document.getElementById("head").style.opacity= "0.95";
    }
    else  {                                                                             //quand on remonte
        document.getElementById("head").style.backgroundColor = "transparent";
    }

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
    const navbar =<div>
    <title>falc'ohm system</title>

    <div className="header" id="head">
        <img id="logoEnTete" src="img/falcohm_logo.png" alt="logo de la page" width="75px" height="75px"></img>
        <h1 id="titre"> FALC'OHM SYSTEM</h1>
    <div className="navBar" id="enTete">
        <div className="navigation">
        <a href="/">A Propos</a>
        <a href="contact">Contacts</a>
        <a href="materiels">Matériels</a>
        <a href="authentification">Authentification</a>
        <a href="devis">Devis</a>
        </div>
        <div id="rectangle"></div>
        </div>
        </div>

        </div>;
    ReactDOM.render(navbar,document.querySelector('#container'));
}
render();