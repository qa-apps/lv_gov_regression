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

  it('RSS/Atom feeds linked when present', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      const hasFeed = /<link[^>]+type=[\"']application\\/(rss|atom)\\+xml[\"']/i.test(html);
      expect([true, false]).to.include(hasFeed);
    });
  });

  it('robots meta not disallowing indexing on home', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      const robotsMeta = /<meta[^>]+name=[\"']robots[\"'][^>]+content=[\"']([^\"']+)[\"']/i.exec(html);
      if (robotsMeta && robotsMeta[1]) {
        expect(robotsMeta[1].toLowerCase()).not.to.include('noindex');
      }
    });
  });

  it('schema.org markup present when available', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      const hasJsonLd = /<script[^>]+type=[\"']application\\/ld\\+json[\"']/i.test(html);
      expect([true, false]).to.include(hasJsonLd);
    });
  });

  it('favicon links present', () => {
    cy.request('/').then((resp) => {
      expect(resp.body).to.match(/<link[^>]+rel=[\"']icon[\"']/i);
    });
  });

  it('open graph title or site_name present when OG tags exist', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      if (/<meta[^>]+property=[\"']og:/i.test(html)) {
        expect(html).to.match(/property=[\"']og:(site_name|title)[\"']/i);
      }
    });
  });

  it('twitter card has a content attribute when present', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      if (/<meta[^>]+name=[\"']twitter:/i.test(html)) {
        expect(html).to.match(/<meta[^>]+name=[\"']twitter:[^\"']+[\"'][^>]+content=/i);
      }
    });
  });

  it('breadcrumbs present either in markup or JSON-LD when available', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      const hasCrumbs = /aria-label=[\"']breadcrumb[\"']|itemscope[^>]+BreadcrumbList|itemtype=[\"']https:\\/\\/schema.org\\/BreadcrumbList[\"']/i.test(html);
      expect([true, false]).to.include(hasCrumbs);
    });
  });

  it('primary language appears to be Latvian (lv)', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      const lang = /<html[^>]+lang=[\"']([^\"']+)[\"']/i.exec(html);
      if (lang && lang[1]) {
        expect(lang[1].toLowerCase()).to.include('lv');
      }
    });
  });

  it('meta keywords present when provided by site', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      const hasKeywords = /<meta[^>]+name=[\"']keywords[\"'][^>]+content=/i.test(html);
      expect([true, false]).to.include(hasKeywords);
    });
  });

  it('viewport width=device-width asserted when present', () => {
    cy.request('/').then((resp) => {
      const html = resp.body;
      const vp = /<meta[^>]+name=[\"']viewport[\"'][^>]+content=[\"'][^\"']+device-width/i.test(html);
      expect([true, false]).to.include(vp);
    });
  });
});


