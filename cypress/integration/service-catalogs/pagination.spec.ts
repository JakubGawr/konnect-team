import { SERVICE_URL } from './shared'

export function PaginationTests() {
  describe('Pagination', () => {
    beforeEach(() => {
      cy.intercept(SERVICE_URL, { fixture: './serviceCatalogs.json' })
      cy.visit('/')
    })

    it('should have left arrow disabled on init', () => {
      cy.get('[data-cy="arrow-left"]').should('have.class', 'is-disabled')
    })

    it('should have right arrow enabled on init', () => {
      cy.get('[data-cy="arrow-right"]').should('not.have.class', 'is-disabled')
    })

    it('should have disable both arrows if there is no data', () => {
      cy.intercept(SERVICE_URL, { body: [] })
      cy.visit('/')
      cy.get('[data-cy="arrow-left"]').should('have.class', 'is-disabled')
      cy.get('[data-cy="arrow-right"]').should('have.class', 'is-disabled')
    })

    it('should click on right arrow and then after switch, disable it', () => {
      cy.get('[data-cy="arrow-right"]').click()
      cy.get('[data-cy="arrow-right"]').should('have.class', 'is-disabled')
    })

    it('should click on right arrow and then left arrow should be enabled', () => {
      cy.get('[data-cy="arrow-right"]').click()
      cy.get('[data-cy="arrow-left"]').should('not.have.class', 'is-disabled')
    })

    it('should display correct page range on click', () => {
      cy.get('[data-cy="arrow-right"]').click()
      cy.get('[data-cy="pagination-content"]').should('contain.text', '14 - 25 of 25')
    })
  })
}
