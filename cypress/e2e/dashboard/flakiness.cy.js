describe('Flakiness Prevention & Timing Suite', () => {
  beforeEach(() => {
    cy.loginWithSession(Cypress.env('testEmail'), Cypress.env('testPassword'));
  });

  it('should handle delayed network rendering without timing failures', () => {
    // Simulate slow network response
    cy.intercept('GET', '/api/products', {
      fixture: 'user.json',
      delay: 2000
    }).as('slowProducts');

    cy.visit('/dashboard');

    // Verify loading state appears
    cy.get('[data-cy="loading-spinner"]').should('be.visible');

    // Fix timing issue using explicit cy.wait() and retryable assertions
    cy.wait('@slowProducts');
    cy.get('[data-cy="loading-spinner"]').should('not.exist');
    cy.get('.product-table').should('be.visible');
  });
});
