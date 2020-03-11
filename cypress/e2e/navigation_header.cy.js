/// <reference types="cypress" />

const TOP_NAV = [
  'Sākums',
  'Pakalpojumi',
  'Ko darīt',
  'Mana Latvija.lv',
  'E-adrese',
  'Par portālu'
];

describe('Navigation: header links', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('all top links are interactable', () => {
    TOP_NAV.forEach((name) => {
      cy.get('nav').contains('a', new RegExp(name, 'i')).should('be.visible').click();
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });

  it('language switch to EN exists', () => {
    cy.contains('a,button', /^EN$/).should('be.visible');
  });

  it('header search toggle works', () => {
    cy.contains('button', /Mekl/).click();
    cy.get('input[type=\"search\"], [role=\"searchbox\"]').should('be.visible');
    cy.contains('button', /Aizvērt meklētāju/i).click({ force: true });
  });

  it('user entry link visible', () => {
    cy.contains('a', /Ienākt Mana Latvija.lv/i).should('be.visible');
  });
});


