const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

function rowMaker() {
  const SelectMenuRow = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
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

  const rows = [SelectMenuRow, ButtonRow];

  return rows;
}

module.exports = rowMaker;
