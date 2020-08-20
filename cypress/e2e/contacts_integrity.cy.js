/// <reference types="cypress" />

describe('Contacts integrity', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('contact email and phone are visible on Contacts', () => {
    cy.contains('a', /Kontakti/i).click();
    cy.contains(/portals@vdaa.gov.lv/i).should('exist');
    cy.contains(/6750/).should('exist');
  });
});


