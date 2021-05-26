// eslint-disable-next-line no-undef
describe("Tests pour la page matériel", () => {

	it("Tests si la page matériel contient bien le react", () => {
		cy.visit("http://localhost:80/materiel");
		cy.get("#materielsTable");
		cy.get("#typeSelect");
	});

	it("Test si la navbar est bien présente sur la page", () => {
		cy.visit("http://localhost:80/");
		cy.get(".nav-link");
	});

	it("Tests si le matériel est bien présent sur la page", () => {
		cy.visit("http://localhost:80/materiel");
		cy.get("#container2").contains("mth30");
	});

	it("Tests si le matériel est bien présent sur la page lorsque on sélectionne la catégorie ampli", () => {
		cy.visit("http://localhost:80/materiel");
		cy.get("#gender1").select("ampli");
		cy.get("#materielsTable").contains("qscRmx2450");
		cy.get("#materielsTable").should("not.contain", "mth30");
	});

	it("Tests si le matériel est bien présent sur la page lorsque on sélectionne la catégorie processeur", () => {
		cy.visit("http://localhost:80/materiel");
		cy.get("#gender1").select("processeur");
		cy.get("#materielsTable").contains("tdController");
		cy.get("#materielsTable").should("not.contain", "nexo");
	});
});
