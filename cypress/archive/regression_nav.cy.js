/// <reference types="cypress" />

const NAV = ['Pakalpojumi', 'Ko darīt', 'Mana Latvija.lv', 'E-adrese', 'Par portālu'];

describe('Regression: navigate all main sections', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('each main nav item is reachable', () => {
    NAV.forEach((n) => {
      cy.get('nav').contains('a', new RegExp(n, 'i')).click();
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });
});


