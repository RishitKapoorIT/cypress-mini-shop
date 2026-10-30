describe('Authentication & Session Suite', () => {
  it('should log in successfully using Cypress.env() variables', () => {
    const email = Cypress.env('testEmail');
    const password = Cypress.env('testPassword');

    cy.login(email, password);
    cy.url().should('include', '/dashboard');
    cy.get('.welcome-header').should('contain', 'Welcome');
  });

  it('should authenticate using fixture data', function () {
    cy.fixture('user').then((data) => {
      cy.login(data.validUser.email, data.validUser.password);
      cy.url().should('include', '/dashboard');
      cy.get('.user-profile').should('contain', data.validUser.name);
    });
  });

  it('should leverage cy.session() for fast subsequent logins', () => {
    const email = Cypress.env('testEmail');
    const password = Cypress.env('testPassword');

    cy.loginWithSession(email, password);
    cy.visit('/dashboard');
    cy.get('[data-cy="dashboard-stats"]').should('be.visible');
  });
});
