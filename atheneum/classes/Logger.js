var chalk = require('chalk');

module.exports = class Logger {
  constructor() {
    this.error = chalk.bold.red;
    this.warn = chalk.bold.yellow;
    this.success = chalk.bold.green;
  }

  log(data) {
    console.log('[LOG] ' + data);
  }

  info(data) {
    console.log(this.success('[INFO] ' + data));
  }

  warn(data) {
    console.log(this.warn('[WARN] ' + data));
  }

  error(data) {
    console.log(this.error('[ERROR] ' + data));
  }
}
