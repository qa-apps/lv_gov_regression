/**
 * Home page object for latvija.gov.lv
 */
export class HomePage {
  /**
   * @param {Cypress.Chainable<JQuery<HTMLElement>>} scope optional scope
   */
  constructor(scope) {
    this.scope = scope || cy;
  }
  /** Navigate to root. */
  open() {
    this.scope.visit('/');
  }
  /** Click nav link by name. */
  clickNav(name) {
    cy.get('nav').find('a').contains(new RegExp(name, 'i')).first().click();
  }
  /** Open dropdown by button name. */
  openDropdown(name) {
    cy.contains('button', new RegExp(name, 'i')).first().click({ force: true });
  }
  /** Click dropdown link by name. */
  clickDropdown(name) {
    cy.get('[role=\"menu\"], .dropdown-menu, [data-menu]').find('a, [role=\"menuitem\"]').contains(new RegExp(name, 'i')).first().click();
  }
  /** Perform search. */
  search(text) {
    cy.openSearch();
    cy.typeSearch(text);
    cy.realPress('Enter');
  }
}


