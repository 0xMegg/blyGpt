const Event = require("../structures/Event");

module.exports = class MessageCreateEvent extends Event {
  run(message) {
    // Ignore bot messages or messages without the prefix
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    // Parse the command and arguments
    const [commandName, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);

    // Handle the command execution
    const command = this.client.commands.get(commandName);
    if (!command) return;

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
    }
  }
};
