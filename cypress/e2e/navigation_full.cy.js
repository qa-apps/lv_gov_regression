/// <reference types="cypress" />
import { HomePage } from '../pages/home';

/**
 * Full navigation coverage:
 * - Header links
 * - Dropdowns under "Pakalpojumi" and "Ko darīt, ja..?"
 * - Language switch
 * - Search open/close and input presence
 * - Regression: traverse each main section and back
 * - Keyboard navigation and focus behavior
 * - Mobile menu / burger on small viewports
 */

const TOP_NAV = [
  'Sākums',
  'Pakalpojumi',
  'Ko darīt',
  'Mana Latvija.lv',
  'E-adrese',
  'Par portālu'
];

const SERVICES_SUBSETS = [
  'Populārie pakalpojumi',
  'Dzīvesvietas deklarēšana',
  'Administratīvo sodu',
  'Parakstu vākšana',
  'Nekustamā īpašuma nodokļa'
];

const WHAT_TO_DO_SETS = [
  'Bezdarbnieku pabalsts',
  'Gada ienākumu deklarācija',
  'Bērna gaidīšana',
  'Rīcība saslimšanas'
];

describe('Navigation: full coverage', () => {
  const home = new HomePage();

  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('top navigation links are visible and clickable', () => {
    TOP_NAV.forEach((name) => {
      cy.get('nav').contains('a', new RegExp(name, 'i')).should('be.visible').click();
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });

  it('search toggle opens and input rendered, then closes', () => {
    cy.contains('button', /Mekl/).click();
    cy.get('input[type=\"search\"], [role=\"searchbox\"]').should('be.visible');
    cy.contains('button', /Aizvērt meklētāju/i).click({ force: true });
  });

  it('language switch shows EN and toggles back to LV', () => {
    cy.contains('a,button', /^EN$/).should('be.visible').click({ force: true });
    cy.contains('a,button', /^LV$/).should('exist').click({ force: true });
  });

  it('dropdown: Pakalpojumi shows common subsets', () => {
    cy.contains('a', /Pakalpojumi/i).realHover();
    SERVICES_SUBSETS.forEach((label) => {
      cy.contains('a, [role=\"menuitem\"]', new RegExp(label, 'i')).should('be.visible');
    });
  });

  it('dropdown: Ko darīt, ja..? shows common subsets', () => {
    cy.contains('a', /Ko darīt/i).realHover();
    WHAT_TO_DO_SETS.forEach((label) => {
      cy.contains('a, [role=\"menuitem\"]', new RegExp(label, 'i')).should('be.visible');
    });
  });

  it('regression: traverse each main nav item and back', () => {
    const NAV = ['Pakalpojumi', 'Ko darīt', 'Mana Latvija.lv', 'E-adrese', 'Par portālu'];
    NAV.forEach((n) => {
      cy.get('nav').contains('a', new RegExp(n, 'i')).click();
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });

  it('keyboard: focus and tab navigation (basic)', () => {
    cy.get('a, button').first().focus().should('be.focused');
    cy.focused().type('{tab}{tab}');
    cy.focused().should('exist');
  });

  it('mobile: burger menu reveals navigation items', () => {
    cy.viewport(375, 667);
    cy.visit('/');
    cy.acceptCookies();
    cy.contains('button, [aria-label=\"menu\"]', /menu|burger|navigation/i).click({ force: true });
    cy.get('nav a').should('have.length.greaterThan', 3);
  });

  it('header search hint requires at least 3 characters', () => {
    home.openDropdown('Mekl');
    cy.contains(/Lai uzsāktu meklēšanu/i).should('be.visible');
  });

  it('E-adrese nav entry opens section', () => {
    cy.contains('a', /^E-adrese$/).click();
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('services dropdown entries remain visible on hover', () => {
    cy.contains('a', /Pakalpojumi/i).realHover();
    SERVICES_SUBSETS.forEach((label) => {
      cy.contains('a, [role=\"menuitem\"]', new RegExp(label, 'i')).should('be.visible');
    });
  });

  it('what-to-do dropdown entries remain visible on hover', () => {
    cy.contains('a', /Ko darīt/i).realHover();
    WHAT_TO_DO_SETS.forEach((label) => {
      cy.contains('a, [role=\"menuitem\"]', new RegExp(label, 'i')).should('be.visible');
    });
  });

  it('header contains a reasonable number of links', () => {
    cy.get('header, [role=\"banner\"]').first().within(() => {
      cy.get('a').its('length').should('be.greaterThan', 3);
    });
  });

  it('footer contains navigation and policy links', () => {
    cy.get('footer').within(() => {
      cy.get('a').its('length').should('be.greaterThan', 5);
      ['Privātuma', 'Sīkdatņu', 'Lietošanas'].forEach((word) => {
        cy.contains('a', new RegExp(word, 'i')).should('exist');
      });
    });
  });

  it('sign-in entry exists in header', () => {
    cy.contains('a', /Ienākt Mana Latvija.lv/i).should('be.visible');
  });

  it('EN language switch visible', () => {
    cy.contains('a,button', /^EN$/).should('be.visible');
  });

  it('header region exposes navigation landmark and logo link', () => {
    cy.get('header,[role=\"banner\"]').within(() => {
      cy.get('nav,[role=\"navigation\"]').should('exist');
      cy.get('a[href=\"/\"]').first().should('exist');
    });
  });

  it('open “Ko darīt, ja..?” page and verify headings', () => {
    cy.get('nav').contains('a', /Ko darīt/i).click();
    cy.get('h1,h2').its('length').should('be.greaterThan', 0);
    cy.go('back');
  });

  it('open “Par portālu” and verify footer is still present', () => {
    cy.get('nav').contains('a', /Par portālu/i).click();
    cy.get('footer').should('exist');
    cy.go('back');
  });

  it('switch to EN and ensure header still contains nav', () => {
    cy.contains('a,button', /^EN$/).click({ force: true });
    cy.get('header').find('nav').should('exist');
    cy.contains('a,button', /^LV$/).click({ force: true });
  });

  it('verify top nav item count above threshold', () => {
    cy.get('nav a:visible').its('length').should('be.greaterThan', 5);
  });
});


