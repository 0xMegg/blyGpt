const { inventoryMessageMaker } = require(__dirname +
  "/../services/messageMaker");

async function invenfunction(interaction, messageType) {
  const message = await inventoryMessageMaker(interaction);
  if (messageType === "send") {
    interaction.channel.send(message);
  } else if (messageType === "editReply") {
    interaction.editReply(message);
  } else {
    interaction.reply(message);
  }
}

module.exports = invenfunction;