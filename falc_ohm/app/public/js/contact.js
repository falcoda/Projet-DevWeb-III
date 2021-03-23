let form = document.getElementById("formContact");
let identite = document.getElementById("nom");
let mail = document.getElementById("email");
let commentaire = document.getElementById("commentaire");

form.addEventListener("submit", (param)=>{
   param.preventDefault();

   let data = {
       identite: identite.value,
       mail: mail.value,
       commentaire: commentaire.value,
   };

   console.log(data);

   let xhr = new XMLHttpRequest();

   xhr.open("POST", "/contact");
   xhr.setRequestHeader("content-type", "application/json");
   xhr.onload = function () {
       console.log(xhr.responseText);
       if(xhr.responseText == "success") {
           alert("success");

           identite.value = "";
           mail.value = "";
           commentaire.value = "";
       }
       else {
           alert("Problemes")
       }
   };
   xhr.send(JSON.stringify(data));
});

function sendData() {

    con.query("INSERT INTO messages (identite, mail, message) VALUES ("+ identite +" , " + mail + ", " + commentaire + ")", function (err, result) {
        if (err) throw err;
        console.log("Données injectées !");
    });
    return false
}

class buttonSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };
    }

    render() {
        if (this.state.clicked) {
            return <div><button type="submit" className="btn btn-light" onClick={() => this.setState({clicked: true})}>
                Envoyer
            </button>
                Message bien envoyé
            </div>
        }

        return <button type="submit" class="btn btn-light" onClick={() => this.setState({clicked: true})}>
            Envoyer
        </button>

    }
}

const domContainer = document.querySelector('#buttonSubmit');
ReactDOM.render(React.createElement(buttonSubmit), domContainer);
