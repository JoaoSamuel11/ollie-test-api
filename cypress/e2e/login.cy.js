""/// <reference types="cypress" />

describe('API Automation Tests', () => {
  let authToken = '';

  const user = {
    email: Cypress.env('username'), 
    password: Cypress.env('password')
  }

  it('Should login and retrieve auth token', () => {
    cy.login(user)
      .then(response=>{
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('accessToken');
        expect(response.body).to.have.property('refreshToken');
        expect(response.body).to.have.property('user');
        authToken = response.body.token;
      })
  });

  const userBlankEmail = {
    email: "", 
    password: Cypress.env('password')
  }

  it('login with blank email', () => {
    cy.login(userBlankEmail)
      .then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message','email should not be empty');
      });
  });

  const userBlankPassword = {
    email: Cypress.env('username'), 
    password: ""
  }

  it('login with blank password', () => {
    cy.login(userBlankPassword)
      .then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message','password should not be empty');
    });
  });

  const userInvalidEmail = {
    email: "a", 
    password: Cypress.env('password')
  }

  it('login with invalid email', () => {
    cy.login(userInvalidEmail)
    .then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message','email must be an email');
    });
  });

});

