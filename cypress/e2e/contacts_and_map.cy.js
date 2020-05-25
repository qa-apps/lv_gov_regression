/// <reference types="cypress" />

describe('Contacts and sitemap', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('contacts page reachable', () => {
    cy.contains('a', /Kontakti/i).click();
    cy.location('pathname').should('match', /./);
  });

  it('sitemap link present', () => {
    cy.contains('a', /lapas karti/i).should('exist');
  });
});


