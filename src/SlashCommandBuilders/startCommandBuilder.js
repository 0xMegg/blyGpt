const { SlashCommandBuilder } = require("discord.js");

const startCommandBuilder = new SlashCommandBuilder()
  .setName("start")
  .setDescription("start the BLY");
// .addUserOption((option) =>
//   option
//     .setName("user")
//     .setDescription("Choice user to start")
//     .setRequired(true)
// )
// .addIntegerOption((option) =>
//   option
//     .setName("amount")
//     .setDescription("how much?")
//     .setRequired(true)
//     .setMinValue(0)
// );

module.exports = startCommandBuilder;
