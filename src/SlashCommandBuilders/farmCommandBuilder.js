const { SlashCommandBuilder } = require("discord.js");

const farmCommandBuilder = new SlashCommandBuilder()
  .setName("farm")
  .setDescription("farm");

module.exports = farmCommandBuilder;
