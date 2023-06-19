const { farmMessageMaker } = require("../services/messageMaker");

async function farmfunction(interaction, type, systemMessage) {
  if (type === "main") {
    const message = await farmMessageMaker(interaction, type);
    interaction.reply(message);
  } else if (type === "refresh") {
    const message = await farmMessageMaker(interaction, type, systemMessage);
    interaction.editReply(message);
  }
}
module.exports = farmfunction;
