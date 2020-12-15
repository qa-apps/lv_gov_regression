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

const ABOUT_EXTRA = [
  'Noderīgi',
  'Kontakti un saziņa',
  'Aktualitātes',
  'Statistika',
  'E-pasta apstiprināšana',
  'Atsauksme par Latvija.gov.lv',
  'Latvija.gov.lv mobilā lietotne',
  'Privātuma politika',
  'Sīkdatņu politika',
  'Personas datu apstrādes principi',
  'Lietošanas noteikumi',
  'Pilnvarošanas risinājuma lietošanas noteikumi',
  'Portāla lietošanas noteikumi',
  'Pakalpojuma \"Mani dati\" lietošanas noteikumi'
];

describe('About/Policies consolidated', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('About page lists expanded useful links', () => {
    cy.contains('a', /Par portālu/i).click();
    ABOUT_EXTRA.forEach((t) => {
      cy.contains('a', new RegExp(t, 'i')).should('exist');
    });
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

  it('each About link is navigable', () => {
    cy.contains('a', /Par portālu/i).click();
    ABOUT_LINKS.forEach((t) => {
      cy.contains('a', new RegExp(t, 'i')).should('be.visible').click({ force: true });
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });

  it('all footer policy links navigate', () => {
    FOOTER_POLICY_LINKS.forEach((t) => {
      cy.get('footer').contains('a', new RegExp(t, 'i')).should('be.visible').click({ force: true });
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });

  it('footer contains contacts, about and accessibility entries', () => {
    ['Kontakti', 'Par portālu', 'Piekļūstamības paziņojums'].forEach((t) => {
      cy.get('footer').contains(new RegExp(t, 'i')).should('exist');
    });
  });

  it('footer shows “Seko mums” block if present', () => {
    cy.get('footer').contains(/Seko mums/i).should('exist');
  });

  it('footer contains funding/program messages', () => {
    cy.get('footer').contains(/Nacionālais attīstības plāns/i).should('exist');
  });

  it('contacts and sitemap are reachable from footer', () => {
    cy.get('footer').contains('a', /Kontakti/i).click({ force: true });
    cy.location('pathname').should('match', /./);
    cy.go('back');
    cy.get('footer').contains('a', /lapas karti/i).click({ force: true });
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('cookie settings link exists in footer', () => {
    cy.get('footer').contains(/sīkdatņu iestatīj/u).should('exist');
  });

  it('home exposes sitemap and attention section', () => {
    cy.visit('/');
    cy.acceptCookies();
    cy.contains(/Pievērs uzmanību!/i).should('be.visible');
    cy.contains('a', /lapas karti/i).should('exist');
  });
});


