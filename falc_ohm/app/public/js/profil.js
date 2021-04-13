let form = document.getElementById("formAjouterMateriel");
let nom = document.getElementById("nom");
let categorie = document.getElementById("categorie");
let prix = document.getElementById("prix");
let nombre = document.getElementById("nombre");
let description = document.getElementById("description");

form.addEventListener("submit", (param)=>{
    param.preventDefault();

    let data = {
        nom: nom.value,
        categorie: categorie.value,
        prix: prix.value,
        nombre: nombre.value,
        description: description.value
    };

    let tableMateriel = [];

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/materiel/json");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
        tableMateriel =  JSON.parse(xhr.responseText);
    };
    xhr.send();

    let xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "http://localhost/ajouterMateriel");
    xhr2.setRequestHeader("content-type", "application/json");
    xhr2.onload = function () {
        for (let i of tableMateriel) {
            if (data.nom == i.nom) {
                // ANNULE LE XHR2.SEND
            }
        }
    };
    xhr2.send(JSON.stringify(data));
});