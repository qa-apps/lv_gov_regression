/// <reference types="cypress" />

describe('Keyboard navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('navigate using keyboard focus (basic)', () => {
    cy.get('a, button').first().focus().type('{tab}{tab}');
    cy.focused().should('exist');
  });
});


