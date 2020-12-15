/// <reference types="cypress" />

/**
 * Consolidated accessibility checks:
 * - Axe on header/main/footer
 * - ARIA landmarks presence
 * - Basic focusability and keyboard navigation
 */

const LANDMARKS = [
  { selector: 'header, [role=\"banner\"]', role: 'banner' },
  { selector: 'main, [role=\"main\"]', role: 'main' },
  { selector: 'footer, [role=\"contentinfo\"]', role: 'contentinfo' }
];

describe('Accessibility: consolidated suite', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
    cy.injectAxe();
  });

  it('ARIA landmark regions are present', () => {
    LANDMARKS.forEach(({ selector }) => {
      cy.get(selector).should('exist');
    });
  });

  it('axe: no critical violations on header, main, footer', () => {
    ['header', 'main', 'footer'].forEach((region) => {
      cy.checkA11y(region, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
      });
    });
  });

  it('focus starts on an interactive element and can tab forward', () => {
    cy.get('a, button').first().focus().should('be.focused');
    cy.focused().type('{tab}');
    cy.focused().should('exist');
  });
});


