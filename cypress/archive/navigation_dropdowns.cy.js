/// <reference types="cypress" />

const SERVICES_SUBSETS = [
  'Populārie pakalpojumi',
  'Dzīvesvietas deklarēšana',
  'Administratīvo sodu',
  'Parakstu vākšana',
  'Nekustamā īpašuma nodokļa',
];

const WHAT_TO_DO_SETS = [
  'Bezdarbnieku pabalsts',
  'Gada ienākumu deklarācija',
  'Bērna gaidīšana',
  'Rīcība saslimšanas',
];

describe('Navigation: dropdown menus', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('Pakalpojumi dropdown items clickable', () => {
    cy.contains('a', /Pakalpojumi/i).realHover();
    SERVICES_SUBSETS.forEach((label) => {
      cy.contains('a, [role=\"menuitem\"]', new RegExp(label, 'i')).should('be.visible');
    });
  });

  it('Ko darīt, ja..? dropdown items visible', () => {
    cy.contains('a', /Ko darīt/i).realHover();
    WHAT_TO_DO_SETS.forEach((label) => {
      cy.contains('a, [role=\"menuitem\"]', new RegExp(label, 'i')).should('be.visible');
    });
  });
});


