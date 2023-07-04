/// <reference types="cypress" />

describe('Given the users api to access BNC sandbox', () => {
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

      //Consent
      cy.get('#submit-btn').click()

      //Login
      cy.get('#partialMobileNumber').click().focus().clear().type('83100311040')
      cy.get('#email').click().focus().clear().type('rodel.abapo@brank.as')
      cy.get('#form-submit-btn').click()
      cy.wait(5000)

      //Magic page
      cy.get('#submit-btn').click()

      //2nd tab
      cy.reload()
      cy.get('#sendOTPbtn').click()
      cy.get('#form-submit-btn').click()

      //1/3 Konfirmasi Informasi Anda
      cy.wait(2000)
      cy.get('.mb-6 > .w-full').click()
      cy.get('#allow-camera').click()
      cy.get('.w-12').click()
      cy.get('#name').click().focus().clear().type('Pedro Aaron')
      cy.get('#ktpNumber').click().focus().clear().type('3223413593111285')
      cy.get('#placeOfBirth').click().focus().clear().type('Indonesia')
      //Date picker
      cy.get('#dateOfBirth').click().type('1991-01-12', { force: true }).should('have.value', '1991-01-12')

      cy.get('#gender').select('Male').should('have.value', 'MALE')
      cy.get('#countryOfResidence').select('Indonesia').should('have.value', 'ID')
      cy.get('#residentialAddress').click().focus().clear().type('Sample address 123')
      cy.get('#address').click().focus().clear().type('Sample address 1001')
      cy.get('#province').select('DKI Jakarta').should('have.value', 'DKI Jakarta')
      cy.get('#city').select('Kota Jakarta Selatan').should('have.value', 'Kota Jakarta Selatan')
      cy.get('#district').select('Cilandak').should('have.value', 'Cilandak')
      cy.get('#subDistrict').select('Cilandak Barat').should('have.value', 'Cilandak Barat')

      cy.get('#form-bnc-submit-btn').click()

      // 2/3 Perbaiki informasi pribadi
      cy.get('#motherName').click({ force: true }).focus().clear().type('Maria Teresa Salvador')
      cy.get('#maritalStatus').select('Menikah').should('have.value', 'MARRIED')
      cy.get('#workType').select('Government staff').should('have.value', 'Government staff')
      cy.get('#sourceOfIncome').select('Investment Income').should('have.value', 'INVESTMENT_INCOME')
      cy.get('#monthlyIncome').select('s.d. 1 Juta').should('have.value', 'UP_TO_1M')

      cy.get('#form-bnc-submit-btn').click()

      //success: should go to first tab
      cy.wait(5000)
      cy.reload()
    })
  })
})
