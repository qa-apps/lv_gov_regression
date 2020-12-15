/// <reference types="cypress" />

describe('Print CSS presence', () => {
  it('has print styles or stylesheets', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/media=\"print\"|@media\\s+print/i);
    });
  });
});


