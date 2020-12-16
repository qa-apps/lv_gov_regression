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

  it('home highlights “Pievērs uzmanību!” and useful footer links', () => {
    cy.contains(/Pievērs uzmanību!/i).should('be.visible');
    ['Noderīgi', 'Apskatīt lapas karti', 'Kontakti un saziņa', 'Par portālu'].forEach((t) => {
      cy.contains('a', new RegExp(t, 'i')).should('exist');
    });
  });

  it('footer funding and program messages visible', () => {
    cy.get('footer').within(() => {
      cy.contains(/Nacionālais attīstības plāns/i).should('exist');
      cy.contains(/Eiropas Savienības/i).should('exist');
      cy.contains(/Tava Eiropa/i).should('exist');
    });
  });

  it('search overlay shows top queries hint text', () => {
    cy.contains('button', /Mekl/).click();
    cy.contains(/Top meklētākie pakalpojumi/i).should('be.visible');
  });

  it('search overlay lists popular items text snippets', () => {
    cy.contains('button', /Mekl/).click();
    const items = [
      'Saņemtās Darbnespējas lapas',
      'administratīvā pārkāpuma',
      'Parakstu vākšana',
      'Nekustamā īpašuma nodokļa apmaksa'
    ];
    items.forEach((t) => {
      cy.contains(new RegExp(t, 'i')).should('exist');
    });
  });

  it('Mana Latvija.lv block visible with tiles', () => {
    cy.contains('h2', /Mana Latvija.lv/i).should('be.visible');
    ['E-adreses pastkastīte', 'Sākt lietot e-adresi'].forEach((t) => {
      cy.contains('a', new RegExp(t, 'i')).should('exist');
    });
  });

  it('CTA count is reasonable', () => {
    cy.get('a').its('length').should('be.greaterThan', 10);
  });

  it('header E-adrese link is present', () => {
    cy.get('nav').contains('a', /^E-adrese$/).should('be.visible');
  });
});


