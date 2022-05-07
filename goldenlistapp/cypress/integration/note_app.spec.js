
describe('Note app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'adridev',
      aka: 'coboloco052',
      password: 'passw0rd'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Golden List')
  })

  it('login form can be open', () => {
    cy.contains('Log in').click()
    cy.get('[placeholder="username"]').type('adridev')
    cy.get('[placeholder="password"]').type('passw0rd')
    cy.get('form > button').contains('Log in').click()
    cy.contains('Add new note')
  })

  it('login fail with the wrong password', () => {
    cy.contains('Log in').click()
    cy.get('[placeholder="username"]').type('adridev')
    cy.get('[placeholder="password"]').type('password')
    cy.get('form > button').contains('Log in').click()

    cy.get('.error').should('contain', 'Request failed with status code 401')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({
        username: 'adridev',
        password: 'passw0rd'
      })
    })

    it('a new note can be created', () => {
      const noteContent = 'hello how are you'
      cy.contains('Add new note').click()
      cy.get('input').type(noteContent)
      cy.contains('Create note').click()
      cy.contains(noteContent)
    })

    describe('and a note exist', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'this is a new note for you'
        })
      })

      it('toggle learned checkbox correctly', () => {
        cy.contains('this is a new note for you').get('[type="checkbox"]').as('noteCheckbox')

        cy.get('@noteCheckbox')
          .check()
      })
    })
  })
})