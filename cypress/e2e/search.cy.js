/// <reference types="cypress" />
import { HomePage } from '../pages/home';

describe('Search', () => {
  const home = new HomePage();

  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('shows hint when typing less than 3 characters', () => {
    home.search('aa');
    cy.contains(/Lai uzsāktu meklēšanu/i).should('be.visible');
  });

  it('returns results for a common query', () => {
    home.search('pensija');
    cy.contains('a, h3, h2', /pensij/i).should('be.visible');
  });
});


