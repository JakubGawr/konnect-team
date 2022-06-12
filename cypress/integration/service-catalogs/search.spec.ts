import { SERVICE_URL } from './shared'

export function SearchTests() {
  describe('Search', () => {
    before(() => {
      cy.intercept(SERVICE_URL, { fixture: './serviceCatalogs.json' })
      cy.visit('/')
    })

    beforeEach(() => {
      cy.get('[data-cy="search-input"]').as('input')
    })

    it('should type and find only one catalog', () => {
      cy.get('@input').type('Description_7')
      cy.get('[data-cy="catalog-item"]').should('have.length', 1)
    })

    it('should type not existing catalog and display empty state', () => {
      cy.get('@input').type('NOT_EXSIST.')
      cy.get('[data-cy="empty-state"]').should('exist')
    })

    it('should display all content again after typing and removing not existing value', () => {
      cy.get('@input').type('NOT_EXSIST.').clear()
      cy.get('[data-cy="catalog-item"]').should('have.length', 13)
    })

    it('should update pagination results while typing', () => {
      cy.get('@input').type('NOT_EXSIST')
      cy.get('[data-cy="pagination-content"]').should('contain.text', '1 - 0 of 0')
      cy.get('@input').clear()
      cy.get('[data-cy="pagination-content"]').should('contain.text', '1 - 13 of 25')
    })
  })
}
