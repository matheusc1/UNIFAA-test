/// <reference types="cypress" />

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

describe('Products test', () => {
  beforeEach(() => {
    cy.visit("/produtos.html")
  })

  it('TC009 - Logout using back button', () => {
    cy.get('.nav-link').click()

    cy.url().should('include', '/login')
  })

  it('TC010 - Opening modal using create button', () => {
    cy.get('#btn-adicionar').click()

    cy.get('.modal-title').should('be.visible').should('have.text', 'Produto')
  })

  it('TC011 - Registering product', () => {
    cy.createProduct(1, 'Produto 1', 40, 30.90, '2024-06-20')
    cy.get('#btn-sair').click()
    cy.get('tbody tr').should('have.length', 1)
  })

  it('TC012 - Registering product with empty fields', () => {
    cy.get('#btn-adicionar').click()

    cy.get('#codigo').type('001')

    cy.get('#btn-salvar').click()
    cy.get('#mensagem').should('contain', 'Todos os campos são obrigatórios para o cadastro!')
  })

  it('TC013 - Validation of numeric input in code field', () => {
    cy.createProduct('teste', 'Produto 10', 12, 40.99, '2024-02-12')
    cy.get('#mensagem').should('contain', 'O campo código deve conter um número positivo.')
  })

  it('TC014 - Validation of numeric input in quantity field', () => {
    cy.createProduct(1, 'Produto 10', 'teste', 40.99, '2024-02-12')
    cy.get('#mensagem').should('contain', 'O campo quantidade deve conter um número positivo.')
  })

  it('TC015 - Validation of numeric input in value field', () => {
    cy.createProduct(1, 'Produto 10', 12, 'trinta e dois e noventa', '2024-02-12')
    cy.get('#mensagem').should('contain', 'O campo valor deve conter um número positivo.')
  })

  it('TC016 - Date field is filled with the current date', () => {
    cy.get('#btn-adicionar').click()

    cy.get('#data').should('have.value', getCurrentDate())
  })

  it('TC017 - Delete product', () => {
    cy.createProduct(1, 'Produto 1', 40, 30.90, '2024-06-20')
    cy.get('#btn-sair').click()

    cy.get(':nth-child(6) > :nth-child(2)').click()
    cy.get('.modal-title').should('be.visible').should('have.text', 'Excluir produto')
  })

  it('TC018 - Edit product', () => {
    cy.createProduct(1, 'Produto 1', 40, 30.90, '2024-06-20')
    cy.get('#btn-sair').click()

    cy.get(':nth-child(6) > :nth-child(1)').click()
    cy.get('.modal-title').should('be.visible').should('have.text', 'Editar produto')
  })

  it('TC019 - Close modal using exit button', () => {
    cy.get('#btn-adicionar').click()

    cy.get('#btn-sair').click()
    cy.get('.modal-title').should('not.be.visible')
  })

  it('TC020 - Close modal using X button', () => {
    cy.get('#btn-adicionar').click()

    cy.get('.modal-header > .close').click()
    cy.get('.modal-title').should('not.be.visible')
  })
})