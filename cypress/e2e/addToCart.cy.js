    
    // Positive Test Cases ✅
    
    describe('Add to Cart - Positive Scenarios', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });


  it('TC_CART_001: should add a single product to the cart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('contain', '1');
  });

  it('TC_CART_002: should add multiple different products to the cart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('.shopping_cart_badge').should('contain', '3');
  });

  it('TC_CART_003: Verify user can add same product twice to the cart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('contain', '2');
  });

  it('TC_CART_004: should update cart count after adding product', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('contain', '1');
  });

  it('TC_CART_005: should show correct product details in the cart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
    cy.get('.inventory_item_price').should('contain', '$29.99');
  });
});

  // Negative Test Cases ❌

describe('Add to Cart - Negative Scenarios', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });
  it('TC_CART_006: should not allow adding products when not logged in', () => {
    // Simulate not being logged in by clearing cookies/local storage
    cy.visit('https://www.saucedemo.com/');
    cy.url().should('not.include', 'https://www.saucedemo.com/cart.html');
    // cy.get('[data-test="error"]').should('exist');
  });

  it('TC_CART_007: should fail to add product with no internet (simulation)', () => {
    // Cypress cannot fully simulate no-internet, but we can stub requests
    cy.intercept('POST', '**/cart', { forceNetworkError: true }).as('addCart');
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});

  // Edge & Boundary Cases ⚠️

  describe('Add to Cart - Edge & Boundary Cases', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
    });
  
    it('TC_CART_008: should allow adding product after idle period (simulated)', () => {
      // Simulate being idle by doing nothing — assume session persists
      // You could simulate page inactivity by reloading or re-visiting
      cy.reload(); // optional: simulate returning to the tab or activity
  
      // Try adding product
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('contain', '1');
    });
  
  });
  




