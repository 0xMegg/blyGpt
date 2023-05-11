const Command = require("../structures/Command");

module.exports = class PlantCommand extends Command {
  constructor(client) {
    super(client, {
      name: "plant",
      description: "Plant seeds on your farm.",
      // Add any additional options or properties for the command
    });
  }

  execute(message, args) {
    // Plant command logic
  }
};
