// eslint-disable-next-line no-undef
describe("Tests pour la page d'accueil", () => {

	it("Test si la page accueil contient tout ses éléments", () => {
		cy.visit("http://localhost:80/");
        cy.get("#logoCouleur");
        cy.get("a[href='mentionslegales']");
	});

    it("Test si la navbar est bien présente sur la page", () => {
        cy.visit("http://localhost:80/");
        cy.get(".nav-link");
    });

});