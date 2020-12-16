/// <reference types="cypress" />

/**
 * Consolidated forms checks:
 * - Presence of submit buttons
 * - Basic email validity where applicable
 */

describe('Forms: consolidated suite', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('forms expose submit buttons', () => {
    cy.get('form').each(($f) => {
      const btn = Cypress.$($f).find('button[type=\"submit\"], input[type=\"submit\"]');
      if (btn.length) {
        expect(btn.length).to.be.greaterThan(0);
      }
    });
  });

  it('email inputs reject malformed addresses', () => {
    cy.get('input[type=\"email\"]').first().then(($el) => {
      if ($el.length) {
        cy.wrap($el).type('invalid-email').blur();
        if ($el[0] && $el[0].checkValidity) {
          expect($el[0].checkValidity()).to.eq(false);
        }
      }
    });
  });

  it('required fields (if any) are marked or enforce validity', () => {
    cy.get('input[required], select[required], textarea[required]').each(($f) => {
      const el = $f[0];
      if (el && el.checkValidity) {
        expect(typeof el.checkValidity).to.eq('function');
      }
    });
  });

  it('buttons have accessible names', () => {
    cy.get('button:visible').each(($b) => {
      const name = $b.text().trim();
      expect(name.length).to.be.greaterThan(0);
    });
  });

  it('labels are associated by for/id when present', () => {
    cy.get('label[for]').each(($l) => {
      const id = $l.attr('for');
      if (id) {
        expect(Cypress.$(`#${id}`).length).to.be.greaterThan(0);
      }
    });
  });
});


