/// <reference types="cypress" />

/**
 * Consolidated security smoke:
 * - Response headers (CSP, HSTS, etc.)
 * - Basic rate-limit tolerance (no block)
 * - Reflected XSS negative via search
 * - External links attributes
 */

const SECURITY_HEADERS = [
  'content-security-policy',
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
  'strict-transport-security'
];

describe('Security: consolidated', () => {
  it('home responds with common security headers', () => {
    cy.request({ url: '/', followRedirect: true }).then((resp) => {
      const headers = resp.headers;
      SECURITY_HEADERS.forEach((h) => {
        expect(headers, `${h} present`).to.have.property(h);
      });
    });
  });

  it('lightweight rate-limit smoke', () => {
    const attempts = Array.from({ length: 5 });
    attempts.forEach(() => {
      cy.request({ url: '/', followRedirect: true }).its('status').should('be.oneOf', [200, 301, 302]);
    });
  });

  it('reflected XSS payload not rendered via search', () => {
    cy.visit('/');
    cy.acceptCookies();
    const payload = '<img src=x onerror=alert(1)>';
    cy.contains('button', /Mekl/).click();
    cy.get('input[type=\"search\"], [role=\"searchbox\"]').first().type(payload).type('{enter}');
    cy.contains(payload).should('not.exist');
  });

  it('external links include target or rel attributes', () => {
    cy.visit('/');
    cy.acceptCookies();
    cy.get('a[target=\"_blank\"], a[rel*=\"noopener\"]').its('length').should('be.greaterThan', 0);
  });
});


