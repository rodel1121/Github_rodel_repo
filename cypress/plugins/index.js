const path = require('path')
const gmailTester = require('gmail-tester')

module.exports = () => ({
  anothertask: args => {
    console.log('for example:', args)

    // If you do not need to return a value,
    // explicitly return null to signal that the given event has been handled.
    // ref: https://docs.cypress.io/api/commands/task#docusaurus_skipToContent_fallback
    return null
  },
  'gmail:get-messages': async args => {
    const messages = await gmailTester.get_messages(
      path.resolve(__dirname, 'credentials.json'),
      path.resolve(__dirname, 'gmail_token.json'),
      args.options
    )

    return messages
  }
})
