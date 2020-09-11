/// <reference types="cypress" />

describe('Security: lightweight rate-limit smoke', () => {
  it('multiple requests to home respond with 200/3xx', () => {
    const attempts = Array.from({ length: 5 }).map((_, i) =>
      cy.request({ url: '/', followRedirect: true }).its('status').should('be.oneOf', [200, 301, 302])
    );
    cy.wrap(attempts);
  });
});


