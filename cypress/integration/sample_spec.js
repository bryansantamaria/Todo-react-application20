describe('Create Account page test', function () {
	it('Should find click on Create Account and go to new URL', function () {
		//Arrange - Setup initial app state
		cy.visit('http://localhost:3000');
		//Act - Take an action
		cy.contains('Create Account').click();
		//Assert - Make an assertion
		cy.url('include', '/create');
	});

	it('Should create a fake user and check for input values', function () {
		cy.get('#firstName').type('Fake').should('have.value', 'Fake');
		cy.get('#lastName').type('Fakesson').should('have.value', 'Fakesson');
		cy.get('#email').type('fake@email.com').should('have.value', 'fake@email.com');
		cy.get('#password').type('lol').should('have.value', 'lol');

		cy.contains('Sign in').click();
		cy.url('include', '/');
	});

	it('Should sign in a fake user', function () {
		cy.get('#loginEmail').type('fake@email.com').should('have.value', 'fake@email.com');
		cy.get('#loginPassword').type('lol').should('have.value', 'lol');
		cy.contains('Submit').click();
		cy.url('include', '/todos');
	});

	it.only('Should find and accept cookie', function () {
		setTimeout(function () {
			cy.get('.acceptCookies').click();
		}, 1500);

		//cy.get('#cookieContainer').should('have.attr', 'display', '');
	});
});
