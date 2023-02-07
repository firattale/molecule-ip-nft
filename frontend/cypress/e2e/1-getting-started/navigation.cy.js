describe("Navigation", () => {
	it("should navigate to the about page", () => {
		// Start from the index page
		cy.visit("/");

		// Find a link with an href attribute containing "brightlist" and click it
		cy.get('a[href*="brightlist"]').click();

		// The new url should include "/brightlist"
		cy.url().should("include", "/brightlist");

		// The new page should contain an h1 with "Brightlist page"
		cy.get("div").contains("Brightlist Page");

		cy.get('a[href*="brightlist"]').click();

		cy.get("[data-selector=logo]").click();
		cy.get("[data-selector=mintButton]").should("be.visible");
	});
});
