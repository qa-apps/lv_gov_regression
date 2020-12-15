/// <reference types="cypress" />

describe('E-adrese section', () => {
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
    links.forEach((t) => {
      cy.contains('a', new RegExp(t, 'i')).should('exist');
    });
  });
});


