let express = require("express");
let app = express();
//<<<<<<< HEAD
//let bootstrap = require('bootstrap');

/*const bootstrap = require('bootstrap');
>>>>>>> 86bb03ddd7877e17cedca3d0eadb0465ea7e9483*/

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (request, response)=> {
    response.render("pages/accueil")
});

app.get("/contact", (request, response)=> {
    response.render("pages/contact")
});

app.get("/materiel", (request, response)=> {
    response.render("pages/materiel")
});

app.get("/devis", (request, response)=> {
    response.render("pages/devis")
});

app.get("/connexion", (request, response)=> {
    response.render("pages/connexion")
});


app.listen(83);
