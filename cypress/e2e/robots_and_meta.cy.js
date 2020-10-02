/// <reference types="cypress" />

describe('Robots and meta tags', () => {
  it('robots.txt reachable or denied', () => {
    cy.request({ url: '/robots.txt', failOnStatusCode: false }).its('status').should('be.oneOf', [200, 404]);
  });

  it('HTML contains meta description', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/<meta[^>]+name=[\"']description[\"']/i);
    });
  });
});


