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
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113010845258096680/3x3.png";
  const embed1 = new EmbedBuilder().setImage(imageUrl1);
  const rows = rowMaker("shop");
  const message = {
    content: "",
    embeds: [
      {
        // title: title,
        // description: content,
        image: {
          url: imageUrl1,
        },
      },
    ],
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
