describe("Instruction message", () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get("#message__container").as("message");
  });
  describe("visibility", () => {
    it("is invisible on load", () => {
      cy.get("#message__container").expectStyle("max-height", "0px");
    });
    it("show instructions on viewport intersect", () => {
      cy.get("@message").scrollIntoView();
      cy.get("@message").expectStyle("max-height", "128px");
      cy.get("@message").contains("Select a weather-type and time-period to get started.");
    });
    it("hides on clicking close icon", () => {
      cy.get('#message__container button').click();
      cy.get("@message").expectStyle("max-height", "0px");
    });
  });
});
