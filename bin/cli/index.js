const cmdTypes = require('../const/cmd');
const { exitIfError } = require('../errorHandler');

const Command = {
  init: require('./init')
}

class CLI {
  constructor(cli) {
    cli = cli.slice(2);

    this.cmd = cli[0];
    this.params = cli.slice(1);

    this.execute = this.execute.bind(this);
  }

  checkCommand() {
    return new Promise((resolve, reject) => {
      if (!cmdTypes[this.cmd]) {
        reject(`
This command ${this.cmd} doesn't support!
Please use one of the commands bellow:

${Object.entries(cmdTypes).map(entry => entry[0] + '\n').join('').slice(0, -1)}`);
      }

      resolve();
    });
  }

  execute() {
    this.checkCommand()
      .then(() => (new Command[cmdTypes[this.cmd].constructor](this.params)).execute())
      .catch(exitIfError);
  }
}

module.exports = CLI;