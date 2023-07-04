/// <reference types="cypress" />

describe('Given the users api to access OCBC Live staging', () => {
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

      //consent
      cy.get('#submit-btn').click()
      //card select
      cy.get(':nth-child(1) > .cursor-pointer > .p-6').click()
      cy.get('#hasGPNInOtherBanks').click()
      //cy.get(':nth-child(2) > .cursor-pointer > .p-6 > .mb-4').click() - for select another bank
      cy.get('#card-select-btn').click()

      //personal info
      cy.get('#name').click().focus().clear().type(name())
      function name() {
        var text = 'Ariel '
        var possible = 'abcdefghijklmnopqrstuvwxyz'
        for (var i = 0; i < 10; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text
      }
      cy.get('#gender').select('Male').should('have.value', 'MALE')

      //datepicker
      //cy.get('#dateOfBirth').click()
      //cy.wait(10000)
      cy.get('#dateOfBirth').click().type('1996-01-02', { force: true }).should('have.value', '1996-01-02')

      cy.get('#mothersMaidenName').click().focus().clear().type(mothersMaidenName())
      function mothersMaidenName() {
        var text = 'Jhoan '
        var possible = 'abcdefghijklmnopqrstuvwxyz'
        for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text
      }

      //random ktp_number
      cy.get('#ktpNumber').click().focus().clear().type(userID_Alpha_Numeric())
      function userID_Alpha_Numeric() {
        var text = '312119'
        var possible = '0123456789'
        for (var i = 0; i < 10; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text
      }

      //random email
      cy.get('#email')
        .click()
        .focus()
        .clear()
        .type(Email_result() + '@brank.as')
      function Email_result() {
        var text = 'rodel.abapo+'
        var possible = '0123456789'
        for (var i = 0; i < 3; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text
      }

      //randome mobile no.
      cy.get('#partialMobileNumber').click().focus().clear().type(Numeric())
      function Numeric() {
        var text = '831'
        var possible = '0123456789'
        for (var i = 0; i < 8; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text
      }
      cy.get('#confirmPersonalData').click()
      cy.get('#form-submit-btn').click()

      //OTP phone No.
      cy.wait(20000)
      cy.get('#code0').type('1')
      cy.get('#code1').type('2')
      cy.get('#code2').type('3')
      cy.get('#code3').type('4')
      cy.get('#code4').type('5')
      cy.get('#code5').type('6')
      cy.get('#submitBtn').click()

      //OTP email
      cy.wait(20000)
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
      cy.get('#religion').select('Kristen Katolik').should('have.value', 'CATHOLIC')
      cy.get('#latestEducation').select('S1').should('have.value', 'BACHELOR')
      cy.get('#form-submit-btn').click()

      //KTP Address
      cy.wait(3000)
      cy.get('#province').select('Bali').should('have.value', 'BALI')
      cy.get('#city').select('Kab. Badung').should('have.value', 'Badung, Kab.')
      cy.get('#district').select('Abiansemal').should('have.value', 'ABIANSEMAL')
      cy.get('#subdistrict').select('Abiansemal').should('have.value', 'ABIANSEMAL')
      cy.get('#rt').click().focus().clear().type('3')
      cy.get('#rw').click().focus().clear().type('4')
      cy.get('#detail_address').click().focus().clear().type('test address 123')
      cy.get('#form-submit-btn').click()

      //current address
      cy.get('#sameKTPAddress').click()
      cy.get('#form-submit-btn').click()

      //Employment data
      cy.wait(1000)
      cy.get('#occupation').select('Profesional').should('have.value', 'Professionals')
      cy.get('#currentProfession').select('Konsultan').should('have.value', 'Consultant')
      cy.get('#currentPosition').select('Lainnya').should('have.value', 'Others Consultant')
      cy.get('#companyName').click().focus().clear().type('sample company name')
      //datepicker
      cy.get('#startOfEmployment').click().type('2020-12-12', { force: true }).should('have.value', '2020-12-12')
      //
      cy.get('#form-submit-btn').click()

      //Workplace Address
      cy.wait(3000)
      cy.get('#province').select('Bali').should('have.value', 'BALI')
      cy.get('#city').select('Kab. Badung').should('have.value', 'Badung, Kab.')
      cy.get('#district').select('Abiansemal').should('have.value', 'ABIANSEMAL')
      cy.get('#subdistrict').select('Abiansemal').should('have.value', 'ABIANSEMAL')
      cy.get('#rt').click().focus().clear().type('5')
      cy.get('#rw').click().focus().clear().type('6')
      cy.get('#detail_address').click().focus().clear().type('work address 123')
      cy.get('#form-submit-btn').click()

      //Financial Data
      cy.get('#accountPurpose').select('Payroll').should('have.value', 'SALARY')
      cy.get('#sourceOfFund').select('Penghasilan').should('have.value', 'INCOME')
      cy.get('#monthlyIncome').select('> 10 Juta - 25 Juta').should('have.value', 'MORE_THAN_10M_TO_25M')
      cy.get('#monthlyTransactions').select('s.d. 1 Juta').should('have.value', 'UP_TO_1M')
      cy.get('#taxPayerOutside').select('Tidak').should('have.value', 'no')
      //checkbox
      cy.get('#accept-terms-conditions').check().should('be.checked')
      //
      cy.get('#form-submit-btn').click()

      //Verify Your Account Now
      cy.wait(8000)
      cy.get('.submit-btn').click()
    })
  })
})
