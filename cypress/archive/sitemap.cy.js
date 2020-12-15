/// <reference types="cypress" />

describe('Sitemap page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('sitemap lists many links', () => {
    cy.contains('a', /lapas karti/i).click();
    cy.get('a').its('length').should('be.greaterThan', 10);
  });
});


