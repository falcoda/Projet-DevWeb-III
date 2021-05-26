// eslint-disable-next-line no-undef
describe("Tests pour la page d'authentification", () => {

    it("Test si la page profil contient tout ses éléments", () => {
        cy.visit("http://localhost:80/authentification");
        cy.get("#adressemail1").type("michelt@rgrg.ege");
        cy.get("#motdepasse1").type("12345678");
        cy.get("#formConnexion").submit();
        cy.get("#bouton_panier");
        cy.get("#bouton_commande");
        cy.get("h3").contains("Profil de michelt@rgrg.ege");
    });

    it("Test du bouton commande", () => {
        cy.visit("http://localhost:80/authentification");
        cy.get("#adressemail1").type("michelt@rgrg.ege");
        cy.get("#motdepasse1").type("12345678");
        cy.get("#formConnexion").submit();
        cy.get("#bouton_commande").click();
        cy.get("table").contains("18/05/2021");
        cy.get("table").contains("12/05/2021");
        cy.get("table").contains("08/05/2021");
    });

    it("Test du détail d'une commande", () => {
        cy.visit("http://localhost:80/authentification");
        cy.get("#adressemail1").type("michelt@rgrg.ege");
        cy.get("#motdepasse1").type("12345678");
        cy.get("#formConnexion").submit();
        cy.get("#bouton_commande").click();
        cy.get("button[value='62']").click();
        cy.get("#recapCommande62").contains("cvrD3002");
        cy.get("#recapCommande62").contains("tdController");
    });

    it("Test du bouton panier", () => {
        cy.visit("http://localhost:80/authentification");
        cy.get("#adressemail1").type("michelt@rgrg.ege");
        cy.get("#motdepasse1").type("12345678");
        cy.get("#formConnexion").submit();
        cy.get("#bouton_panier").click();
        cy.get("#utilisateurs").contains("mth30");
        cy.get("#utilisateurs").contains("turbotop");
    });

});