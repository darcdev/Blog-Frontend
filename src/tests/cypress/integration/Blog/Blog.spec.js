describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    //Insert user database
    const user = {
      username: 'darcdev',
      name: 'diego',
      password: '123456',
    };

    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });
  it('Login form is show', function () {
    cy.get('.login-form').should('not.have.css', 'display:none');
  });
  describe('user can log in', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('darcdev');
      cy.get('#password').type('123456');
      cy.get('#login-button').click();
      cy.get('html').contains('darcdev logged in');
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('darcdev');
      cy.get('#password').type('12345');
      cy.get('#login-button').click();
      cy.get('html').contains('Wrong credentials');
    });
  });
  describe('When user loged in', function () {
    beforeEach(function () {
      cy.login({ username: 'darcdev', password: '123456' });
    });

    it('A blog can be created', function () {
      cy.contains('create note').click();
      cy.get('#title').type('Aventures');
      cy.get('#author').type('John Wick');
      cy.get('#url').type('www.aventures.com');
      cy.get('#create-blog-button').click();
      cy.get('html').contains('A new Blog Aventures by John Wick added');
    });
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createNote({
          title: 'Hi Guys',
          author: 'Albert Oinstein',
          url: 'www.higuys.com',
        });
        cy.createNote({
          title: 'Hi Fi',
          author: 'Silvestre Estanon',
          url: 'www.Hifi.com',
        });
      });
      it('A blog can have likes by users', function () {
        cy.contains('Hi Guys by Albert Oinstein').as('blogHeader');
        cy.get('@blogHeader').contains('View').click();
        cy.get('@blogHeader').parent().contains('Likes : 0');
        cy.get('@blogHeader').parent().contains('Like').click();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);
        cy.get('@blogHeader').parent().contains('Likes : 1');
      });
      it('A blog can be deleted', function () {
        cy.contains('Hi Guys by Albert Oinstein').as('blogHeader');
        cy.get('@blogHeader').contains('View').click();
        cy.get('@blogHeader').parent().contains('Remove').click();
        cy.should('not.contain', 'Hi Guys by Albert Oinstein');
      });
      it('A blog can be deleted only by user', function () {
        cy.contains('Cerrar Sesión').click();
        const user = {
          username: 'darc',
          name: 'darcito',
          password: '12345',
        };
        cy.request('POST', 'http://localhost:3003/api/users', user);
        cy.login({ username: user.username, password: user.password });

        cy.contains('Hi Guys by Albert Oinstein').contains('View').click();
        cy.should('not.contain', 'Remove');
      });
    });
  });
});
