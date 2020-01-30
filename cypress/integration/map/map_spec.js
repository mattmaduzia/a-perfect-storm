/// <reference types="cypress" />
/// <reference types="../support" />

describe("a choropleth of US weather by type/period", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("displays on load", () => {
    cy.get("#map").children()
      .should("have.length", 3143)
      .first()
      .should("have.css", "fill", "rgb(135, 206, 235)"); // skyblue
  });
  it("changes color on selection of type and period", () => {
    cy.get(".panel--types .panel-block").first().click();
    cy.get(".panel--periods .panel-block").first().click();

    cy.get("#map")
      .children()
      .first()
      .should("not.have.css", "fill", "rgb(135, 206, 235)"); // skyblue
  });
});
