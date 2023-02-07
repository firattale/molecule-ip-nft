describe("NFT Page", () => {
	it("should render the BrightlistPage", () => {
		// check inputs are visible
		cy.visit("/brightlist");

		cy.get("[data-selector=brightlistButton]").should("be.visible");
		cy.get("[data-selector=brightListInput]").should("be.visible");

		cy.get("[data-selector=revokeInput]").should("be.visible");
		cy.get("[data-selector=revokeButton]").should("be.visible");
	});
});
