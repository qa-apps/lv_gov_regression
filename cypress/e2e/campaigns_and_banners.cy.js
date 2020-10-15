/// <reference types="cypress" />

describe('Campaigns and banners area', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('promoted items block visible', () => {
    cy.contains(/Pievērs uzmanību!/i).should('be.visible');
  });
});


