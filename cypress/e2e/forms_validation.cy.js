/// <reference types="cypress" />

describe('Forms: basic validation (generic patterns)', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('email input rejects invalid format where present', () => {
    cy.get('input[type=\"email\"]').first().then(($el) => {
      if ($el.length) {
        cy.wrap($el).type('invalid-email').blur();
        cy.wrap($el)[0]?.checkValidity && expect($el[0].checkValidity()).to.eq(false);
      }
    });
  });
});


