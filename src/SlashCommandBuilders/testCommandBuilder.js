const { SlashCommandBuilder } = require("discord.js");

const testCommandBuilder = new SlashCommandBuilder()
  .setName("test")
  .setDescription("test");

module.exports = testCommandBuilder;
