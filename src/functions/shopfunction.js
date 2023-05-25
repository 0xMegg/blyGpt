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

async function startfunction(interaction) {
  const imageUrl1 =
    "https://firebasestorage.googleapis.com/v0/b/fir-study-1c95a.appspot.com/o/Q_80%2C0.jpeg?alt=media&token=9c015d0e-158e-4d8a-9705-5d3800ee7369";

  const embed1 = new EmbedBuilder().setImage(imageUrl1);
  const rows = rowMaker();
  interaction.reply({
    embeds: [embed1],
    components: rows,
  });

  // const filter = (interaction) => {
  //   return interaction.customId === "item1";
  // };

  const collector = interaction.channel.createMessageComponentCollector({
    // filter,
    // componentType: ComponentType.Button,
    // time: 60000,
  });

  collector.on("collect", async (interaction) => {
    await interaction.deferUpdate();
    console.log(interaction.customId);
    if (interaction.customId === "item1") {
      console.log(interaction.customId);
      interaction.channel.send("item1 button");
    }
  });
}

module.exports = startfunction;
