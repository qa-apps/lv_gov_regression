/// <reference types="cypress" />

describe('Assets and manifest', () => {
  it('page includes icons or manifest', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/icon|manifest/i);
    });
  });
});


