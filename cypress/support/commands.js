// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload'

Cypress.Commands.add('getByTestId', testId => {
  cy.get(`[data-cy='${testId}']`)
})

Cypress.Commands.add('clickRecaptcha', () => {
  cy.window().then(win => {
    win.document.querySelector('#captcha').contentDocument.getElementById('recaptcha-token').click()
  })
})

Cypress.Commands.add('getOTP', profile => {
  let cmd = 'cypress\\support\\mattermost\\mattermost.exe'
  if (Cypress.platform != 'win32') {
    if (Cypress.platform == 'linux') {
      cmd = 'cypress/support/mattermost/mattermost.linux'
    } else {
      // Darwin
      if (Cypress.arch == 'x64') {
        cmd = 'cypress/support/mattermost/mattermost'
      } else {
        // M1/M2
        cmd = 'cypress/support/mattermost/mattermost.macarm'
      }
    }
  }

  console.log(cmd)
  cy.exec(cmd + ' ' + profile, { timeout: 180000 }).then(result => {
    console.log(result.stdout)
    return result.stdout
  })
})

Cypress.Commands.add('form_request', (method, url, formData, done) => {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onload = function () {
    done(xhr)
  }
  xhr.onerror = function () {
    done(xhr)
  }
  xhr.send(formData)
})

Cypress.Commands.add('cc_login', ({ email, password }) => {
  //Assert that Log in page is displayed
  cy.get('#title').should('include.text', 'Welcome')

  //Input valid login credentials
  cy.get('#email').type(email)
  cy.get('#password').type(password)

  //Submit log in credentials
  cy.get('#submit').click({ force: true })

  //Assert that Log In is successful and User is redirected to CC Dashboard Homepage
  cy.get('.font-bold.mb-6').should('include.text', 'Overview')
  cy.get('.home-page-main').should('be.visible')
})

Cypress.Commands.add('cc_logout', () => {
  cy.get('.h-navbar > .font-bold').click({ force: true })
  cy.get('.py-2 > :nth-child(2) > .flex').click({ force: true })

  //Assert that Log Out is successful
  cy.get('#title').should('include.text', 'Welcome back to Brankas')
})

Cypress.Commands.add('check_cc_sidebar', sidebarExpectedMap => {
  cy.get('aside').within($aside => {
    const sidebarKeys = Object.keys(sidebarExpectedMap)

    sidebarKeys.forEach(key => {
      cy.get('.menu-item-label').contains(key).should(sidebarExpectedMap[key])
    })
  })
})
