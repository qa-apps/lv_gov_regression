/// <reference types="cypress" />

describe('Content presence sanity', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('front page contains main blocks', () => {
    ['Visi pakalpojumi', 'Ko darīt, ja', 'Mana Latvija.lv'].forEach((h) => {
      cy.contains('h2', new RegExp(h, 'i')).should('be.visible');
    });
  });
});


