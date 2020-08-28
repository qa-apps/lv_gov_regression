/// <reference types="cypress" />

describe('External links open correctly', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('external links have target or rel attributes', () => {
    cy.get('a[target=\"_blank\"]').should('exist');
  });
});


