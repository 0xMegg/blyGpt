const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

function rowMaker(location) {
  const locationMenuRow = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("location")
      .setPlaceholder("장소")
      .addOptions(
        {
          label: "farm",
          description: "farm",
          value: "farm",
        },
        {
          label: "shop",
          description: "shop",
          value: "shop",
        },
        {
          label: "inventory",
          description: "inventory",
          value: "inventory",
        }
      )
  );

  const farmButtonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("harvest")
      .setLabel("harvest all")
      .setStyle(1),
    new ButtonBuilder().setCustomId("refresh").setLabel("🔄").setStyle(1)
  );

  const shopButtonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("item1").setLabel("Item 1").setStyle(1),
    new ButtonBuilder().setCustomId("item2").setLabel("Item 2").setStyle(1),
    new ButtonBuilder().setCustomId("item3").setLabel("Item 3").setStyle(1),
    new ButtonBuilder().setCustomId("item4").setLabel("Item 4").setStyle(1)
  );

  switch (location) {
    case "farm":
      return [locationMenuRow, farmButtonRow];
    case "shop":
      return [locationMenuRow, shopButtonRow];
    case "inventory":
      return [locationMenuRow];
  }
}

module.exports = rowMaker;
