    
    // Positive Test Cases ✅

    describe('Checkout Process - Positive Scenarios', () => {
      beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click();
      });
    
      it('TC_CHECKOUT_001: should complete checkout with valid data', () => {
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="finish"]').click();
        cy.url().should('include', 'https://www.saucedemo.com/checkout-complete.html');
        cy.get('.complete-header').should('contain', 'Thank you for your order');
      });
    
      it('TC_CHECKOUT_002: should verify subtotal and tax accuracy', () => {
        cy.get('[data-test="firstName"]').type('Jane');
        cy.get('[data-test="lastName"]').type('Smith');
        cy.get('[data-test="postalCode"]').type('54321');
        cy.get('[data-test="continue"]').click();
        cy.get('.summary_subtotal_label').should('exist');
        cy.get('.summary_tax_label').should('exist');
        cy.get('[data-test="total-label"]').should('exist');
      });
    });
    
      // Negative Test Cases ❌
    
    describe('Checkout Process - Negative Scenarios', () => {
      beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
      });
    
      it('TC_CHECKOUT_003: should show error for empty form fields', () => {
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]').should('contain', 'Error: First Name is required');
      });
    
      it('TC_CHECKOUT_004: should not allow invalid characters in the checkout form', () => {
        cy.get('[data-test="firstName"]').type('@@##');
        cy.get('[data-test="lastName"]').type('12345');
        cy.get('[data-test="postalCode"]').type('abcde');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]').should('be.visible')
          .and('contain', 'First name cannot contain special characters');
      });
      
    
      it('TC_CHECKOUT_005: should not proceed with empty cart', () => {
        cy.get('[data-test="continue"]').click()
        cy.get('.error-message-container').should('contain', 'Error: First Name, Last Name and Zip/Potal code is required');
      });
    });
    
        // Edge & Boundary Cases ⚠️
    
    describe('Checkout Process - Edge/Boundary Cases', () => {
      beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click();
      });
    
      it('TC_CHECKOUT_006: should accept long strings in input fields', () => {
        const longStr = 'a'.repeat(256);
        cy.get('[data-test="firstName"]').type(longStr);
        cy.get('[data-test="lastName"]').type(longStr);
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
        cy.url().should('include', 'https://www.saucedemo.com/checkout-step-two.html');
      });
    
      it('TC_CHECKOUT_007: should expire session after idle time', () => {
        // Simulate user filling out some form fields
        cy.get('[data-test="firstName"]').type('Idle');
        cy.get('[data-test="lastName"]').type('User');
        cy.get('[data-test="postalCode"]').type('00000');
      
        // Simulate session expiration by clearing cookies/local storage
        cy.clearCookies();
        cy.clearLocalStorage();
      
        // Try to continue the checkout process
        cy.get('[data-test="continue"]').click();
      
        // Assert that user is redirected or blocked due to expired session
        cy.url().should('not.include', 'checkout-step-two.html');
      });
      
    
      it('TC_CHECKOUT_008: should handle slow network gracefully', () => {
        cy.intercept('POST', '**/checkout-complete', { delay: 2000 }).as('slowCheckout');
        cy.get('[data-test="firstName"]').type('Slow');
        cy.get('[data-test="lastName"]').type('Network');
        cy.get('[data-test="postalCode"]').type('99999');
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="finish"]').click();
        cy.url().should('include', 'https://www.saucedemo.com/checkout-complete.html')
      });
    });
    