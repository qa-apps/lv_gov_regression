/// <reference types="cypress" />

describe('Mana Latvija.lv area entry points', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('entry link visible and clickable', () => {
    cy.contains('a', /Ienākt Mana Latvija.lv/i).should('be.visible').click();
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('section tiles visible', () => {
    cy.contains('a', /Mana Latvija.lv/i).click();
    const tiles = [
      'E-adreses pastkastīte',
      'Sākt lietot e-adresi',
      'Manas darbības portālā',
      'Profila iestatījumi'
    ];
    tiles.forEach((t) => cy.contains('a', new RegExp(t, 'i')).should('exist'));
  });
});


