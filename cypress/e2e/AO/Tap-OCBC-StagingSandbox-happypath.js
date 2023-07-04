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
      cy.get('#name').click().focus().clear().type('Ariel Gonzales')
      cy.get('#gender').select('Male').should('have.value', 'MALE')

      //datepicker
      //cy.get('#dateOfBirth').click()
      //cy.wait(10000)
      cy.get('#dateOfBirth').click().type('2009-12-12', { force: true }).should('have.value', '2009-12-12')

      cy.get('#mothersMaidenName').click().focus().clear().type('Joy Gonzales')
      cy.get('#ktpNumber').click().focus().clear().type('3223497593011019')
      cy.get('#email').click().focus().clear().type('sample@sample.com')
      cy.get('#partialMobileNumber').click().focus().clear().type('83100311019')
      cy.get('#confirmPersonalData').click()
      cy.get('.btn-ocbc').click()

      //OTP phone No.
      cy.wait(8000)
      cy.get('#code0').type('1')
      cy.get('#code1').type('2')
      cy.get('#code2').type('3')
      cy.get('#code3').type('4')
      cy.get('#code4').type('5')
      cy.get('#code5').type('6')
      cy.get('#submit-btn').click()

      //OTP phone No.
      cy.wait(8000)
      cy.get('#code0').type('1')
      cy.get('#code1').type('2')
      cy.get('#code2').type('3')
      cy.get('#code3').type('4')
      cy.get('#code4').type('5')
      cy.get('#code5').type('6')
      cy.get('#sticky-footer-wrapper').click()

      //upload file
      cy.wait(8000)
      cy.get('[type="file"]').attachFile('sample company logo.png')

      //Additional Info
      cy.get('#birthPlace').click().focus().clear().type('Indonesia')
      cy.get('#maritalStatus').select('Belum Menikah').should('have.value', 'SINGLE')
      cy.get('#religion').select('Catholic').should('have.value', 'CATHOLIC')
      cy.get('#education').select('S1').should('have.value', 'BACHELOR')
      cy.get('#submit-btn').click()

      //KTP Address
      cy.wait(3000)
      cy.get('#province').select('Bali').should('have.value', '1-BALI')
      cy.get('#city').select('Badung, Kab.').should('have.value', '354-BADUNG, KAB.')
      cy.get('#district').select('Abiansemal').should('have.value', '5019-ABIANSEMAL')
      cy.get('#subDistrict').select('Abiansemal').should('have.value', '60814-ABIANSEMAL')
      cy.get('#rt').click().focus().clear().type('3')
      cy.get('#rw').click().focus().clear().type('4')
      cy.get('#detail_address').click().focus().clear().type('test address 123')
      cy.get('.btn-ocbc').click()

      //current address
      cy.get('#sameKTPAddress').click()
      cy.get('.btn-ocbc').click()

      //Employment data
      cy.wait(1000)
      cy.get('#occupation').select('Professionals').should('have.value', 'Professionals')
      cy.get('#currentProfession').select('Consultant').should('have.value', 'Consultant')
      cy.get('#currentPosition').select('Others Consultant').should('have.value', 'Others Consultant')
      cy.get('#companyName').click().focus().clear().type('sample company name')
      cy.get('#businessIndustry').select('Financial').should('have.value', 'Financial')
      cy.get('#businessSubIndustry').select('Insurance').should('have.value', 'Insurance')
      //datepicker
      cy.get('#startOfEmployment').click().type('2020-12-12', { force: true }).should('have.value', '2020-12-12')
      //
      cy.get('.btn-ocbc').click()

      //Workplace Address
      cy.wait(3000)
      cy.get('#province').select('Bali').should('have.value', '1-BALI')
      cy.get('#city').select('Badung, Kab.').should('have.value', '354-BADUNG, KAB.')
      cy.get('#district').select('Abiansemal').should('have.value', '5019-ABIANSEMAL')
      cy.get('#subDistrict').select('Abiansemal').should('have.value', '60814-ABIANSEMAL')
      cy.get('#rt').click().focus().clear().type('5')
      cy.get('#rw').click().focus().clear().type('6')
      cy.get('#detail_address').click().focus().clear().type('work address 456')
      cy.get('.btn-ocbc').click()

      //Financial Data
      cy.get('#accountPurpose').select('Payroll').should('have.value', 'SALARY')
      cy.get('#sourceOfFund').select('Penghasilan').should('have.value', 'INCOME')
      cy.get('#monthlyIncome').select('> 10 Juta - 25 Juta').should('have.value', 'MORE_THAN_10M_TO_25M')
      cy.get('#monthlyTransactions').select('s.d. 1 Juta').should('have.value', 'UP_TO_1M')
      cy.get('#isTaxPayerOutside').select('Tidak').should('have.value', 'no')
      //checkbox
      cy.get('#accept-terms-conditions').check().should('be.checked')

      //T&C
      cy.get('#tnc-container > :nth-child(1) > .cursor-pointer').click()
      cy.wait(3000)
      cy.get('.w-6').click()
      cy.get(':nth-child(2) > .cursor-pointer').click()
      cy.wait(3000)
      cy.get('.w-6').click()
      cy.get(':nth-child(3) > .cursor-pointer').click()
      cy.wait(3000)
      cy.get('.w-6').click()
      cy.get(':nth-child(4) > .cursor-pointer').click()
      cy.wait(3000)
      cy.get('.w-6').click()

      //
      cy.get('.btn-ocbc').click()

      //Verify Your Account Now
      cy.wait(8000)
      cy.get('.submit-btn').click()

      //new tab KYC
      cy.reload()
      cy.wait(3000)
      cy.get('#submit-btn').click()
    })
  })
})
