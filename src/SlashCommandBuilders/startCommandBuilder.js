const { SlashCommandBuilder } = require("discord.js");

const startCommandBuilder = new SlashCommandBuilder()
  .setName("start")
  .setDescription("start");

module.exports = startCommandBuilder;
