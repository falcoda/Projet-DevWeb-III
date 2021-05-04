class MyForm extends React.Component {
    state = {
        typeEvenement : '',   //valeur par défaut
        typeSound : 'soundAuto',
        typeLight : 'lightAuto',
    }
    constructor(props) {
        super(props);
        this.state = {
            typeEvenement : '',   //valeur par défaut
            typeSound : 'soundAuto',
            typeLight : 'lightAuto',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const name = e.target.name;
        console.log(e.target.name)
        this.setState({
            [name]: e.target.value   //changer les valeur dans state
        })
    }
    handleSubmit(e){
        e.preventDefault()
        const data = JSON.stringify(this.state)
        console.log(data)
        console.log(this.state.typeSound) //soundauto si rien choisi

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
                            <label htmlFor="superficie" className="form-label">Taille de votre salle qui acceuilera la
                                sonorisation :</label>
                        </div>
                        <div className="col-auto">
                            <input onChange={this.handleChange} type="number"
                                   className="form-control form-control-sm" id="superficie" name="quantity" min="1"
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
                            <label htmlFor="nombredepersonne" className="form-label">Nombre de personnes maximale
                                attendues à l'événement :</label>
                        </div>
                        <div className="col-auto">
                            <input onChange={this.handleChange} type="number"
                                   className="form-control form-control-sm" id="public" name="nombredepersonne"
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
                            <option value="sound1">SoundSystem complet</option>
                            <option value="sound2">SoundSystem moyen</option>
                            <option value="sound3">Petit soundsystem</option>
                        </select>
                    </div>
                    {/*
                        <div className="col-auto form-check">
                            <span className="form-text">Si vous avez une préférence de la type de sonorisation que vous voulez : </span>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" id="grossound" name="typedesound"
                                       value="Gros sound"/>
                                    <label className="form-check-label" htmlFor="grossound">Soundsystem complet (link or
                                        list)</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" id="petitsound" name="typedesound"
                                       value="Petit sound"/>
                                    <label className="form-check-label" htmlFor="petitsound">Soundsystem de taille
                                        moyenne</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" id="sound3" name="typedesound"
                                       value="Mini sound"/>
                                    <label className="form-check-label" htmlFor="sound3">Petit soundsystem </label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" id="nopref1" name="typedesound"
                                       value="nopref1" checked />
                                    <label className="form-check-label" htmlFor="nopref1">Pas de préférences (génération
                                        automatique en fct des paramètres)</label>
                            </div>
                        </div> */}
                    {/* Entrée radio lights */}
                    <div className="col-auto form-check">
                        <label htmlFor="typeLight">Show light voulu : </label>
                        <select name="typeLight" value={this.state.typeLight} onChange={this.handleChange}>
                            <option value="light1">Show light complet</option>
                            <option value="light2">Show light léger</option>
                            <option value="light3">Pas de show light</option>
                        </select>
                    </div>
                        {/*
                        <span
                            className="form-text">Si vous avez une préférence pour le showlight que vous voulez :  </span>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="grosLum" name="typedelumiere"
                                   value="Grosse lum"/>
                                <label className="form-check-label" htmlFor="grosLum">Show lumineux complet</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="moyenLum" name="typedelumiere"
                                   value="Moyenne lum"/>
                                <label className="form-check-label" htmlFor="moyenLum">Show lumineux léger</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="pasDeLum" name="typedelumiere"
                                   value="No lum"/>
                                <label className="form-check-label" htmlFor="pasDeLum">Pas de show lumineux</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="nopref" name="typedesound"
                                   value="nopref" checked />
                                <label className="form-check-label" htmlFor="nopref">Pas de préférences (génération
                                    automatique en fct des paramètres)</label>
                        </div> */}
                    <input type="submit" className="btn btn-primary" value="Génération de la simulation"/>
                        <input type="submit" className="btn btn-primary" value="Resimuler"/>
                            <input type="submit" className="btn btn-primary" value="Enregister la simulation"/>
                                <input type="submit" className="btn btn-primary"
                                       value="Télécharger la simulation au format JPG"/>
                    {JSON.stringify(this.state)}
                </fieldset>
            </form>
            </div>
        );
    }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));  // id du div où on rajoute le code