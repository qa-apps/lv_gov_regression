/// <reference types="cypress" />

describe('Services: payments and taxes', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('Nekustamā īpašuma nodokļa link present', () => {
    cy.contains('a', /Pakalpojumi/i).click();
    cy.contains('a', /Nekustamā īpašuma nodokļa/i).should('exist');
  });

  it('Administratīvo sodu nomaksa link present', () => {
    cy.contains('a', /Pakalpojumi/i).click();
    cy.contains('a', /Administratīvo sodu/i).should('exist');
  });
});


