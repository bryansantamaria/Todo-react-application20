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
		cy.visit('http://localhost:3000/create');

		cy.get('#firstName').type('Fake').should('have.value', 'Fake');
		cy.get('#lastName').type('Fakesson').should('have.value', 'Fakesson');
		cy.get('#email').type('fake@email.com').should('have.value', 'fake@email.com');
		cy.get('#password').type('lol').should('have.value', 'lol');

		cy.contains('Sign in').click();
		cy.url('include', '/');
	});

	it('Should sign in a fake user', function () {
		cy.visit('http://localhost:3000');

		cy.get('#loginEmail').type('fake@email.com').should('have.value', 'fake@email.com');
		cy.get('#loginPassword').type('lol').should('have.value', 'lol');
		cy.contains('Submit').click();
		cy.url('include', '/todo');
	});

	it('Should find and accept cookie', function () {
		setTimeout(function () {
			cy.get('.acceptCookies').click();
		}, 1500);

		expect(sessionStorage.getItem('role')).to.eq('user');
		expect(sessionStorage.getItem('name')).to.eq('Fake');
	});

	it('Should add an item to My Task todo list', function () {});
});
