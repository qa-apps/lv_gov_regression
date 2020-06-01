/// <reference types="cypress" />

describe('Language switch', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('switch to EN and back', () => {
    cy.contains('a,button', /^EN$/).should('be.visible').click({ force: true });
    cy.contains('a,button', /^LV$/).should('exist').click({ force: true });
  });
});


