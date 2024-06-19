/// <reference types="cypress" />

describe('Auth test', () => {
  beforeEach(() => {
    cy.visit("/login.html")
  })

  it('TC001 - Sign in with capitalized email', () => {
    cy.login('Admin@admin.com', 'admin@123')

    cy.url().should('include', '/produtos')
  })

  it('TC002 - Sign in with capitalized password', () => {
    cy.login('Admin@admin.com', 'Admin@123')

    cy.get('#mensagem').should('contain', 'E-mail ou senha inválidos')
  })

  it('TC003 - Sign in with empty fields', () => {
    cy.get('#btn-entrar').click()

    cy.get('#mensagem').should('contain', 'Informe usuário e senha')
  })

  it('TC004 - Sign in with empty email', () => {
    cy.get('#senha').type('test123')

    cy.get('#btn-entrar').click()

    cy.get('#mensagem').should('contain', 'Informe usuário e senha')
  })

  it('TC005 - Sign in with empty password', () => {
    cy.get('#email').type('admin@admin')

    cy.get('#btn-entrar').click()

    cy.get('#mensagem').should('contain', 'Informe usuário e senha')
  })

  it('TC006 - Sign in with wrong password and correct email', () => {
    cy.login('admin@admin.com', 'test123')

    cy.get('#mensagem').should('contain', 'E-mail ou senha inválidos')
  })

  it('TC007 - Sign in with wrong email and correct password', () => {
    cy.login('admin@admin', 'admin@123')

    cy.get('#mensagem').should('contain', 'E-mail ou senha inválidos')
  })

  it('TC008 - Sign in successfully', () => {
    cy.login('admin@admin.com', 'admin@123')

    cy.url().should('include', '/produtos')
  })
})