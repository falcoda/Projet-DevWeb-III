"use strict";

class MaterielCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const materiel = this.props.materiel;
        const image = "img/"+ materiel.nom +".jpg";
        const nom = materiel.nom;
        const description = materiel.description;

        return (
            <div className="card_container">
                <div className="card">
                    <div className="card_front">
                        <img src={image} className={"photo"}/>
                    </div>
                    <div className="card_back">
                        <p>{description}</p>
                    </div>
                </div>
                <div className="card_info">
                    <p>{nom}</p>
                </div>
            </div>
        );
    }
}

class MaterielsTable extends React.Component {
    render() {
        const rows = [];

        this.props.materiels.forEach((product) => {
            rows.push(
                <MaterielCard
                    materiel={product}
                />
            );
        });
        return (
          <div>
              {rows}
          </div>
        );
    }
}

class TypeSelect extends React.Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." />
                <p>
                    <input type="checkbox" />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class PageMateriels extends React.Component {
    render() {
        return (
            <div>
                <MaterielsTable materiels={this.props.materiels} />
            </div>
        );
    }
}

function getMaterielsTable() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost/materiels/json");
    xhr.onload = function() {
        console.log(JSON.parse(xhr.responseText));
        ReactDOM.render(
            <PageMateriels materiels={JSON.parse(xhr.responseText)} />,
            document.getElementById('container2')
        );
    };
    xhr.send();
};
getMaterielsTable();