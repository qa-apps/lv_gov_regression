/// <reference types="cypress" />

describe('Error pages and redirects', () => {
  it('unknown route returns 404 or redirects', () => {
    cy.request({ url: '/definitely-not-a-page', failOnStatusCode: false }).then((resp) => {
      expect([404, 301, 302]).to.include(resp.status);
    });
  });
});


