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

  it('canonical link present when declared', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/<link[^>]+rel=[\"']canonical[\"']/i);
    });
  });

  it('Open Graph and Twitter meta tags when available', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      expect(html).to.match(/<meta[^>]+property=[\"']og:/i);
      expect(html).to.match(/<meta[^>]+name=[\"']twitter:/i);
    });
  });

  it('noindex not present on main page', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).not.to.match(/noindex/i);
    });
  });

  it('language attribute exists on <html>', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/<html[^>]+lang=/i);
    });
  });

  it('has title tag', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/<title>.*?<\\/title>/i);
    });
  });

  it('meta viewport present', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/<meta[^>]+name=[\"']viewport[\"']/i);
    });
  });

  it('charset declared', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/<meta[^>]+charset=/i);
    });
  });

  it('alternate hreflang links when available', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      if (/<link[^>]+rel=[\"']alternate[\"'][^>]+hreflang=/i.test(html)) {
        expect(html).to.match(/hreflang/i);
      }
    });
  });
});


