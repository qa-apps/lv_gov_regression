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
});


