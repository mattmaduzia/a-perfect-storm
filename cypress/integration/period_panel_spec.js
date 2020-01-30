const blocks = [
  {icon: "calendar", period: "Annual",},
  {icon: "snowman", period: "Winter",},
  {icon: "flower-outline", period: "Spring",},
  {icon: "beach", period: "Summer",},
  {icon: "leaf", period: "Fall",},
];

describe("sidebar containing the periods weather measured", () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it("activates periods on click", () => {
    cy.get('.panel--periods [data-testid="apb--wrapper"]').each(($weatherType, typeIndex) => {
      let blockElement = blocks[typeIndex];
      cy.wrap($weatherType).contains(blockElement.period).then($block => {
        cy.wrap($block).find(`.mdi-${blockElement.icon}`);
        cy.wrap($block).click().should('have.class', 'has-background-accent').and('have.class', 'has-text-white');
      });
    });
  });
});
