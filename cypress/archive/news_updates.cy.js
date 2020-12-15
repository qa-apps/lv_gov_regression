/// <reference types="cypress" />

describe('News/Updates reachability', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('Aktualitātes reachable from About', () => {
    cy.contains('a', /Par portālu/i).click();
    cy.contains('a', /Aktualitātes/i).click();
    cy.location('pathname').should('match', /./);
  });
});


