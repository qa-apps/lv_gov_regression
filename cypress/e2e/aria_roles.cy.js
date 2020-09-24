/// <reference types="cypress" />

describe('ARIA roles presence', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('landmarks have roles', () => {
    cy.get('[role=\"banner\"], header').should('exist');
    cy.get('[role=\"main\"], main').should('exist');
    cy.get('[role=\"contentinfo\"], footer').should('exist');
  });
});


