// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("expectStyle", { prevSubject: true }, (subject, property, value) => {
  return cy.wrap(subject).should('have.css', property, value);
});

Cypress.Commands.add("expectStyles", { prevSubject: true }, (subject, styles) => {
    for (let [key, value] of Object.entries(styles)) {
      cy.wrap(subject).should('have.css', key, value);
    }
    return cy.wrap(subject);
});

Cypress.Commands.add("notExpectStyle", { prevSubject: true }, (subject, property, value) => {
  return cy.wrap(subject).should('not.have.css', property, value);
});

Cypress.Commands.add("notExpectStyles", { prevSubject: true }, (subject, styles) => {
  for (let [key, value] of Object.entries(styles)) {
    cy.wrap(subject).should('not.have.css', key, value);
  }
  return cy.wrap(subject);
});
