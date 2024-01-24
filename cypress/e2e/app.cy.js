describe('Navigation', () => {
    it('should navigate to the about page', () => {
      // Start from the index page (base url localhost:3000 configured in cypress.config.ts)
      cy.visit('/')
   
      // Find a link with an href attribute containing "learn" and click it
      cy.get('a[href*="learn"]').click()
    })
  })