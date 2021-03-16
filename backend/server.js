let express = require("express");
let app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (request, response)=> {
    response.render("pages/index")
});

app.get("/contact", (request, response)=> {
    response.render("pages/contact")
});

app.get("/acceuil", (request, response)=> {
    response.render("pages/index")
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


app.listen(82);