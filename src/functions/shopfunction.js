const { db, storage } = require("../fbase");
const {
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  ComponentType,
  SelectMenuBuilder,
} = require("discord.js");

async function startfunction(interaction) {
  const imageUrl1 =
    "https://firebasestorage.googleapis.com/v0/b/fir-study-1c95a.appspot.com/o/Q_80%2C0.jpeg?alt=media&token=9c015d0e-158e-4d8a-9705-5d3800ee7369";

  const embed1 = new EmbedBuilder().setImage(imageUrl1);

  const SelectMenuRow = new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
      .setCustomId("location")
      .setPlaceholder("장소")
      .addOptions(
        {
          label: "first label",
          description: "first desc",
          value: "value1",
        },
        {
          label: "second label",
          description: "second desc",
          value: "value2",
        }
      )
  );
  const ButtonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("item1").setLabel("Item 1").setStyle(1),
    new ButtonBuilder().setCustomId("item2").setLabel("Item 2").setStyle(1),
    new ButtonBuilder().setCustomId("item3").setLabel("Item 3").setStyle(1),
    new ButtonBuilder().setCustomId("item4").setLabel("Item 4").setStyle(1)
  );

  interaction.reply({
    embeds: [embed1],
    components: [SelectMenuRow, ButtonRow],
  });

  const filter = (interaction) => {
    return interaction.customId === "item1";
  };

  const collector = interaction.channel.createMessageComponentCollector({
    filter,
    componentType: ComponentType.Button,
    // time: 60000,
  });

  collector.on("collect", async (interaction) => {
    if (interaction.customId === "item1") {
      await interaction.deferUpdate();
      console.log(interaction.customId);
      interaction.channel.send("item1 button");
    }
  });
}

module.exports = startfunction;
