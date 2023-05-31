const { shopMessageMaker } = require("../services/messageMaker");

async function shopfunction(interaction, messageType) {
  const message = await shopMessageMaker(interaction);
  if (messageType === "send") {
    interaction.channel.send(message);
  } else if (messageType === "editReply") {
    interaction.editReply(message);
  } else {
    interaction.reply(message);
  }
}

module.exports = shopfunction;
