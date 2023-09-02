/// <reference types="cypress" />
describe('Markets platform', () => {
  it('Should be able to go to markets page and select platform page', () => {
    cy.viewport(1440, 861)

    cy.visit('https://www.markets.com/?override=1 ')
    cy.wait(3000)
    cy.get('.modal-footer > .cta-black').click()
    cy.get('[href="/trade/"]').should('be.visible')
    cy.get('[href="/trade/"]').invoke('show')
    cy.get('[href="/trade/platform"]').click()
  })
})

describe('Trade platform', () => {
  it('Should be able to create user, select the answer and change language', () => {
    cy.viewport(1440, 861)

    cy.visit('https://www.markets.com/trade/platform/')
    cy.get('.modal-footer > .cta-black').click()
    cy.wait(3000)
    //platform:create user - Create unique random email address
    cy.get('#email')
      .click()
      .focus()
      .clear()
      .type(Email_result() + '@test.com')
    function Email_result() {
      var text = 'test_'
      var possible = '0123456789'
      for (var i = 0; i < 11; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

      return text
    }
    cy.get('#password').click().focus().clear().type('Test123!') //this is how i put password
    cy.get('.tick-box').click() //tick the checkbox to submit
    cy.get('#submit').click() //to register the user

    //Country of residence
    cy.wait(3000)
    cy.get('.country-selector > .btn-light > .text').click().focus().clear().type('France') //Selec france as country
    cy.get('.d-flex.common').click()
    cy.get('.question-w > .question-footer > .btn-dark > span').click() //Click continue button

    //next page
    cy.wait(3000)
    cy.get('.label-tk_related_role_feb2022').click() //select answer "Worked in the Financial Industry"

    //change language
    cy.wait(3000)
    cy.get('.d-flex > .d-block > .current-language > .text-left').click() //to select the new language
    cy.get('.d-block > .languages > [data-language="fr"] > .text').click()

    //select answer: Frequency
    cy.wait(3000)
    cy.get('.label-tf_daily_feb2022').click()
  })
})
