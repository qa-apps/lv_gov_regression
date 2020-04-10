/// <reference types="cypress" />

describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
    cy.injectAxe();
  });

  it('has no critical a11y violations on main sections', () => {
    const sections = ['header', 'main', 'footer'];
    sections.forEach((s) => {
      cy.checkA11y(s, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      });
    });
  });
});


