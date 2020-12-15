/// <reference types="cypress" />

describe('Policies pages', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('privacy and cookies policies reachable', () => {
    const links = ['Privātuma politika', 'Sīkdatņu politika', 'Piekļūstamības paziņojums'];
    links.forEach((l) => {
      cy.contains('a', new RegExp(l, 'i')).should('be.visible').click();
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });
});


