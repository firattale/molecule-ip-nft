describe("NFT Page", () => {
	it("should render the form", () => {
		// check inputs are visible
		cy.visit("/");

		cy.get("[data-selector=cureLabel]").should("be.visible");
		cy.get("[data-selector=cureInput]").should("be.visible");

		cy.get("[data-selector=researcherLabel]").should("be.visible");
		cy.get("[data-selector=researcherInput]").should("be.visible");

		cy.get("[data-selector=universityLabel]").should("be.visible");
		cy.get("[data-selector=universityInput]").should("be.visible");

		cy.get("[data-selector=patentIdLabel]").should("be.visible");
		cy.get("[data-selector=patentIdInput]").should("be.visible");

		cy.get("[data-selector=institutionLabel]").should("be.visible");
		cy.get("[data-selector=institutionInput]").should("be.visible");
		cy.get("[data-selector=mintButton]").should("be.visible");
	});

	it("should render the errors", () => {
		cy.visit("/");

		cy.get("[data-selector=patentIdInput]").type("12");
		cy.get("[data-selector=mintButton]").click();
		cy.get("[data-selector=patentIdError]").should("have.text", "Invalid patent ID");
		cy.get("[data-selector=patentIdInput]").clear();

		cy.get("[data-selector=patentIdInput]").type("A-12325/CANCER");
		cy.get("[data-selector=universityInput]").click();

		cy.get("[data-selector=patentIdError]").should("not.exist");
	});
	it("should submit the form", () => {
		cy.visit("/");

		cy.get("[data-selector=cureInput]").type("Cancer");
		cy.get("[data-selector=researcherInput]").type("Firat Tale");
		cy.get("[data-selector=universityInput]").type("Kocaeli Uni");
		cy.get("[data-selector=universityInput]").type("Kocaeli Uni");
		cy.get("[data-selector=patentIdInput]").type("A-12325/CANCER");
		cy.get("[data-selector=institutionInput]").type("Oncology");
		cy.get("[data-selector=mintButton]").click();
	});
});
