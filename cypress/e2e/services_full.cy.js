/// <reference types="cypress" />

/**
 * Consolidated services checks:
 * - Popular services presence
 * - Payments/taxes related entries
 */

const POPULAR_ITEMS = [
  'Dzīvesvietas deklarēšana vai norādīšana',
  'Administratīvo sodu',
  'Parakstu vākšana',
  'Nekustamā īpašuma nodokļa',
  'Slimības pabalsta',
  'Bezdarbnieka pabalsts',
  'Bērna piedzimšanas pabalsts',
  'Maternitātes pabalsts',
  'Paternitātes pabalsts',
  'Informācija par prognozēto pensiju'
];

describe('Services: consolidated', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
    cy.contains('a', /Pakalpojumi/i).click();
  });

  it('popular services block lists common entries', () => {
    POPULAR_ITEMS.forEach((name) => {
      cy.contains('a, button', new RegExp(name, 'i')).should('exist');
    });
  });

  it('payments & fines related entries appear', () => {
    cy.contains('a', /Nekustamā īpašuma nodokļa/i).should('exist');
    cy.contains('a', /Administratīvo sodu/i).should('exist');
  });

  it('pension and benefits related entries exist', () => {
    const items = [
      'Pensijas mantošana',
      'Informācija par prognozēto pensiju',
      'Pensijas pārvaldītāja izvēle',
      'Iesniegums vecuma pensijas pārrēķināšanai',
      'Apbedīšanas pabalsts',
      'Iesniegums slimības pabalsta piešķiršanai',
      'Iesniegums bezdarbnieka pabalsta piešķiršanai'
    ];
    items.forEach((t) => cy.contains('a, button', new RegExp(t, 'i')).should('exist'));
  });

  it('family benefits related entries exist', () => {
    const items = [
      'Bērna piedzimšanas pabalsts',
      'Maternitātes',
      'Paternitātes',
    ];
    items.forEach((t) => cy.contains('a, button', new RegExp(t, 'i')).should('exist'));
  });

  it('navigate to first ten service links and back (smoke)', () => {
    cy.get('a').filter(':visible').then(($links) => {
      const firstTen = Array.from($links).slice(0, 10);
      firstTen.forEach((a) => {
        const $a = Cypress.$(a);
        const href = $a.attr('href');
        if (href && href !== '#') {
          cy.wrap($a).click({ force: true });
          cy.location('pathname').should('match', /./);
          cy.go('back');
          cy.contains('a', /Pakalpojumi/i).should('be.visible');
        }
      });
    });
  });
});


