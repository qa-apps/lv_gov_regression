/// <reference types="cypress" />

const SITUATIONS = [
  'Bezdarbnieku pabalsts',
  'Gada ienākumu deklarācija',
  'Bērna gaidīšana',
  'Rīcība saslimšanas'
];

describe('Life situations', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('top life situations visible', () => {
    cy.contains('a', /Ko darīt, ja/i).click();
    SITUATIONS.forEach((s) => cy.contains('a', new RegExp(s, 'i')).should('exist'));
  });
});


