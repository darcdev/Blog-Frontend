Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/auth', {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('loggedUser', JSON.stringify(response.body));
    cy.visit('http://localhost:3000');
  });
});
Cypress.Commands.add('createNote', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: {
      title,
      author,
      url,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  });
  cy.visit('http://localhost:3000');
});
