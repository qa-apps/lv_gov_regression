/// <reference types="cypress" />

/**
 * Consolidated services checks:
 * - Popular services presence
 * - Payments/taxes related entries
 */

const POPULAR_ITEMS = [
  'Dzīvesvietas deklarēšana vai norādīšana',
  'Administratīvo sodu',
  'Parakstu vākšana',
  'Nekustamā īpašuma nodokļa',
  'Slimības pabalsta',
  'Bezdarbnieka pabalsts',
  'Bērna piedzimšanas pabalsts',
  'Maternitātes pabalsts',
  'Paternitātes pabalsts',
  'Informācija par prognozēto pensiju'
];

describe('Services: consolidated', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
    cy.contains('a', /Pakalpojumi/i).click();
  });

  it('popular services block lists common entries', () => {
    POPULAR_ITEMS.forEach((name) => {
      cy.contains('a, button', new RegExp(name, 'i')).should('exist');
    });
  });

  it('payments & fines related entries appear', () => {
    cy.contains('a', /Nekustamā īpašuma nodokļa/i).should('exist');
    cy.contains('a', /Administratīvo sodu/i).should('exist');
  });

  it('pension and benefits related entries exist', () => {
    const items = [
      'Pensijas mantošana',
      'Informācija par prognozēto pensiju',
      'Pensijas pārvaldītāja izvēle',
      'Iesniegums vecuma pensijas pārrēķināšanai',
      'Apbedīšanas pabalsts',
      'Iesniegums slimības pabalsta piešķiršanai',
      'Iesniegums bezdarbnieka pabalsta piešķiršanai'
    ];
    items.forEach((t) => cy.contains('a, button', new RegExp(t, 'i')).should('exist'));
  });

  it('family benefits related entries exist', () => {
    const items = [
      'Bērna piedzimšanas pabalsts',
      'Maternitātes',
      'Paternitātes',
    ];
    items.forEach((t) => cy.contains('a, button', new RegExp(t, 'i')).should('exist'));
  });

  it('more specific services are present', () => {
    const MORE_ITEMS = [
      'Pieteikšanās uzturlīdzekļu saņemšanai',
      'Dzīvesvietas deklarēšana vai norādīšana',
      'Administratīvo sodu pārbaude',
      'Parakstu vākšana par pašvaldības referendumu',
      'Nekustamā īpašuma nodokļa nomaksa',
      'Iesniegums slimības pabalsta piešķiršanai (B lapa)',
      'Pensijas pārvaldītāja izvēle (2.līmenis)',
      'Pakalpojuma \"Mani dati\"',
      'Pilnvarošanas risinājuma lietošanas noteikumi'
    ];
    MORE_ITEMS.forEach((t) => cy.contains('a, button', new RegExp(t, 'i')).should('exist'));
  });

  it('navigate to first ten service links and back (smoke)', () => {
    cy.get('a').filter(':visible').then(($links) => {
      const firstTen = Array.from($links).slice(0, 10);
      firstTen.forEach((a) => {
        const $a = Cypress.$(a);
        const href = $a.attr('href');
        if (href && href !== '#') {
          cy.wrap($a).click({ force: true });
          cy.location('pathname').should('match', /./);
          cy.go('back');
          cy.contains('a', /Pakalpojumi/i).should('be.visible');
        }
      });
    });
  });

  it('smoke: iterate over visible service buttons/links (up to 15)', () => {
    cy.get('a, button').filter(':visible').then(($els) => {
      const slice = Array.from($els).slice(0, 15);
      slice.forEach((el) => {
        const text = Cypress.$(el).text().trim();
        expect(text.length).to.be.greaterThan(0);
      });
    });
  });

  it('“Ko darīt, ja..?” page lists common situations', () => {
    cy.contains('a', /Ko darīt, ja/i).click();
    const SITUATIONS = [
      'Bezdarbnieku pabalsts',
      'Gada ienākumu deklarācija',
      'Bērna gaidīšana',
      'Rīcība saslimšanas',
      'Laulības noslēgšana',
      'Privātmājas būvniecība',
      'Invaliditātes apliecība',
      'Dabas un vides aizsardzība'
    ];
    SITUATIONS.forEach((s) => cy.contains('a', new RegExp(s, 'i')).should('exist'));
  });

  it('services page exposes a substantial amount of links', () => {
    cy.contains('a', /Pakalpojumi/i).click();
    cy.get('a:visible').its('length').should('be.greaterThan', 10);
  });

  it('navigate next batch of service links (up to 8)', () => {
    cy.contains('a', /Pakalpojumi/i).click();
    cy.get('a:visible').then(($links) => {
      const next = Array.from($links).slice(10, 18);
      next.forEach((node) => {
        const $a = Cypress.$(node);
        const href = $a.attr('href');
        if (href && href !== '#') {
          cy.wrap($a).click({ force: true });
          cy.location('pathname').should('match', /./);
          cy.go('back');
        }
      });
    });
  });

  it('services page contains multiple headings and sections', () => {
    cy.contains('a', /Pakalpojumi/i).click();
    cy.get('h1,h2,h3').its('length').should('be.greaterThan', 1);
  });

  it('services page exposes at least 20 links', () => {
    cy.contains('a', /Pakalpojumi/i).click();
    cy.get('a:visible').its('length').should('be.greaterThan', 20);
  });

  it('drill into “Dzīvesvietas deklarēšana” and return', () => {
    cy.contains('a', /Pakalpojumi/i).click();
    cy.contains('a', /Dzīvesvietas deklarēšana/i).first().click({ force: true });
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('drill into “Parakstu vākšana” and return', () => {
    cy.contains('a', /Pakalpojumi/i).click();
    cy.contains('a', /Parakstu vākšana/i).first().click({ force: true });
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });

  it('open “Informācija par prognozēto pensiju” and return', () => {
    cy.contains('a', /Pakalpojumi/i).click();
    cy.contains('a', /prognozēto pensiju/i).first().click({ force: true });
    cy.location('pathname').should('match', /./);
    cy.go('back');
  });
});


