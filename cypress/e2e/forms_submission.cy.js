/// <reference types="cypress" />

describe('Forms: submission flows (generic smoke)', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('presence of submit buttons in forms', () => {
    cy.get('form').each(($f) => {
      const btn = Cypress.$($f).find('button[type=\"submit\"], input[type=\"submit\"]');
      if (btn.length) {
        expect(btn.length).to.be.greaterThan(0);
      }
    });
  });
});


