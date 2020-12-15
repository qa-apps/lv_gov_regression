/// <reference types="cypress" />

/**
 * Consolidated responsive checks:
 * - Viewport matrix render
 * - Mobile menu presence
 */

const VIEWPORTS = [
  [320, 568],
  [375, 667],
  [768, 1024],
  [1366, 850]
];

describe('Responsive: consolidated suite', () => {
  it('renders across common viewport sizes', () => {
    VIEWPORTS.forEach(([w, h]) => {
      cy.viewport(w, h);
      cy.visit('/');
      cy.acceptCookies();
      cy.contains('h1, h2', /Valsts/i).should('be.visible');
    });
  });

  it('mobile viewport shows a burger/menu control', () => {
    cy.viewport(375, 667);
    cy.visit('/');
    cy.acceptCookies();
    cy.contains('button, [aria-label=\"menu\"]', /menu|burger|navigation/i).should('exist').click({ force: true });
    cy.get('nav a').should('have.length.greaterThan', 3);
  });
});


