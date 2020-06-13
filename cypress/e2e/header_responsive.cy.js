/// <reference types="cypress" />

describe('Header responsive behavior', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('shows burger menu on mobile viewport', () => {
    cy.viewport(375, 667);
    cy.contains('button, [aria-label=\"menu\"]', /menu|burger|navigation/i).should('exist');
  });
});


