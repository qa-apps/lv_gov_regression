/// <reference types="cypress" />

describe('Statistics page navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('navigates to statistics from About', () => {
    cy.contains('a', /Par portālu/i).click();
    cy.contains('a', /Statistika/i).click();
    cy.location('pathname').should('match', /./);
  });
});


