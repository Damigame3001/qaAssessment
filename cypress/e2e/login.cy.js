  // Positive Test Cases ✅
  
  describe('Login Tests', () => {

    const baseUrl = 'https://www.saucedemo.com/';
  
    beforeEach(() => {
      cy.visit(baseUrl);  // Navigate to login page before each test
    });
  
    it('TC_LOGIN_001 - Verify valid login with valid credentials', () => {
      cy.get('input[name="user-name"]').type('standard_user');  // Enter valid username
      cy.get('input[name="password"]').type('secret_sauce');  // Enter valid password
      cy.get('input[type="submit"]').click();  // Click Login button
      cy.url().should('eq', baseUrl + 'inventory.html');  // Verify successful login (redirects to inventory page)
    });
  
    // Negative Test Cases ❌
  
    it('TC_LOGIN_002 - Verify invalid login with Locked-out user login', () => {
      cy.get('input[name="user-name"]').type('locked_out_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[type="submit"]').click();
      cy.get('.error-message-container').should('contain', 'Sorry, this user has been locked out.');
    });
  
    it('TC_LOGIN_003 - Verify invalid login with Invalid username', () => {
      cy.get('input[name="user-name"]').type('invalid_user');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[type="submit"]').click();
      cy.get('.error-message-container').should('contain', 'Username and password do not match any user in this service');
    });
  
    it('TC_LOGIN_004 - Verify invalid login with invalid password', () => {
      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[name="password"]').type('invalid_pass');
      cy.get('input[type="submit"]').click();
      cy.get('.error-message-container').should('contain', 'Username and password do not match any user in this service');
    });
  
    it('TC_LOGIN_006 - Verify invalid login with empty username and password', () => {
      cy.get('input[type="submit"]').click();  // Leaving both fields blank and clicking login
      cy.get('.error-message-container').should('contain', 'Username is required');
    });
  
    it('TC_LOGIN_007 - Verify invalid login with only username entered', () => {
      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[type="submit"]').click();  // Leave password blank
      cy.get('.error-message-container').should('contain', 'Password is required');
    });
  
    it('TC_LOGIN_008 - Verify invalid login with only password entered', () => {
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[type="submit"]').click();  // Leave username blank
      cy.get('.error-message-container').should('contain', 'Username is required');
    });
  
    // Edge & Boundary Cases ⚠️
  
    it('TC_LOGIN_009 - Verify invalid login with very long username', () => {
      const longUsername = 'a'.repeat(256);
      cy.get('input[name="user-name"]').type(longUsername);
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[type="submit"]').click();
      cy.get('.error-message-container').should('contain', 'Username and password do not match any user in this service');
    });
  
    it('TC_LOGIN_010 - Verify invalid login with very long password', () => {
      const longPassword = 'a'.repeat(256);
      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[name="password"]').type(longPassword);
      cy.get('input[type="submit"]').click();
      cy.get('.error-message-container').should('contain', 'Username and password do not match any user in this service');
    });
  
    it('TC_LOGIN_011 - Verify invalid login with special characters in username', () => {
      cy.get('input[name="user-name"]').type('!@#$%^&*()');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[type="submit"]').click();
      cy.get('.error-message-container').should('contain', 'Username and password do not match any user in this service');
    });
  
    it('TC_LOGIN_012 - Verify invalid login with SQL Injection attempt', () => {
      cy.get('input[name="user-name"]').type("admin' OR '1'='1");
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[type="submit"]').click();
      cy.get('.error-message-container').should('contain', 'Username and password do not match any user in this service');
    });
  
    it('TC_LOGIN_013 - Verify case sensitivity check for username', () => {
      cy.get('input[name="user-name"]').type('StaNdard_UseR');
      cy.get('input[name="password"]').type('secret_sauce');
      cy.get('input[type="submit"]').click();
      cy.get('.error-message-container').should('contain', 'Username and password do not match any user in this service');
    });
  
    it('TC_LOGIN_014 - Verify case sensitivity check for password', () => {
      cy.get('input[name="user-name"]').type('standard_user');
      cy.get('input[name="password"]').type('sEcRet_sAuce');
      cy.get('input[type="submit"]').click();
      cy.get('.error-message-container').should('contain', 'Username and password do not match any user in this service');
    });
  });
  