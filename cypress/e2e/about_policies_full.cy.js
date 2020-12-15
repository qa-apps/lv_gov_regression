/// <reference types="cypress" />

/**
 * Consolidated About/Policies/Contacts/News/Sitemap coverage.
 */

const ABOUT_LINKS = [
  'Noderīgi',
  'Kontakti',
  'Aktualitātes',
  'Statistika',
  'Atsauksme',
  'Mobilā lietotne',
  'Privātuma politika',
  'Sīkdatņu politika',
  'Lietošanas noteikumi'
];

const FOOTER_POLICY_LINKS = [
  'Privātuma politika',
  'Sīkdatņu politika',
  'Personas datu apstrādes principi',
  'Lietošanas noteikumi',
  'Piekļūstamības paziņojums'
];

describe('About/Policies consolidated', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('About page contains core links', () => {
    cy.contains('a', /Par portālu/i).click();
    ABOUT_LINKS.forEach((t) => cy.contains('a', new RegExp(t, 'i')).should('exist'));
  });

  it('Contacts reachable and shows contact info', () => {
    cy.contains('a', /Kontakti/i).click();
    cy.location('pathname').should('match', /./);
    cy.contains(/portals@vdaa.gov.lv/i).should('exist');
    cy.contains(/6750/).should('exist');
  });

  it('News/updates (“Aktualitātes”) reachable', () => {
    cy.contains('a', /Par portālu/i).click();
    cy.contains('a', /Aktualitātes/i).click();
    cy.location('pathname').should('match', /./);
  });

  it('Sitemap link present and contains many links', () => {
    cy.contains('a', /lapas karti/i).click();
    cy.get('a').its('length').should('be.greaterThan', 10);
  });

  it('Footer policy links present', () => {
    FOOTER_POLICY_LINKS.forEach((t) => {
      cy.get('footer').contains('a', new RegExp(t, 'i')).should('exist');
    });
  });
});


