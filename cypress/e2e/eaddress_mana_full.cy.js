/// <reference types="cypress" />

/**
 * Consolidated E-adrese and Mana Latvija.lv checks.
 */

describe('E-adrese & Mana Latvija.lv: consolidated', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('E-adrese landing tiles present', () => {
    cy.contains('a', /^E-adrese$/).click();
    const links = [
      'E-adreses pastkastīte',
      'Pieslēgt e-adresi',
      'Informācija par e-adresi',
      'E-adreses lietošanas noteikumi'
    ];
    links.forEach((t) => cy.contains('a', new RegExp(t, 'i')).should('exist'));
  });

  it('Mana Latvija.lv entry and tiles', () => {
    cy.contains('a', /Mana Latvija.lv/i).click();
    const tiles = [
      'E-adreses pastkastīte',
      'Sākt lietot e-adresi',
      'Manas darbības portālā',
      'Profila iestatījumi'
    ];
    tiles.forEach((t) => cy.contains('a', new RegExp(t, 'i')).should('exist'));
  });

  it('navigate each E-adrese tile and back', () => {
    cy.contains('a', /^E-adrese$/).click();
    const links = [
      'E-adreses pastkastīte',
      'Pieslēgt e-adresi',
      'Informācija par e-adresi',
      'E-adreses lietošanas noteikumi'
    ];
    links.forEach((t) => {
      cy.contains('a', new RegExp(t, 'i')).click({ force: true });
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });

  it('navigate each Mana Latvija.lv tile and back', () => {
    cy.contains('a', /Mana Latvija.lv/i).click();
    const tiles = [
      'E-adreses pastkastīte',
      'Sākt lietot e-adresi',
      'Manas darbības portālā',
      'Profila iestatījumi'
    ];
    tiles.forEach((t) => {
      cy.contains('a', new RegExp(t, 'i')).click({ force: true });
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });
});


