# CI Build Status

This extension shows you the build status of your project.

## Features

When the build status changes, a notification message will popup.

The current status is always visible in the statusbar.

![Screenshot](assets/images/screenshot.jpg)

## Requirements

The extension currently supports open source projects built on Appveyor, Circle-CI and Travis.

## Extension Settings

Supported settings are:

`ci-status.service` indicating the ci service to use. Can be `appveyor`, `circleci` or `travis`.

`ci-status.owner` indicating the owner of the project (ie. `ovhemert`)

`ci-status.repo` indicating the repository/project name (ie. `ci-status`)
