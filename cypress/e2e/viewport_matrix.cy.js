/// <reference types="cypress" />

const VIEWPORTS = [
  [320, 568],
  [375, 667],
  [768, 1024],
  [1366, 850]
];

describe('Viewport matrix renders', () => {
  VIEWPORTS.forEach(([w, h]) => {
    it(`renders at ${w}x${h}`, () => {
      cy.viewport(w, h);
      cy.visit('/');
      cy.contains('h1, h2', /Valsts/i).should('be.visible');
    });
  });
});


