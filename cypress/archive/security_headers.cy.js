/// <reference types="cypress" />

const SECURITY_HEADERS = [
  'content-security-policy',
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
  'strict-transport-security'
];

describe('Security headers', () => {
  it('home page responds with key security headers', () => {
    cy.request({ url: '/', followRedirect: true }).then((resp) => {
      const headers = resp.headers;
      SECURITY_HEADERS.forEach((h) => {
        expect(headers, `${h} present`).to.have.property(h);
      });
    });
  });
});


