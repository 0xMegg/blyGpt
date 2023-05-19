const { db, storage } = require("../fbase");
const {
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");
const { Pagination, ExtraRowPosition } = require("pagination.djs");

async function shopfunction(interaction) {
  await interaction.reply("shop");
}

module.exports = shopfunction;
