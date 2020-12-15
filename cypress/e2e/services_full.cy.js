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
});


