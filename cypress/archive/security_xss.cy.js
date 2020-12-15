/// <reference types="cypress" />
import { HomePage } from '../pages/home';

describe('Security: reflected XSS basic check', () => {
  const home = new HomePage();
  const payload = '<img src=x onerror=alert(1)>';

  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
  });

  it('search does not render HTML from query', () => {
    home.search(payload);
    cy.contains(payload).should('not.exist');
  });
});


