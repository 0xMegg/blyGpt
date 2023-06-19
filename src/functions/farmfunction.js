const { farmMessageMaker } = require("../services/messageMaker");

async function farmfunction(interaction, type, systemMessage) {
  if (type === "main") {
    const message = await farmMessageMaker(interaction, type);
    interaction.reply(message);
  } else if (type === "refresh") {
    const message = await farmMessageMaker(interaction, type, systemMessage);
    interaction.editReply(message);
  }

  // async function refreshFarm(
  //   interaction,
  //   harvestedCrop1Number,
  //   harvestedCrop2Number
  // ) {
  //   const message = await farmMessageMaker(
  //     interaction,
  //     "refresh",
  //     harvestedCrop1Number,
  //     harvestedCrop2Number
  //   );
  //   interaction.editReply(message);
  // }
}
module.exports = farmfunction;
