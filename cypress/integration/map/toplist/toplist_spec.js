/// <reference types="cypress" />
/// <reference types="../support" />

describe("a top-N list of counties by weather/period", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".panel--types .panel-block").first().click();
    cy.get(".panel--periods .panel-block").first().click();
  });
  it("displays top list bar once a type/period is chosen", () => {
    cy.get('.top-list').expectStyle("display", "block");
  });
  it("expands on click", () => {
    cy.get('.top-list').click();
    cy.get('.panel-subsection').expectStyle("height", "400px");
  });
  describe("after expanding", () => {
    beforeEach(() => {
      cy.get('.top-list').click();
    });
    it("filters on typing into the search-box", () => {
      cy.get('.top-list__entry').should('have.length', '20');
      cy.get('.top-list__search input').type("Plaquemines");
      cy.get('.top-list__entry')
        .should('have.length', '1')
        .contains("Plaquemines Parish, Louisiana: 5.16 Inches");
      cy.get('.top-list .panel-heading').contains('(n=1)');
    });
    it("clears the search-box on clicking the clear button", () => {
      cy.get('.top-list__search input').type("em");
      cy.get('[data-testid="atls--button"]')
        .click();
      cy.get('.top-list__entry')
        .should('have.length', '20')
      cy.get('.pagination-link').contains("149");
    });
    it("toggles list sort by ascending/descending on icon click", () => {
      cy.get('.top-list__entry > .panel-icon').first().contains("1");
      cy.get("[data-testid='atlsb--wrapper']").click();
      cy.get('.top-list__entry > .panel-icon').first().contains("2967");
    });
  });
});
