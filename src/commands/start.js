const Command = require("../structures/Command");

module.exports = class StartCommand extends Command {
  constructor(client) {
    super(client, {
      name: "start",
      description: "Start the farming game.",
      // Add any additional options or properties for the command
    });
  }

  execute(message, args) {
    // Start command logic
  }
};
