/// <reference types="cypress" />

describe('Test Scenario for text fields', () => {
  it('should be able to open the text fields page', () => {
    cy.viewport(1024, 768)

    //cy.ntlm(["dashboard.staging.brankas.com"], "brankas", "brankas", "brankas");
    //cy.ntlmReset();
    //cy.ntlm(["auth.staging.brankas.com"], "brankas", "brankas");
    cy.visit('https://demoqa.com/text-box')

    var name = ['Ronaldo Valdez', 'Terry Mendez', 'Marry Sanchez', 'Reian Santos']
    var i = Math.floor(Math.random() * 3) + 1
    var _name = name[i]
    cy.get('#userName').type(_name)

    //random email
    cy.get('#userEmail')
      .click()
      .focus()
      .clear()
      .type(Email_result() + '@sample.com')
    function Email_result() {
      var text = 'rodel.sample+'
      var possible = '0123456789'
      for (var i = 0; i < 3; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

      return text
    }
    cy.get('#currentAddress').click().focus().clear().type('sample Address Manila 1002')
    cy.get('#permanentAddress').click().focus().clear().type('sample Permanent Address 1001')

    cy.get('#submit').click()
  })
})

describe('Test Scenario for check box fields', () => {
  it('should be able to open the checkbox page', () => {
    cy.viewport(1024, 768)

    //cy.ntlm(["dashboard.staging.brankas.com"], "brankas", "brankas", "brankas");
    //cy.ntlmReset();
    //cy.ntlm(["auth.staging.brankas.com"], "brankas", "brankas");
    cy.visit('https://demoqa.com/checkbox')

    cy.get('.rct-checkbox').click()
    cy.get('.rct-collapse').click()
    cy.get('.rct-node-expanded > :nth-child(1) > .rct-collapse').click()
    cy.get('.rct-collapse').click()
    cy.get('.rct-node-expanded > ol > :nth-child(1) > .rct-text > .rct-collapse').click()
    cy.get(
      '#tree-node > :nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(2) > .rct-text > .rct-collapse'
    ).click()
    cy.get(':nth-child(3) > .rct-text > .rct-collapse').click()
    cy.get(
      '#tree-node > :nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > label > .rct-checkbox'
    ).click()
    //cy.get('input[type="checkbox"]').check()
  })
})

describe('Test Scenario for radio button fields', () => {
  it('should be able to open the radio button page', () => {
    cy.viewport(1024, 768)

    cy.visit('https://demoqa.com/radio-button')

    //cy.get('[type="radio"]').check('yesRadio') - all radio button selected
    //cy.get('#yesRadio :checked').should('be.checked').and('have.value', 'like')
    //cy.get('input#yesRadio.custom-control-input').should('be.visible')

    cy.wait(3000)
    cy.get('input#yesRadio.custom-control-input').check({ force: true }) //option1
    cy.wait(3000)
    cy.get('input#impressiveRadio.custom-control-input').check({ force: true }) //option2
    cy.wait(3000)
    cy.get('input#noRadio.custom-control-input.disabled').check({ force: true }) //option3 with invisible radio button
  })
})

describe('Test Scenario for upload and download fields', () => {
  it('should be able to open the upload and download page', () => {
    cy.viewport(1024, 768)

    //cy.ntlm(["dashboard.staging.brankas.com"], "brankas", "brankas", "brankas");
    //cy.ntlmReset();
    //cy.ntlm(["auth.staging.brankas.com"], "brankas", "brankas");
    cy.visit('https://demoqa.com/upload-download')

    cy.wait(3000)
    cy.get('[id="uploadFile"]').attachFile('SC2.png')
  })
})
