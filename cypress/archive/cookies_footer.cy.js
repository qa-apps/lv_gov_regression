/// <reference types="cypress" />

describe('Cookies and footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('cookie banner accept works', () => {
    cy.contains('button', /Piekrist visam/i, { timeout: 10000 }).click({ force: true });
    cy.contains('button', /Piekrist visam/i).should('not.exist');
  });

  it('footer legal links present', () => {
    const footerLinks = [
      'Privātuma politika',
      'Sīkdatņu politika',
      'Personas datu apstrādes principi',
      'Lietošanas noteikumi',
      'Piekļūstamības paziņojums'
    ];
    footerLinks.forEach((t) => {
      cy.get('footer').contains('a', new RegExp(t, 'i')).should('exist');
    });
  });
});


