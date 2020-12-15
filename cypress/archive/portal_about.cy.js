/// <reference types="cypress" />

describe('About portal section', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('About links visible', () => {
    cy.contains('a', /Par portālu/i).click();
    const links = [
      'Noderīgi',
      'Kontakti un saziņa',
      'Aktualitātes',
      'Statistika',
      'Atsauksme',
      'Mobilā lietotne',
      'Privātuma politika',
      'Sīkdatņu politika',
      'Lietošanas noteikumi'
    ];
    links.forEach((t) => cy.contains('a', new RegExp(t, 'i')).should('exist'));
  });
});


