// eslint-disable-next-line no-undef
describe("Tests pour la page d'authentification", () => {

    it("Test si la page authentification contient tout les éléments de la connexion", () => {
        cy.visit("http://localhost:80/authentification");
        cy.get("#formConnexion");
        cy.get("#adressemail1");
        cy.get("#motdepasse1");
        cy.get("#buttonSubmit");
    });

    it("Test si la page authentification contient tout les éléments de l'inscription", () => {
        cy.visit("http://localhost:80/authentification");
        cy.get("#formInscription");
        cy.get("#nom");
        cy.get("#prenom");
        cy.get("#numerotel");
        cy.get("#adressemail2");
        cy.get("#motdepasse2");
        cy.get("#confirmation");
        cy.get("#buttonSubmit2");
    });

    it("Test si la navbar est bien présente sur la page", () => {
        cy.visit("http://localhost:80/");
        cy.get(".nav-link");
    });

    it("Test de la connexion", () => {
        cy.visit("http://localhost:80/authentification");
        cy.get("#adressemail1").type("michelt@rgrg.ege");
        cy.get("#motdepasse1").type("12345678");
        cy.get("#formConnexion").submit();
        cy.get("h3");
    });
});