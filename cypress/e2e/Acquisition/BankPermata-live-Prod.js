/// <reference types="cypress" />

describe('Bank Permata', () => {

    
    it('should be able to signin to CC', () => {

        cy.viewport(1080, 900)
        cy.visit('https://www.brankas.com/')

        cy.get('#hs-eu-confirmation-button').click()
       
        cy.get('.justify-between > .text-center > .h-8').click()
        
        //valid email
        cy.get('#email').type('rodel.abapo@brank.as')
        //enter valid password
        cy.get('#password').type('BciZG7VCTbH@')
        cy.get('#submit').click()

        //change sandmode to live mode
        cy.wait(3000)
        cy.get('.dropdown-trigger > .flex > .w-6').click()
        cy.get('.dropdown-menu > :nth-child(2) > .text-white').click()

        //go to permata bank
        cy.wait(3000)
        cy.get(':nth-child(3) > :nth-child(3) > .text-base > .menu-item > .menu-item-icon').click()
        cy.get('.pt-5 > :nth-child(4)').click()
        cy.wait(3000)
        cy.get('.justify-between.items-center > .text-grey-700').click()

        cy.wait(3000)
        cy.get('[data-testid="country"] > .dropdown-trigger').click()
        cy.get('[data-testid="country"] > .dropdown-menu > #option0').click()
        cy.get('[data-testid="bank"] > .dropdown-trigger').click()
        cy.get('#option3').click()
        //radio button
        cy.get('input[type="radio"]').check('no')

        cy.get('.btn-solid > .flex').click()
        //for print button
        //cy.wait(3000)
        //cy.get('.w-1\/3 > .relative').click()
        

        //next button
        cy.get('.btn-solid > .flex').click()

        //company details
        cy.get(':nth-child(2) > .mr-4 > .relative > .border').click().focus().clear().type('ABC 123 company')
        cy.get(':nth-child(2) > :nth-child(2) > .relative > .border').click().focus().clear().type('111111111111')
        cy.get(':nth-child(3) > .relative > .border').click().focus().clear().type('192.1.1.1')
        cy.get('.block.w-full.mb-6 > .relative > .border').click().focus().clear().type('Sample Branch Address 123')
        cy.get('.mb-6.dropdown > .dropdown-trigger').click()
        cy.get('#option3').click()
        //upload file
        cy.wait(3000)
        cy.get('[type="file"]').attachFile('sample company logo.png');

        cy.get('.btn-solid').click()

        //Applicant details page
        cy.get(':nth-child(3) > .mr-4 > .relative > .border').click().focus().clear().type('John Gonzales Jr. 3rd')
        cy.get(':nth-child(3) > :nth-child(2) > .relative > .border').click().focus().clear().type('Project Manager 1')
        cy.get(':nth-child(4) > .mr-4 > .relative > .border').click().focus().clear().type('sample@sample.com')
        cy.get(':nth-child(4) > :nth-child(2) > .relative > .border').click().focus().clear().type('1234567890')
        cy.get('.shadow-md > .dropdown > .dropdown-trigger').click()
        cy.get('#option0').click()
        cy.get('.block.mb-6 > .relative > .border').click().focus().clear().type('101111QAWERT123')
        cy.get('.btn-solid').click()

        //Your Transaction needs(checkbox)
        //What transaction services does your business offer?
        cy.get("input[type='checkbox']").check("billpayment",{force: true}).should("be.checked")
        cy.get("input[type='checkbox']").check("remittance",{force: true}).should("be.checked")
        cy.get("input[type='checkbox']").check("voucher",{force: true}).should("be.checked")
        cy.get("input[type='checkbox']").check("ewalletemoney",{force: true}).should("be.checked")
        cy.get("input[type='checkbox']").check("paymentgateway",{force: true}).should("be.checked")
        cy.get(':nth-child(6) > .checkbox > .flex > .border-2').click()
        cy.get('div.block > .relative').click().type('test 0001')

        //Through what channels do you offer your transaction service?
        cy.get("input[type='checkbox']").check("website",{force: true}).should("be.checked")
        cy.get("input[type='checkbox']").check("directoffline",{force: true}).should("be.checked")
        cy.get("input[type='checkbox']").check("mobileapp",{force: true}).should("be.checked")
        cy.get(':nth-child(2) > .flex-wrap > :nth-child(4) > .checkbox > .flex > .border-2').click()
        cy.get(':nth-child(2) > .col-span-2 > div.block > .relative').click().type('test 0002')

        //Do your customers have to register to use your product?
        //No radio button
        cy.get("input[type='radio']").check("true").should("be.checked")
        cy.get("input[type='checkbox']").check("nationalid",{force: true}).should("be.checked")

        cy.get("input[type='radio']").check("false").should("be.checked")
        cy.get('.col-span-2.mb-6 > div.block > .relative').click().type('test 0003')

        //How do you collect your customer’s data?
        cy.get("input[type='checkbox']").check("inpersonvisit",{force: true}).should("be.checked")
        cy.get("input[type='checkbox']").check("video",{force: true}).should("be.checked")
        cy.get("input[type='checkbox']").check("phoneemail",{force: true}).should("be.checked")
        cy.get("input[type='checkbox']").check("selfpotrait",{force: true}).should("be.checked")
        cy.get(':nth-child(5) > .flex-wrap > :nth-child(5) > .checkbox > .flex > .border-2').click()
        cy.get(':nth-child(5) > .col-span-2 > div.block > .relative').click().type('test 0004')

        cy.get('.btn-solid').click()

        //Your Data Management Process
        //Do you require authentications to process transactions?
        cy.wait(3000)
        cy.get("input[type='radio']").check("true").should("be.checked")
        //cy.get("input[type='checkbox']").check("loginid",{force: true}).should("be.checked")
        //cy.get("input[type='radio']").check("false").should("be.checked")


        
        


    })
    
  })
  