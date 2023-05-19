const { SlashCommandBuilder } = require("discord.js");

const shopCommandBuilder = new SlashCommandBuilder()
  .setName("shop")
  .setDescription("shop");

module.exports = shopCommandBuilder;
