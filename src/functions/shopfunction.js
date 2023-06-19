const { shopMessageMaker } = require("../services/messageMaker");

async function shopfunction(interaction, messageType, systemMessage) {
  const message = await shopMessageMaker(interaction, systemMessage);
  if (messageType === "send") {
    interaction.channel.send(message);
  } else if (messageType === "editReply") {
    interaction.editReply(message);
  } else {
    interaction.reply(message);
  }
}

module.exports = shopfunction;
