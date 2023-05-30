const { db, storage } = require("../fbase");
const rowMaker = require("../services/rowMaker");
const {
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  ComponentType,
  StringSelectMenuBuilder,
} = require("discord.js");

async function shopfunction(interaction, messageType) {
  const imageUrl1 =
    "https://media.discordapp.net/attachments/1110128243220172833/1111544677829705781/Q_800.jpeg?width=686&height=686";

  const embed1 = new EmbedBuilder().setImage(imageUrl1);
  const rows = rowMaker("shop");
  const message = {
    content: "",
    embeds: [embed1],
    components: rows,
    files: [],
  };
  if (messageType === "send") {
    interaction.channel.send(message);
  } else if (messageType === "editReply") {
    interaction.editReply(message);
  } else {
    interaction.reply(message);
  }
}

module.exports = shopfunction;
