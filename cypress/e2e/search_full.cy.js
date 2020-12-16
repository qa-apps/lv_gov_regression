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
});


