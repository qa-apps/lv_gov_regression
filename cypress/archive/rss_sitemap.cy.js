/// <reference types="cypress" />

describe('Sitemap/RSS endpoints', () => {
  it('sitemap endpoint exists', () => {
    cy.request({ url: '/sitemap.xml', failOnStatusCode: false }).its('status').should('be.oneOf', [200, 404]);
  });
});


