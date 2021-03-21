let express = require("express");
let app = express();
let bootstrap = require('bootstrap');

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
