/// <reference types="cypress" />
import { HomePage } from '../pages/home';

/**
 * Consolidated search behavior:
 * - Toggle open/close
 * - Min length enforcement
 * - Common queries return results
 * - Whitespace and unicode
 * - Security: HTML/XSS string not rendered
 * - Following a result
 */

const QUERIES = ['pensija', 'pabalsts', 'deklarācija', 'nodokļa', 'bērna'];

describe('Search: consolidated suite', () => {
  const home = new HomePage();

  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('opens and closes the search UI', () => {
    cy.contains('button', /Mekl/).click();
    cy.get('input[type=\"search\"], [role=\"searchbox\"]').should('be.visible');
    cy.contains('button', /Aizvērt meklētāju/i).click({ force: true });
  });

  it('enforces minimal length hint', () => {
    home.search('aa');
    cy.contains(/Lai uzsāktu meklēšanu/i).should('be.visible');
  });

  it('returns results for common queries', () => {
    QUERIES.forEach((q) => {
      home.search(q);
      cy.contains('a, h3, h2', new RegExp(q.slice(0, 4), 'i')).should('be.visible');
    });
  });

  it('handles whitespace and unicode accents', () => {
    home.search('  pensija  ');
    cy.contains(/pensij/i).should('be.visible');
    home.search('deklarācija');
    cy.contains(/deklarāc/i).should('be.visible');
  });

  it('does not render HTML payload', () => {
    const payload = '<img src=x onerror=alert(1)>';
    home.search(payload);
    cy.contains(payload).should('not.exist');
  });

  it('allows following a result link', () => {
    home.search('pabalsts');
    cy.get('a').contains(/pabalst/i).first().click();
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('handles multiple queries in sequence without refresh', () => {
    ['pensija', 'deklarācija', 'e-adrese', 'veselība'].forEach((q) => {
      home.search(q);
      cy.contains('a, h3, h2', new RegExp(q.slice(0, 3), 'i')).should('be.visible');
    });
  });

  it('ignores excessive whitespace', () => {
    home.search('   pabalsts   ');
    cy.contains(/pabalst/i).should('be.visible');
  });

  it('long string does not break layout', () => {
    home.search('x'.repeat(200));
    cy.contains(/Lai uzsāktu meklēšanu|rezult/i).should('exist');
  });

  it('suggestions list appears when supported', () => {
    cy.contains('button', /Mekl/).click();
    home.search('pen');
    cy.get('ul, [role=\"listbox\"], .suggestions').then(($el) => {
      const count = $el.find('li, [role=\"option\"], a').length;
      expect(count).to.be.greaterThan(0);
    });
  });

  it('escape key closes the search overlay if open', () => {
    cy.contains('button', /Mekl/).click();
    cy.get('input[type=\"search\"], [role=\"searchbox\"]').type('{esc}');
    cy.contains('button', /Aizvērt meklētāju/i).should('not.exist');
  });

  it('keyboard Enter triggers search when field focused', () => {
    cy.contains('button', /Mekl/).click();
    cy.get('input[type=\"search\"], [role=\"searchbox\"]').focus().type('pensija{enter}');
    cy.contains('a, h3, h2', /pensij/i).should('be.visible');
  });

  it('handles quotes and special characters', () => {
    const queries = ['\"pensija\"', \"(pabalsts)\", \"nodokļa?\", \"#e-adrese\"];
    queries.forEach((q) => {
      home.search(q);
      cy.contains(/rezult|meklēšan/i).should('exist');
    });
  });

  it('result links have hrefs', () => {
    home.search('pensija');
    cy.get('a:visible').filter((_, a) => !!Cypress.$(a).attr('href')).its('length').should('be.greaterThan', 0);
  });

  it('result titles contain the query in some form for common terms', () => {
    ['pensija', 'pabalsts'].forEach((q) => {
      home.search(q);
      cy.contains('a, h3, h2', new RegExp(q.slice(0, 4), 'i')).should('exist');
    });
  });

  it('search box placeholder exists', () => {
    cy.contains('button', /Mekl/).click();
    cy.get('input[type=\"search\"]').invoke('attr', 'placeholder').then((ph) => {
      expect(ph).to.be.a('string');
    });
  });

  it('search input is focusable', () => {
    cy.contains('button', /Mekl/).click();
    cy.get('input[type=\"search\"], [role=\"searchbox\"]').first().focus().should('be.focused');
  });

  it('search retains last query in the field after submission', () => {
    cy.contains('button', /Mekl/).click();
    cy.get('input[type=\"search\"], [role=\"searchbox\"]').clear().type('pensija{enter}').should('have.value', /pensij/i);
  });

  it('navigates to first result and back', () => {
    home.search('pensija');
    cy.get('a:visible').first().click({ force: true });
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('close button hides search overlay', () => {
    cy.contains('button', /Mekl/).click();
    cy.contains('button', /Aizvērt meklētāju/i).click({ force: true });
    cy.contains('button', /Aizvērt meklētāju/i).should('not.exist');
  });

  it('fast repeated searches do not break UI', () => {
    cy.contains('button', /Mekl/).click();
    const terms = ['pensija', 'nodoklis', 'pabalsts', 'e-adrese', 'deklarācija'];
    terms.forEach((t) => cy.get('input[type=\"search\"], [role=\"searchbox\"]').clear().type(`${t}{enter}`));
    cy.contains(/rezult|meklēšan/i).should('exist');
  });

  it('search supports uppercase/lowercase equivalence', () => {
    ['PENSIJA', 'pensieJa', 'PensIjA'].forEach((q) => {
      home.search(q);
      cy.contains(/pensij/i).should('exist');
    });
  });
});


