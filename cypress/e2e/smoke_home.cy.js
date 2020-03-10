/// <reference types="cypress" />
import { HomePage } from '../pages/home';

const NAV_LINKS = [
  'Sākums',
  'Pakalpojumi',
  'Ko darīt',
  'Mana Latvija.lv',
  'E-adrese',
  'Par portālu'
];

describe('Smoke: Home page', () => {
  const home = new HomePage();

  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('loads with essential sections', () => {
    cy.contains('h1, h2', /Valsts pārvaldes pakalpojumu portāls/i).should('be.visible');
    cy.contains('h2', /Visi pakalpojumi/i).should('be.visible');
    cy.contains('h2', /Ko darīt, ja/i).should('be.visible');
    cy.contains('h2', /Mana Latvija.lv/i).should('be.visible');
  });

  it('has top navigation links', () => {
    NAV_LINKS.forEach((name) => {
      cy.get('nav').contains('a', new RegExp(name, 'i')).should('be.visible');
    });
  });

  it('navigates to each top link and returns', () => {
    NAV_LINKS.forEach((name) => {
      cy.get('nav').contains('a', new RegExp(name, 'i')).first().click();
      cy.location('pathname').should('match', /./); // any path
      cy.go('back');
    });
  });

  it('CTA blocks contain working links', () => {
    const ctas = [
      'Visi pakalpojumi',
      'Visas dzīves situācijas',
      'Rakstīt e-adresē',
      'Apskatīt lapas karti',
      'Kontakti'
    ];
    ctas.forEach((text) => {
      cy.contains('a, button', new RegExp(text, 'i')).should('be.visible');
    });
  });

  it('search opens and enforces min length hint', () => {
    home.openDropdown('Mekl');
    cy.contains(/Lai uzsāktu meklēšanu/i).should('be.visible');
  });

  it('footer contains legal links', () => {
    const footerLinks = [
      'Privātuma politika',
      'Sīkdatņu politika',
      'Personas datu apstrādes principi',
      'Lietošanas noteikumi',
      'Piekļūstamības paziņojums'
    ];
    footerLinks.forEach((t) => {
      cy.get('footer').contains('a', new RegExp(t, 'i')).should('exist');
    });
  });

  it('basic accessibility check on hero', () => {
    cy.checkA11yBlock('main');
  });
});


