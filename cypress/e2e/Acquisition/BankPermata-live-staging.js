/// <reference types="cypress" />

const stagingHttpAuth = 'brankas:brankas@'

describe('Bank Permata', () => {

    it('should be able to signin to CC', () => {
        cy.viewport(1024, 768)

        //cy.ntlm(["dashboard.staging.brankas.com"], "brankas", "brankas", "brankas");
        //cy.ntlmReset();
        //cy.ntlm(["auth.staging.brankas.com"], "brankas", "brankas");

        cy.visit('https://brankas:brankas@auth.staging.brankas.com')
        cy.visit("https://brankas:brankas@dashboard.staging.brankas.com/")
        //cy.visit('https://'+ stagingHttpAuth +'auth.staging.brankas.com')

        

        //cy.ntlm(["auth.staging.brankas.com"], "brankas", "brankas", "brankas");
        


        cy.get('#hs-eu-confirmation-button').click()
       
        
        //valid email
        cy.get('#email').click().focus().type('mg.10872645+002@gmail.com')
        //enter valid password
        cy.get('#password').type('Test002Foreign@123')
        cy.get('#submit').click()

        // cy.wait(1000)
        // cy.visit("https://brankas:brankas@dashboard.staging.brankas.com/")

    

    })
  })
  