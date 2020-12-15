/// <reference types="cypress" />

/**
 * Consolidated cookies banner and print CSS checks.
 */

describe('Cookies + Print CSS: consolidated', () => {
  it('cookie banner accept removes banner', () => {
    cy.visit('/');
    cy.contains('button', /Piekrist visam/i, { timeout: 10000 }).click({ force: true });
    cy.contains('button', /Piekrist visam/i).should('not.exist');
  });

  it('footer legal links present', () => {
    cy.visit('/');
    cy.acceptCookies();
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

  it('print styles exist', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/media=\"print\"|@media\\s+print/i);
    });
  });
});


