/// <reference types="cypress" />

describe('Given the users api to access OCBC sandbox', () => {
  context('When user attempt 3x with wrong OTP', () => {
    it('should prompt a message "OTP kamu salah. Silahkan coba 2x lagi', () => {
      cy.request({
        method: 'POST',
        url: 'https://account-opening.sandbox.staging.bnk.to/v1/accounts/create',
        headers: {
          'x-api-key': 'SANDBOX-aP2mk4S8fnAd2DnEaFPDIP4YHdH6Zd9vL3mECkMHT3GtqoDq2FL4I5HQVmKdLlsZ'
        },
        body: {
          bank_code: 'UNKNOWN_BANK',
          has_client_consent: false,
          data: {
            name: '',
            gender: '',
            id_card_number: '',
            email: '',
            mobile_info: {
              phone_number: '',
              prefix_phone_number: '62'
            },
            mother_maiden_name: '',
            date_of_birth: '',
            birth_place: '',
            marital_status: '',
            religion: '',
            purpose: '',
            source_of_fund: '',
            monthly_income: '',
            monthly_expenses: ''
          },
          client: {
            return_url: 'https://example.com',
            fail_url: '',
            customer_id: '',
            customer_name: ''
          }
        }
      }).then(response => {
        expect(response).property('status').to.eql(200)
        expect(response.body.ao_id).to.not.be.null
        const returnUrl = response.body.redirect_url
        cy.visit(returnUrl)
      })

      //UI
      //Select bank
      cy.get('.overflow-auto > :nth-child(1) > :nth-child(1) > :nth-child(1) > .cursor-pointer').click({ force: true })
      //cy.get('#bank-select-btn').check()
      cy.get('#submit-btn').click()

      //consent
      cy.get('#submit-btn').click()
      //card select
      cy.get(':nth-child(1) > .cursor-pointer > .p-6').click()
      cy.get('#hasGPNInOtherBanks').click()
      //cy.get(':nth-child(2) > .cursor-pointer > .p-6 > .mb-4').click() - for select another bank
      cy.get('.btn-ocbc').click()

      //personal info
      cy.get('#name').click().focus().clear().type('Michael Gonzales')
      cy.get('#gender').select('Male').should('have.value', 'MALE')

      //datepicker
      //cy.get('#dateOfBirth').click()
      //cy.wait(10000)
      cy.get('#dateOfBirth').click().type('2009-12-12', { force: true }).should('have.value', '2009-12-12')

      cy.get('#mothersMaidenName').click().focus().clear().type('Joy Gonzales')
      cy.get('#ktpNumber').click().focus().clear().type('3223497593011019')
      cy.get('#email').click().focus().clear().type('rodel.abapo@brankas.com')
      cy.get('#partialMobileNumber').click().focus().clear().type('83100311019')
      cy.get('#confirmPersonalData').click()
      cy.get('.btn-ocbc').click()

      //OTP phone No. first attempt(should prompt a message "OTP kamu salah. Silahkan coba 2x lagi)
      cy.wait(8000)
      cy.get('#code0').type('6')
      cy.get('#code1').type('5')
      cy.get('#code2').type('4')
      cy.get('#code3').type('3')
      cy.get('#code4').type('2')
      cy.get('#code5').type('1')
      cy.get('#submit-btn').click()

      //OTP phone No. 2nd attempt(should prompt a message "OTP kamu salah. Silahkan coba 1x lagi)
      cy.wait(8000)
      cy.get('#code0').type('5')
      cy.get('#code1').type('5')
      cy.get('#code2').type('4')
      cy.get('#code3').type('3')
      cy.get('#code4').type('2')
      cy.get('#code5').type('7')
      cy.get('#submit-btn').click()

      //OTP phone No. 3rd attempt(error message display)
      cy.wait(8000)
      cy.get('#code0').type('5')
      cy.get('#code1').type('5')
      cy.get('#code2').type('4')
      cy.get('#code3').type('3')
      cy.get('#code4').type('2')
      cy.get('#code5').type('7')
      cy.get('#submit-btn').click()

      // cy.get('.submit-btn').Click()
    })
  })
})
