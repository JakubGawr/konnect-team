import { SERVICE_URL } from './shared'

export function ViewStateTests() {
  describe('View states', () => {
    it('should display LOADING view state', () => {
      cy.visit('/')
      Cypress.Promise.all([
        cy.intercept(SERVICE_URL, (req) => {
          return Cypress.Promise.delay(250).then(() => {
            req.continue()
          })
        }),
        cy.get('[data-cy="loading-state"]').should('be.visible'),
      ])
      cy.get('[data-cy="loading-state"]').should('not.exist')
    })

    it('should display ERROR view state', () => {
      cy.intercept(SERVICE_URL, { forceNetworkError: true })
      cy.visit('/')
      cy.get('[data-cy="error-state"]').should('be.visible')
    })

    it('should display EMPTY view state', () => {
      cy.intercept(SERVICE_URL, { body: [] })
      cy.visit('/')
      cy.get('[data-cy="empty-state"]').should('be.visible')
    })

    it('should display SUCCESS view state', () => {
      cy.intercept(SERVICE_URL)
      cy.visit('/')
      cy.get('[data-cy="success-state"]').should('be.visible')
    })
  })
}
