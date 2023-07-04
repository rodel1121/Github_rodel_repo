/// <reference types="cypress" />

describe('Given the users api to access OCBC sandbox', () => {
  context('When I send POST v1/accounts/create', () => {
    it('should be generated tap url', () => {
      cy.request({
        method: 'POST',
        url: 'https://account-opening.staging.bnk.to/v1/accounts/create',
        headers: {
          'x-api-key': 'LIVE-gxEVy01YpG2Mmi61KwwV2pMKyXXIPGGSN08WGewawvA3NxNqZvpB0layWS999LO8'
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
      cy.get(':nth-child(1) > .cursor-pointer > .flex-grow').click({ force: true })
      //cy.get('#bank-select-btn').check()
      cy.get('#bank-select-btn').click()

      //Consent
      cy.get('#submit-btn').click()

      //cancel
      cy.wait(3000)
      cy.get('#cancelBtn > img').click()
      //confirmation
      cy.get('#confirmCancel').click()

      cy.get('.submit-btn').click()
    })
  })
})
