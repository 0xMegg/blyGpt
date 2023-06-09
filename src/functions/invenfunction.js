const { inventoryMessageMaker } = require(__dirname +
  "/../services/messageMaker");

async function invenfunction(interaction, messageType, systemMessage) {
  const message = await inventoryMessageMaker(interaction, systemMessage);
  if (messageType === "send") {
    interaction.channel.send(message);
  } else if (messageType === "update") {
    interaction.update(message, systemMessage);
  } else {
    interaction.reply(message);
  }
}

module.exports = invenfunction;
