const apiUrl = 'http://localhost:3001'
const homePageUrl = 'http://localhost:3000'

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${apiUrl}/api/login`,
    {
      username,
      password
    }).then(res => {
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(res.body)
      )
    })

  cy.visit(homePageUrl)
})

Cypress.Commands.add('createNote', ({ content }) => {
  cy.request({
    method: 'POST',
    url: `${apiUrl}/api/notes`,
    body: {
      content
    },
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser')).token}`
    }
  }).then(res => console.log(res))

  cy.visit(homePageUrl)
})