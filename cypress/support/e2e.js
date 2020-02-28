import './commands';

beforeEach(() => {
  cy.session('base', () => {
    cy.visit('/');
    cy.contains('button', /Piekrist visam/i, { timeout: 10000 }).click({ force: true });
  });
  cy.visit('/');
});


