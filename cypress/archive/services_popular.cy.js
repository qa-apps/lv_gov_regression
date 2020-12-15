/// <reference types="cypress" />

const POPULAR_ITEMS = [
  'Dzīvesvietas deklarēšana vai norādīšana',
  'Administratīvo sodu pārbaude',
  'Parakstu vākšana',
  'Nekustamā īpašuma nodokļa',
  'Slimības pabalsta piešķiršana',
  'Bezdarbnieka pabalsts',
  'Bērna piedzimšanas pabalsts',
  'Maternitātes pabalsts',
  'Paternitātes pabalsts',
  'Informācija par prognozēto pensiju'
];

describe('Services: popular links presence', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('popular items are visible in Services', () => {
    cy.contains('a', /Pakalpojumi/i).click();
    POPULAR_ITEMS.forEach((name) => {
      cy.contains('a, button', new RegExp(name, 'i')).should('exist');
    });
  });
});


