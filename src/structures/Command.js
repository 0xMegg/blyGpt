module.exports = class Command {
  constructor(client, options) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    // Add any additional properties for the command
  }

  execute(message, args) {
    throw new Error(
      `The execute() method is not implemented for the ${this.name} command.`
    );
  }
};
