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
      cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > .cursor-pointer > .flex-grow').click({ force: true })
      cy.get('#submit-btn').click()

      //Consent
      cy.get('#submit-btn').click()

      //Select Account
      cy.get('.p-6').click()
      cy.get('#product-select-btn').click()

      //Personal Info page without Nomor NPWP
      //Random name function
      var name = ['Ronaldo Valdez', 'Terry Mendez', 'Marry Sanchez', 'Reian Santos']
      var i = Math.floor(Math.random() * 3) + 1
      var _name = name[i]
      cy.get('#name').type(_name)

      cy.get('#gender').select('Male').should('have.value', 'MALE')
      cy.get('#ktpNumber').click().focus().clear().type('3223413593111290')
      cy.get('#email').click().focus().clear().type('rodel.abapo@brank.as')
      cy.get('#partialPhoneNumber').click().focus().clear().type('8129023185')
      cy.get('#partialMobileNumber').click().focus().clear().type('9955512678')
      cy.get('#confirmPersonalData').click()
      cy.get('.btn-danamon').click()

      //Additional Info page
      cy.wait(3000)
      cy.get('#birthPlace').click().focus().clear().type('Manila')
      cy.get('#dateOfBirth').click().type('1991-02-14', { force: true }).should('have.value', '1991-02-14')
      cy.get('#maritalStatus').select('Belum Menikah').should('have.value', 'SINGLE')
      cy.get('#religion').select('Catholic').should('have.value', 'CATHOLIC')
      cy.get('#education').select('S1').should('have.value', 'BACHELOR')
      cy.get('#submit-btn').click()

      //KTP Address
      cy.wait(3000)
      cy.get('#province').select('BALI').should('have.value', '26')
      cy.get('#city').select('KAB. BANGLI').should('have.value', '380')
      cy.get('#district').select('SUSUT').should('have.value', '7')
      cy.get('#subDistrict').select('ABUAN').should('have.value', '52')
      cy.get('#rt').click().focus().clear().type('1')
      cy.get('#rw').click().focus().clear().type('4')
      cy.get('#detail_address').click().focus().clear().type('test address 456')
      cy.get('#homeStatus').select('Personal').should('have.value', 'PERSONAL')
      cy.get('.btn-danamon').click()

      //current address
      cy.get('#sameKTPAddress').click()
      cy.get('.btn-danamon').click()

      //Employment data
      cy.wait(1000)
      cy.get('#companyName').click().focus().clear().type('sample company name')
      cy.get('#currentProfession').select('Private Employees').should('have.value', 'Private Employees')
      cy.get('#businessIndustry').select('Technology').should('have.value', 'Technology')
      cy.get('#currentPosition').select('Manager').should('have.value', 'Manager')
      cy.get('.btn-danamon').click()

      //Work Place
      cy.wait(1000)
      cy.get('#province').select('BANTEN').should('have.value', '2')
      cy.get('#city').select('KAB. SERANG').should('have.value', '30')
      cy.get('#district').select('TANARA').should('have.value', '67')
      cy.get('#subDistrict').select('BENDUNG').should('have.value', '825')
      cy.get('#rt').click().focus().clear().type('5')
      cy.get('#rw').click().focus().clear().type('6')
      cy.get('#detail_address').click().focus().clear().type('work address 123')
      cy.get('.btn-danamon').click()

      //Financial Info
      cy.get('#monthlyIncome').select('> 1 Milyar').should('have.value', 'MORE_THAN_1B')
      cy.get('#monthlyTransactions').select('> 500 Juta-1 Milyar').should('have.value', 'MORE_THAN_500M_TO_1B')
      cy.get('#sourceOfFund').select('Bunga Simpanan').should('have.value', 'SAVINGS')
      cy.get('#accountPurpose').select('Investasi').should('have.value', 'INVESTMENT')
      cy.get('#accept-terms-conditions').click()
      cy.get('#tnc-container > :nth-child(1) > .cursor-pointer').click()
      cy.wait(3000)
      cy.get('.w-6').click()
      cy.get(':nth-child(2) > .cursor-pointer').click()
      cy.wait(3000)
      cy.get('.w-6').click()
      cy.get('.btn-danamon').click()

      //Personal Documents
      //Multiple upload files
      cy.wait(3000)
      cy.get('[id="ktpPhoto"]').attachFile('SC2.png')
      cy.get('[id="selfieWithKtp"]').attachFile('sample_ktp_lessthan1MB.jpg')

      //Draw signature features
      cy.get('#signature-body').click()
      cy.get('.border-2')
        .trigger('mousedown', 'center')
        .click({ release: false })
        .trigger('mousemove', { clientX: 200, clientY: 300 })
        .trigger('mouseup', 5, 5)
        .trigger('mouseleave')

      cy.get('#signature-pad-button > .btn-danamon').click()

      //terms and conditions
      cy.get(':nth-child(1) > #accept-terms-conditions').click()
      cy.get(':nth-child(2) > #accept-terms-conditions').click()
      cy.get('#form-submit-btn').click()

      //Status Polling
      cy.wait(3000)
      cy.get('#submit-btn').click()

      //web Verification
      cy.wait(3000)
      cy.get('#form-danamon-submit-btn').click()

      //web verification step
      cy.get('#submit-btn').click()

      //success-END of testing
    })
  })
})
