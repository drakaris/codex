var chalk = require('chalk');

module.exports = class Logger {
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
