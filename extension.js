const StatusCheck = require('./src/status-check')

function activate (context) {
  let statusCheck = new StatusCheck()
  context.subscriptions.push(statusCheck)
}

function deactivate () {}

exports.activate = activate
exports.deactivate = deactivate
