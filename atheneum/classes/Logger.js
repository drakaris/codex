var chalk = require('chalk');

var exp = class Logger {
  constructor() {
    this.error = chalk.bold.red;
    this.warning = chalk.bold.yellow;
    this.success = chalk.bold.green;
  }

  log(data) {
    console.log('[LOG] ' + data);
  }

  info(data) {
    console.log(this.success('[INFO] ' + data));
  }

  notify(data) {
    console.log(this.warning('[WARN] ' + data));
  }

  critical(data) {
    console.log(this.error('[ERROR] ' + data));
  }
}

// Class export logic
if (module.parent) {
  module.exports = exp;
} else {
  var test = new exp();
  test.notify('Test Data');
}
