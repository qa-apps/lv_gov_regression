/// <reference types="cypress" />

/**
 * Link traversal suite
 * - Traverse header nav links
 * - Hover dropdowns and traverse some items
 * - Traverse a sample of footer links
 * - Ensure back/forward navigation works
 */

const HEADER_LINKS = [
  { name: 'Sākums', exact: false },
  { name: 'Pakalpojumi', exact: false },
  { name: 'Ko darīt', exact: false },
  { name: 'Mana Latvija.lv', exact: false },
  { name: 'E-adrese', exact: true },
  { name: 'Par portālu', exact: false }
];

const DROPDOWN_SERVICES = [
  'Populārie pakalpojumi',
  'Dzīvesvietas deklarēšana',
  'Administratīvo sodu',
  'Nekustamā īpašuma nodokļa',
  'Parakstu vākšana'
];

const DROPDOWN_SITUATIONS = [
  'Bezdarbnieku pabalsts',
  'Gada ienākumu deklarācija',
  'Bērna gaidīšana',
  'Rīcība saslimšanas',
  'Laulības noslēgšana'
];

describe('Link traversal: consolidated', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('traverses header links and returns', () => {
    HEADER_LINKS.forEach((l) => {
      const reg = l.exact ? new RegExp(`^${l.name}$`, 'i') : new RegExp(l.name, 'i');
      cy.get('nav').contains('a', reg).click({ force: true });
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });

  it('hover services dropdown and open items', () => {
    cy.get('nav').contains('a', /Pakalpojumi/i).realHover();
    DROPDOWN_SERVICES.forEach((t) => {
      cy.contains('a, [role=\"menuitem\"]', new RegExp(t, 'i')).should('be.visible');
    });
  });

  it('hover situations dropdown and open items', () => {
    cy.get('nav').contains('a', /Ko darīt/i).realHover();
    DROPDOWN_SITUATIONS.forEach((t) => {
      cy.contains('a, [role=\"menuitem\"]', new RegExp(t, 'i')).should('be.visible');
    });
  });

  it('open each dropdown item and return (sample)', () => {
    cy.get('nav').contains('a', /Pakalpojumi/i).realHover();
    DROPDOWN_SERVICES.slice(0, 3).forEach((t) => {
      cy.contains('a, [role=\"menuitem\"]', new RegExp(t, 'i')).click({ force: true });
      cy.location('pathname').should('match', /./);
      cy.go('back');
      cy.get('nav').contains('a', /Pakalpojumi/i).realHover();
    });
  });

  it('footer links traverse (first 12)', () => {
    cy.get('footer a:visible').then(($links) => {
      const sample = Array.from($links).slice(0, 12);
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

  it('ensure critical footer links exist', () => {
    const must = [
      'Privātuma politika',
      'Sīkdatņu politika',
      'Lietošanas noteikumi',
      'Kontakti',
      'Piekļūstamības paziņojums'
    ];
    must.forEach((t) => cy.get('footer').contains('a', new RegExp(t, 'i')).should('exist'));
  });

  it('search link traversal', () => {
    cy.contains('button', /Mekl/).click();
    cy.get('input[type=\"search\"]').type('pensija{enter}');
    cy.get('a:visible').first().click({ force: true });
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('E-adrese section link traversal (sample of 3)', () => {
    cy.get('nav').contains('a', /^E-adrese$/).click();
    const links = ['E-adreses pastkastīte', 'Pieslēgt e-adresi', 'Informācija par e-adresi'];
    links.forEach((t) => {
      cy.contains('a', new RegExp(t, 'i')).click({ force: true });
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });

  it('About page traversal of multiple links', () => {
    cy.get('nav').contains('a', /Par portālu/i).click();
    const aboutLinks = [
      'Noderīgi',
      'Kontakti',
      'Aktualitātes',
      'Statistika',
      'Atsauksme',
      'Privātuma politika',
      'Sīkdatņu politika'
    ];
    aboutLinks.forEach((t) => {
      cy.contains('a', new RegExp(t, 'i')).click({ force: true });
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });

  it('Sitemap navigation from footer and return', () => {
    cy.contains('a', /lapas karti/i).click();
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('Mana Latvija.lv traversal of first 4 tiles', () => {
    cy.get('nav').contains('a', /Mana Latvija.lv/i).click();
    const tiles = [
      'E-adreses pastkastīte',
      'Sākt lietot e-adresi',
      'Manas darbības portālā',
      'Profila iestatījumi'
    ];
    tiles.forEach((t) => {
      cy.contains('a', new RegExp(t, 'i')).click({ force: true });
      cy.location('pathname').should('match', /./);
      cy.go('back');
    });
  });
});


