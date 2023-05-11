const Command = require("../structures/Command");

module.exports = class HarvestCommand extends Command {
  constructor(client) {
    super(client, {
      name: "harvest",
      description: "Harvest crops from your farm.",
      // Add any additional options or properties for the command
    });
  }

  execute(message, args) {
    // Harvest command logic
  }
};
