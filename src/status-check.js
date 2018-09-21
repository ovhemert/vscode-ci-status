const vscode = require('vscode')
const cistatus = require('ci-status')

class StatusCheck {
  constructor () {
    this._timer = setInterval(this.check, 5000)
    this._status = {}
  }
  async check () {
    let self = this
    try {
      // init statusbar item if no status available
      if (!self._statusBarItem) { self._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left) }
      if (!self._status) { self._statusBarItem.hide() }
      // check config
      const cfg = vscode.workspace.getConfiguration('ci-status')
      const { service, owner, repo } = cfg
      if (!service || !owner) { return }
      const svc = cistatus[service]
      if (!svc) { return }
      // get status
      const projects = await svc.getProjects({ service, owner, repo })
      const status = (projects && projects.length > 0) ? projects[0] : null
      if (!status) { return }
      // compare with previous status
      const diff = (JSON.stringify(self._status) !== JSON.stringify(status))
      if (!diff) { return }
      // update status
      self._status = status
      // show message
      const msg = `Build status changed to: ${status.lastBuildStatus}`
      if (status.lastBuildStatus === 'Success') {
        vscode.window.showInformationMessage(msg)
      } else if (status.lastBuildStatus === 'Failure' || status.lastBuildStatus === 'Exception') {
        vscode.window.showErrorMessage(msg)
      } else {
        vscode.window.showWarningMessage(msg)
      }
      // update status bar
      self._statusBarItem.text = `$(beaker) ${status.lastBuildStatus}`
      self._statusBarItem.show()
    } catch (error) {
      console.log(error)
    }
  }
  dispose () {
    if (this._timer) { clearInterval(this._timer) }
    if (this._statusBarItem) { this._statusBarItem.dispose() }
  }
}

module.exports = StatusCheck
