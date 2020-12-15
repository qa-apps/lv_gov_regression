/// <reference types="cypress" />

describe('UI focus management', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('tabbing focuses interactive elements', () => {
    cy.get('a, button').first().focus().should('be.focused');
  });
});


