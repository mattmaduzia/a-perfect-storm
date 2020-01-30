declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Asserts a single CSS property
     * @example
     * cy.expectStyle("width", "10px")
     */
    expectStyle(property: string, value: string): Chainable<any>

    /**
     * Asserts multiple CSS properties
     * @example
     * cy.expectStyles({
     *   width: "10px",
     *   height: "20px",
     * })
     */
    expectStyles(properties: any): Chainable<any>

    /**
     * Asserts the absence of a single CSS property
     * @example
     * cy.notExpectStyle("width", "11px")
     */
    notExpectStyle(property: string, value: string): Chainable<any>

    /**
     * Asserts the absence of multiple CSS properties
     * @example
     * cy.notExpectStyles({
     *   width: "11px",
     *   height: "19px",
     * })
     */
    notExpectStyles(properties: any): Chainable<any>
  }
}
