/// <reference types="cypress" />
import { HomePage } from '../pages/home';

describe('Search filters', () => {
  const home = new HomePage();

  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('shows results list and allows following a result', () => {
    home.search('pabalsts');
    cy.get('a').contains(/pabalst/i).first().should('be.visible');
  });
});


