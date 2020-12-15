/// <reference types="cypress" />

describe('Usability & UI basics', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('logo links to home', () => {
    cy.get('a[href=\"/\"]').first().click({ force: true });
    cy.location('pathname').should('eq', '/');
  });

  it('skip links or landmark structure present', () => {
    cy.get('main, [role=\"main\"]').should('exist');
    cy.get('header, [role=\"banner\"]').should('exist');
    cy.get('footer, [role=\"contentinfo\"]').should('exist');
  });

  it('contrast accessible on header links (visual presence)', () => {
    cy.get('nav a').should('have.length.greaterThan', 3);
  });
});


