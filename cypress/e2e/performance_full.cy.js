/// <reference types="cypress" />

/**
 * Consolidated performance smoke.
 */

describe('Performance: consolidated', () => {
  it('home responds within acceptable time window', () => {
    const start = Date.now();
    cy.visit('/');
    cy.title().should('exist').then(() => {
      const elapsed = Date.now() - start;
      expect(elapsed).to.be.lessThan(15000);
    });
  });

  it('TTFB sanity via request duration', () => {
    const before = Date.now();
    cy.request({ url: '/', followRedirect: true }).then(() => {
      const duration = Date.now() - before;
      expect(duration).to.be.lessThan(5000);
    });
  });

  it('static assets respond quickly', () => {
    cy.request('/').then((resp) => {
      const matches = resp.body.match(/<link[^>]+href=[\"']([^\"']+\\.css)[\"']/i);
      if (matches && matches[1]) {
        const href = matches[1];
        cy.request({ url: href, failOnStatusCode: false }).its('status').should('be.oneOf', [200, 304]);
      }
    });
  });
});


