// eslint-disable-next-line no-undef
describe("Tests pour la page contact", () => {

	it("Test si la page contact contient tout les champs du formulaire", () => {
		cy.visit("http://localhost:80/contact");
		cy.get("input[placeholder='Nom']");
		cy.get("input[placeholder='Prénom']");
		cy.get("input[placeholder='Adresse mail']");
		cy.get("textarea[placeholder='Entrez votre commentaire']");
	});

	it("Test si la page contact contient un bouton clickable", () => {
		cy.visit("http://localhost:80/contact");
		cy.get("input[type='submit']");
	});

	it("Test de l'envois du formulaire", () => {
		cy.visit("http://localhost:80/contact");
		cy.get("input[placeholder='Nom']").type("Coda");
		cy.get("input[placeholder='Prénom']").type("Coda");
		cy.get("input[placeholder='Adresse mail']").type("Coda@gmail.com");
		cy.get("textarea[placeholder='Entrez votre commentaire']").type("commentaire");
		cy.get("#formContact").submit();
		cy.on("window:alert", (str) => {
			expect(str).to.equal("Mail envoyé avec success");
		});
	});

});