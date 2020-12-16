/// <reference types="cypress" />
import { HomePage } from '../pages/home';

/**
 * Consolidated home smoke:
 * - Hero/blocks visible
 * - Top navigation items exist
 * - CTA links present and navigable
 * - Promoted campaigns block
 * - Basic a11y on main
 */

const NAV_LINKS = [
  'Sākums',
  'Pakalpojumi',
  'Ko darīt',
  'Mana Latvija.lv',
  'E-adrese',
  'Par portālu'
];

describe('Home: consolidated smoke', () => {
  const home = new HomePage();

  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('essential sections are visible', () => {
    cy.contains('h1, h2', /Valsts pārvaldes pakalpojumu portāls/i).should('be.visible');
    cy.contains('h2', /Visi pakalpojumi/i).should('be.visible');
    cy.contains('h2', /Ko darīt, ja/i).should('be.visible');
    cy.contains('h2', /Mana Latvija.lv/i).should('be.visible');
  });

  it('top navigation links are present', () => {
    NAV_LINKS.forEach((name) => {
      cy.get('nav').contains('a', new RegExp(name, 'i')).should('be.visible');
    });
  });

  it('CTA links are visible and navigable', () => {
    const ctas = [
      'Visi pakalpojumi',
      'Visas dzīves situācijas',
      'Rakstīt e-adresē',
      'Apskatīt lapas karti',
      'Kontakti'
    ];
    ctas.forEach((text) => {
      cy.contains('a, button', new RegExp(text, 'i')).should('be.visible').click({ force: true });
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });

  it('promoted campaigns block “Pievērs uzmanību!” visible', () => {
    cy.contains(/Pievērs uzmanību!/i).should('be.visible');
  });

  it('basic accessibility check on main content', () => {
    cy.checkA11yBlock('main');
  });

  it('Top services section shows multiple links', () => {
    cy.contains('h2', /Visi pakalpojumi/i).parentsUntil('main').parent().within(() => {
      cy.get('a').its('length').should('be.greaterThan', 5);
    });
  });

  it('Follow “Visi pakalpojumi” and return', () => {
    cy.contains('a', /Visi pakalpojumi/i).click({ force: true });
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('Follow “Visas dzīves situācijas” and return', () => {
    cy.contains('a', /Visas dzīves situācijas/i).click({ force: true });
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('header contains expected utility links', () => {
    ['EN', 'Ienākt Mana Latvija.lv'].forEach((t) => {
      cy.contains('a,button', new RegExp(`^${t}$`, 'i')).should('exist');
    });
  });

  it('footer displays contact email and phone', () => {
    cy.get('footer').within(() => {
      cy.contains(/portals@vdaa.gov.lv/i).should('exist');
      cy.contains(/6750/).should('exist');
    });
  });
});


