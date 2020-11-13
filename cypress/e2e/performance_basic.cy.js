/// <reference types="cypress" />

describe('Performance basic', () => {
  it('responds quickly enough', () => {
    const start = Date.now();
    cy.visit('/');
    cy.title().should('exist').then(() => {
      const elapsed = Date.now() - start;
      expect(elapsed).to.be.lessThan(15000);
    });
  });
});


