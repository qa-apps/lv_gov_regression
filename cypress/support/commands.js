// Custom Cypress commands
import 'cypress-real-events/support';
import 'cypress-axe';

Cypress.Commands.add('acceptCookies', () => {
  cy.contains('button', /Piekrist visam/i, { timeout: 10000 }).click({ force: true }).log('cookies accepted');
});

Cypress.Commands.add('openSearch', () => {
  cy.contains('button', /Mekl/i).click({ force: true });
});

Cypress.Commands.add('typeSearch', (text) => {
  cy.get('input[type=\"search\"], [role=\"searchbox\"], input[name*=\"mekl\"]', { timeout: 10000 }).first().clear().type(text);
});

Cypress.Commands.add('header', () => {
  return cy.get('header, [role=\"banner\"], .header').first();
});

// Minimal accessibility check helper
Cypress.Commands.add('checkA11yBlock', (selector) => {
  cy.injectAxe();
  cy.checkA11y(selector || 'body', {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
  });
});


