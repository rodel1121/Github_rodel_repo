const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // projectId: '32d9rp',

  viewport: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  // reporter: 'cypress-mochawesome-reporter',

  // reporterOptions: {
  //   reportDir: 'cypress/reports',
  //   charts: true,
  //   reportPageTitle: 'My Test Suite',
  //   embeddedScreenshots: true,
  //   inlineAssets: true
  // },

  // video: false,

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(`  -> ${message}`)

          return null
        },
        ...require('./cypress/plugins/index.js')()
      })
    },
    defaultCommandTimeout: 60000,
    slowTestThreshold: 3000,
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*', '**/mytest/*'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'https://tap.staging.bnk.to'
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  },
  compilerOptions: {
    types: ['cypress', 'cypress-file-upload']
  }
})
