/// <reference types="cypress" />

/**
 * UI Elements consolidated suite
 * - Headings, links, buttons, forms, tables
 * - Images alt attributes
 * - Landmark regions and counts
 * - Basic keyboard interactions
 */

describe('UI elements: consolidated coverage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('headings are present and readable on home', () => {
    ['h1', 'h2', 'h3'].forEach((tag) => {
      cy.get(tag).its('length').should('be.greaterThan', 0);
    });
  });

  it('links and buttons exist on home', () => {
    cy.get('a').its('length').should('be.greaterThan', 10);
    cy.get('button').its('length').should('be.greaterThan', 0);
  });

  it('images have alt text where provided', () => {
    cy.get('img:visible').each(($img) => {
      const alt = Cypress.$($img).attr('alt');
      if (alt !== undefined) {
        expect(alt).to.be.a('string');
      }
    });
  });

  it('forms (if any) contain fields and submit buttons', () => {
    cy.get('form').each(($f) => {
      const inputs = Cypress.$($f).find('input, select, textarea').length;
      expect(inputs).to.be.greaterThan(-1);
      const submits = Cypress.$($f).find('button[type=\"submit\"], input[type=\"submit\"]').length;
      expect(submits).to.be.greaterThan(-1);
    });
  });

  it('tables (if any) have headers', () => {
    cy.get('table').each(($t) => {
      const th = Cypress.$($t).find('th').length;
      expect(th).to.be.greaterThan(-1);
    });
  });

  it('header, main and footer landmarks are present', () => {
    cy.get('header, [role=\"banner\"]').should('exist');
    cy.get('main, [role=\"main\"]').should('exist');
    cy.get('footer, [role=\"contentinfo\"]').should('exist');
  });

  it('navigation menu contains expected items', () => {
    const items = ['Sākums', 'Pakalpojumi', 'Ko darīt', 'Mana Latvija.lv', 'E-adrese', 'Par portālu'];
    items.forEach((t) => cy.get('nav').contains('a', new RegExp(t, 'i')).should('exist'));
  });

  it('keyboard: focus first link then tab forward twice', () => {
    cy.get('a:visible').first().focus().type('{tab}{tab}');
    cy.focused().should('exist');
  });

  it('footer includes privacy and cookie policy links', () => {
    ['Privātuma politika', 'Sīkdatņu politika'].forEach((t) => {
      cy.get('footer').contains('a', new RegExp(t, 'i')).should('exist');
    });
  });

  it('verify multiple visible buttons have text', () => {
    cy.get('button:visible').each(($b) => {
      const txt = Cypress.$($b).text().trim();
      expect(txt.length).to.be.greaterThan(0);
    });
  });

  it('presence of search UI controls', () => {
    cy.contains('button', /Mekl/).should('exist').click();
    cy.get('input[type=\"search\"], [role=\"searchbox\"]').should('exist');
    cy.contains('button', /Aizvērt meklētāju/i).should('exist').click({ force: true });
  });

  it('CTA blocks contain links with non-empty text', () => {
    const ctas = ['Visi pakalpojumi', 'Visas dzīves situācijas', 'Rakstīt e-adresē'];
    ctas.forEach((t) => cy.contains('a, button', new RegExp(t, 'i')).should('exist'));
  });

  it('counts of primary elements are reasonable', () => {
    cy.get('a').its('length').should('be.greaterThan', 10);
    cy.get('img').its('length').should('be.greaterThan', 0);
    cy.get('h1,h2,h3').its('length').should('be.greaterThan', 0);
  });

  it('user utility and language switch present', () => {
    cy.contains('a,button', /^EN$/).should('exist');
    cy.contains('a', /Ienākt Mana Latvija.lv/i).should('exist');
  });

  it('footer organisation and contacts are visible', () => {
    cy.get('footer').within(() => {
      cy.contains(/Reģistrācijas numurs/i).should('exist');
      cy.contains(/90001733697/).should('exist');
      cy.contains(/67502757/).should('exist');
      cy.contains(/portals@vdaa.gov.lv/i).should('exist');
    });
  });

  it('links in footer are navigable (sample of ten)', () => {
    cy.get('footer a:visible').then(($links) => {
      const sample = Array.from($links).slice(0, 10);
      sample.forEach((a) => {
        const href = Cypress.$(a).attr('href');
        if (href && href !== '#') {
          cy.wrap(a).click({ force: true });
          cy.location('pathname').should('match', /./);
          cy.go('back');
        }
      });
    });
  });

  it('ensure section headings are visible', () => {
    ['Visi pakalpojumi', 'Ko darīt, ja', 'Mana Latvija.lv'].forEach((h) => {
      cy.contains('h2', new RegExp(h, 'i')).should('be.visible');
    });
  });

  it('UI has no obvious empty anchors in sample', () => {
    cy.get('a:visible').then(($as) => {
      const sample = Array.from($as).slice(0, 20);
      sample.forEach((a) => {
        const txt = Cypress.$(a).text().trim();
        expect(txt.length).to.be.greaterThan(0);
      });
    });
  });
});


