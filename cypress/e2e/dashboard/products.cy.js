describe('Product Dashboard & API Intercept Suite', () => {
  beforeEach(() => {
    cy.loginWithSession(Cypress.env('testEmail'), Cypress.env('testPassword'));
  });

  it('should spy on and stub product list using cy.intercept()', () => {
    // Intercept GET /api/products and mock response with fixture data
    cy.intercept('GET', '/api/products', {
      body: [
        { id: 1, name: "Stubbed Gaming Laptop", price: "$1299.00", stock: "In Stock" }
      ]
    }).as('getProducts');

    cy.visit('/dashboard');
    cy.wait('@getProducts').its('response.statusCode').should('eq', 200);

    // Assert UI renders the stubbed product correctly
    cy.get('.product-table').should('contain', 'Stubbed Gaming Laptop');
  });

  it('should add a new product using custom command', () => {
    cy.visit('/dashboard');
    cy.addProduct('UltraWide Monitor', '$399.99');
    cy.get('.product-list').should('contain', 'UltraWide Monitor');
  });
});
