// Custom Login Command
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('button[type="submit"]').click();
});

// Custom Add Product Command
Cypress.Commands.add('addProduct', (productName, price) => {
  cy.get('[data-cy="add-product-btn"]').click();
  cy.get('input[name="productName"]').clear().type(productName);
  cy.get('input[name="price"]').clear().type(price);
  cy.get('button[type="save-product"]').click();
});

// Persistent Session Command using cy.session()
Cypress.Commands.add('loginWithSession', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="password"]').clear().type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
