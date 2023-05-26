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

async function shopfunction(interaction, farm) {
  const imageUrl1 =
    "https://firebasestorage.googleapis.com/v0/b/fir-study-1c95a.appspot.com/o/Q_80%2C0.jpeg?alt=media&token=9c015d0e-158e-4d8a-9705-5d3800ee7369";

  const embed1 = new EmbedBuilder().setImage(imageUrl1);
  const rows = rowMaker("shop");
  const message = {
    embeds: [embed1],
    components: rows,
    files: [],
  };
  if (farm === "send") {
    interaction.channel.send(message);
  } else if (farm === "editReply") {
    interaction.editReply(message);
  } else {
    interaction.reply(message);
  }
}

module.exports = shopfunction;
