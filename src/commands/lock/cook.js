const Command = require("../../structures/Command");

module.exports = class CookCommand extends Command {
  constructor(client) {
    super(client, {
      name: "cook",
      description: "Cook delicious dishes.",
      // Add any additional options or properties for the command
    });
  }

  execute(message, args) {
    // Cook command logic
  }
};
