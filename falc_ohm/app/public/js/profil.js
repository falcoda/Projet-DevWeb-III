class PageProfil extends React.Component {
    state = {
        nom: "",
        categorie: "",
        prix: "",
        nombre: "",
        description: "",
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
        let nom = document.getElementById("nom");
        let categorie = document.getElementById("categorie");
        let prix = document.getElementById("prix");
        let nombre = document.getElementById("nombre");
        let description = document.getElementById("description");

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
            tableMateriel = JSON.parse(xhr.responseText);
        };
        xhr.send();

        let xhr2 = new XMLHttpRequest();
        xhr2.open("POST", "http://localhost/ajouterMateriel");
        xhr2.setRequestHeader("content-type", "application/json");
        xhr2.onload = function () {
            console.log(xhr2.responseText);
            if (xhr.responseText == "success") {
                alert("Matériel ajouté avec succès");
                nom.value = "";
                categorie.value = "";
                prix.value = "";
                nombre.value = "";
                description = "";
            }
            else if (xhr.responseText === "nomInvalid") {
                alert("nomInvalid");
                document.getElementById("nom").innerHTML =
                    "<input type=\"text\" className=\"form-control w-25\" id=\"nom\" placeholder=\"Nom du matériel\" required>"
            }
            else if (xhr.responseText === "descriptionInvalid") {
                alert("descriptionInvalid");
                document.getElementById("description").innerHTML = "<textarea type=\"text\" className=\"form-control notValid\" rows=\"5\" id=\"description\" placeholder=\"Description du matériel\"  required></textarea>"
            }
            else if (xhr.responseText === "success") {
                document.getElementById("nom").classList.remove("is-invalid");
                document.getElementById("description").classList.remove("is-invalid");
            }
            for (let i of tableMateriel) {
                if (data.nom == i.nom) {
                    // ANNULE LE XHR2.SEND
                }
            }
        };
        xhr2.send(JSON.stringify(data));
        event.preventDefault();
    }
    render() {
        return (
            <div id="content" className="m-auto px-2">
                <h1>Ajouter du matériel en tant qu'administrateur</h1>
                <form id="formAjouterMateriel" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Veuillez remplir les champs ci-dessous pour ajouter du matériel.</legend>
                        <div className="form-group">
                            <label htmlFor="nom">Entrez le nom du matériel</label>
                            <input type="text" className="form-control w-25" id="nom" placeholder="Nom du matériel" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categorie">Choisissez la catégorie</label>
                            <select className="form-control w-25" id="categorie" name="select" required>
                                <option value="1">Caisson</option>
                                <option value="2">Top 2 voies</option>
                                <option value="3">Ampli</option>
                                <option value="4">Processeur</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="prix">Entrez le prix</label>
                            <input type="number" name="prix" className="form-control w-25" id="prix" min="0"
                                   placeholder="0" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre">Entrez le nombre d'articles</label>
                            <input type="number" name="nombre" className="form-control w-25" id="nombre" min="0"
                                   placeholder="0" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Entrez la description du matériel</label>
                            <textarea type="text" className="form-control" rows="2" id="description" placeholder="Description du matériel" required></textarea>
                        </div>
                        <input type="submit" className="btn btn-light" id="buttonSubmit" value={"Ajouter matériel"} />
                    </fieldset>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<PageProfil/>,document.getElementById("PageProfil"));