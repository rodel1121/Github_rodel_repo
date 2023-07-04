/// <reference types="cypress" />

describe('Given the users api to access OCBC sandbox', () => {
  context('When I send POST v1/accounts/create', () => {
    it('should be generated tap url', () => {
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
      cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .cursor-pointer').click({ force: true })
      cy.get('#submit-btn').click()

      //cancel
      cy.wait(3000)
      cy.get('.clear-icon-default').click()
      //confirmation
      cy.get('#confirmCancel').click()

      cy.wait(3000)
      cy.get('.submit-btn').click()
    })
  })
})
