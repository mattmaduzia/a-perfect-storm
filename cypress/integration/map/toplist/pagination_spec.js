describe("the toplist is paginated to speed up loading and promote legibility", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".panel--types .panel-block").first().click();
    cy.get(".panel--periods .panel-block").first().click();
    cy.get('.top-list').click();
    cy.get('[data-testid="apag--first"]').first().as("first");
    cy.get('[data-testid="apag--prev"]').first().as("prev");
    cy.get('[data-testid="apag--next"]').first().as("next");
    cy.get('[data-testid="apag--last"]').first().as("last");
    cy.get('.app-pagination__number').as("numbers");
  });
  it("handles first page active correctly", () => {
    cy.get(".app-pagination__current").contains("1");
    cy.get('@numbers').contains(/(1|2|74|149)/);
    cy.get('@first').should('have.class', 'is-disabled');
    cy.get('@prev').should('have.class', 'is-disabled');
    cy.get('@next').should('not.have.class', 'is-disabled');
    cy.get('@last').should('not.have.class', 'is-disabled');
  });
  it("handles page 4 active correctly", () => {
    cy.get("@next").click().click().click();
    cy.get(".app-pagination__current").contains("4");
    cy.get('@numbers').contains(/(1|3|4|5|74|149)/);
    cy.get('@first').should('not.have.class', 'is-disabled');
    cy.get('@prev').should('not.have.class', 'is-disabled');
    cy.get('@next').should('not.have.class', 'is-disabled');
    cy.get('@last').should('not.have.class', 'is-disabled');
  });
  it("handles middle page active correctly", () => {
    cy.get('.app-pagination__number').contains("74").click();
    cy.get(".app-pagination__current").contains("74");
    cy.get('@numbers').contains(/(1|73|74|75|149)/);
    cy.get('@first').should('not.have.class', 'is-disabled');
    cy.get('@prev').should('not.have.class', 'is-disabled');
    cy.get('@next').should('not.have.class', 'is-disabled');
    cy.get('@last').should('not.have.class', 'is-disabled');
  });
  it("handles last page active correctly", () => {
    cy.get('.app-pagination__number').contains("149").click();
    cy.get(".app-pagination__current").contains("149");
    cy.get('@numbers').contains(/(1|74|148|149)/);
    cy.get('@first').should('not.have.class', 'is-disabled');
    cy.get('@prev').should('not.have.class', 'is-disabled');
    cy.get('@next').should('have.class', 'is-disabled');
    cy.get('@last').should('have.class', 'is-disabled');
  });
  it("handles last page active correctly", () => {
    cy.get('.app-pagination__number').contains("149").click();
    cy.get("@prev").click().click().click();
    cy.get(".app-pagination__current").contains("146");
    cy.get('@numbers').contains(/(1|74|145|146|147|149)/);
    cy.get('@first').should('not.have.class', 'is-disabled');
    cy.get('@prev').should('not.have.class', 'is-disabled');
    cy.get('@next').should('not.have.class', 'is-disabled');
    cy.get('@last').should('not.have.class', 'is-disabled');
  });
});
