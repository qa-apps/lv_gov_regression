/// <reference types="cypress" />

/**
 * Consolidated SEO/Meta coverage:
 * - robots.txt
 * - sitemap endpoint
 * - meta description presence
 * - manifest/icons in HTML
 * - core content blocks visible
 */

describe('SEO/Meta: consolidated suite', () => {
  it('robots.txt reachable or 404', () => {
    cy.request({ url: '/robots.txt', failOnStatusCode: false }).its('status').should('be.oneOf', [200, 404]);
  });

  it('sitemap endpoint responds', () => {
    cy.request({ url: '/sitemap.xml', failOnStatusCode: false }).its('status').should('be.oneOf', [200, 404]);
  });

  it('meta description present in HTML', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/<meta[^>]+name=[\"']description[\"']/i);
    });
  });

  it('HTML references icons or manifest', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/icon|manifest/i);
    });
  });

  it('front page core content blocks visible', () => {
    cy.visit('/');
    cy.acceptCookies();
    ['Visi pakalpojumi', 'Ko darīt, ja', 'Mana Latvija.lv'].forEach((h) => {
      cy.contains('h2', new RegExp(h, 'i')).should('be.visible');
    });
  });
});


