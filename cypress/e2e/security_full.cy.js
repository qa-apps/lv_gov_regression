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

  it('unknown route returns 404 or redirects', () => {
    cy.request({ url: '/definitely-not-a-page', failOnStatusCode: false }).then((resp) => {
      expect([404, 301, 302]).to.include(resp.status);
    });
  });

  it('security headers have reasonable values when present', () => {
    cy.request({ url: '/', followRedirect: true }).then((resp) => {
      const headers = resp.headers;
      if (headers['x-content-type-options']) {
        expect(headers['x-content-type-options']).to.match(/nosniff/i);
      }
      if (headers['referrer-policy']) {
        expect(headers['referrer-policy']).to.match(/no-referrer|same-origin|strict-origin/i);
      }
      if (headers['x-frame-options']) {
        expect(headers['x-frame-options']).to.match(/deny|sameorigin/i);
      }
    });
  });

  it('Strict-Transport-Security is long enough if present', () => {
    cy.request({ url: '/', followRedirect: true }).then((resp) => {
      const hsts = resp.headers['strict-transport-security'];
      if (hsts) {
        const maxAge = /max-age=(\\d+)/i.exec(hsts);
        if (maxAge && maxAge[1]) {
          expect(parseInt(maxAge[1], 10)).to.be.greaterThan(15552000); // >180 days
        }
      }
    });
  });

  it('homepage markup does not include insecure http links', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).not.to.match(/href=\\\"http:\\/\\//i);
    });
  });

  it('CSP header has sane directives if present', () => {
    cy.request('/').then((resp) => {
      const csp = resp.headers['content-security-policy'];
      if (csp) {
        expect(csp).to.match(/default-src|script-src|style-src/i);
      }
    });
  });

  it('Permissions-Policy or Feature-Policy header noted if present', () => {
    cy.request('/').then((resp) => {
      const pp = resp.headers['permissions-policy'] || resp.headers['feature-policy'];
      if (pp) {
        expect(pp.length).to.be.greaterThan(0);
      }
    });
  });

  it('Set-Cookie flags include Secure/SameSite when cookies set', () => {
    cy.request('/').then((resp) => {
      const setCookie = resp.headers['set-cookie'];
      if (setCookie && setCookie.length) {
        const serialized = Array.isArray(setCookie) ? setCookie.join('; ') : String(setCookie);
        expect(serialized).to.match(/Secure/i);
        expect(serialized).to.match(/SameSite/i);
      }
    });
  });

  it('protocol is HTTPS on main visit', () => {
    cy.visit('/');
    cy.location('protocol').should('eq', 'https:');
  });

  it('repeated GET/HEAD to home are successful', () => {
    const paths = ['/', '/'];
    paths.forEach((p) => {
      cy.request({ url: p, method: 'GET', followRedirect: true }).its('status').should('be.oneOf', [200, 301, 302]);
      cy.request({ url: p, method: 'HEAD', failOnStatusCode: false }).its('status').should('be.oneOf', [200, 301, 302, 405]);
    });
  });

  it('referrer-policy avoids unsafe-url if present', () => {
    cy.request('/').then((resp) => {
      const rp = resp.headers['referrer-policy'];
      if (rp) {
        expect(rp).not.to.match(/unsafe-url/i);
      }
    });
  });

  it('x-download-options header noted if present', () => {
    cy.request('/').then((resp) => {
      const xdo = resp.headers['x-download-options'];
      if (xdo) {
        expect(xdo.length).to.be.greaterThan(0);
      }
    });
  });
});


