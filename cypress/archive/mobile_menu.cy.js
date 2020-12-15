/// <reference types="cypress" />

describe('Mobile menu interactions', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.visit('/');
    cy.acceptCookies();
  });

  it('menu opens and shows navigation', () => {
    cy.contains('button, [aria-label=\"menu\"]', /menu|burger|navigation/i).click({ force: true });
    cy.get('nav a').should('have.length.greaterThan', 3);
  });
});


