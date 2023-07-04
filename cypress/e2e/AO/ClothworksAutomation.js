/// <reference types="cypress" />
describe('clothworks', () => {
  it('Test Scenario for pop-up authorization', () => {
    cy.viewport(1024, 768)

    //cy.ntlm(["dashboard.staging.brankas.com"], "brankas", "brankas", "brankas");
    //cy.ntlmReset();
    //cy.ntlm(['https://clothworks-beta.sanastores.net/'], 'IIS_Clothworks_beta', 'JPre7$$5s1Vr')
    //cy.visit('https://clothworks-beta.sanastores.net/')
    //cy.visit('https://IIS_Clothworks_beta:JPre7$$5s1Vr@clothworks-beta.sanastores.net')

    cy.visit('https://clothworks-beta.sanastores.net/', {
      auth: {
        username: 'IIS_Clothworks_beta',
        password: 'JPre7$$5s1Vr'
      }
    })
    cy.wait(3000)
  })
})

describe('clothworks sign in', () => {
  it('Should be able to go to sign-in page', () => {
    cy.viewport(1024, 768)

    cy.visit('https://clothworks-beta.sanastores.net/', {
      auth: {
        username: 'IIS_Clothworks_beta',
        password: 'JPre7$$5s1Vr'
      }
    })
    cy.wait(3000)

    cy.get('.top-action > .top-hyp').click()
  })
})

describe('clothworks sign in', () => {
  it('Should be able to login using valid credentials', () => {
    cy.viewport(1024, 768)

    cy.visit(
      'https://clothworks-beta.sanastores.net/profile/login?returnurl=https%3a%2f%2fclothworks-beta.sanastores.net%2f',
      {
        auth: {
          username: 'IIS_Clothworks_beta',
          password: 'JPre7$$5s1Vr'
        }
      }
    )
    cy.wait(3000)

    cy.get('#UserName').focus().clear().type('Rodel.Abapo@projectthunder.com')
    cy.get('#Password').focus().clear().type('clothworks123')
    cy.get('.field > .btn > .btn-cnt').click()
  })
})
