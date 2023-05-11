const Command = require("../structures/Command");

module.exports = class EndCommand extends Command {
  constructor(client) {
    super(client, {
      name: "end",
      description: "End the farming game.",
      // Add any additional options or properties for the command
    });
  }

  execute(message, args) {
    // End command logic
  }
};
