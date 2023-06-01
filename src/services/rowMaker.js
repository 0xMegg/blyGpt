const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

function rowMaker(location) {
  const locationMenuRow = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder().setCustomId("location").addOptions(
      ...["farm", "shop", "inventory"].map((option) => {
        const menu = new StringSelectMenuOptionBuilder()
          .setLabel(option)
          .setValue(option)
          .setDescription(option);

        if (option === location) {
          menu.setDefault(true);
        }

        return menu;
      })
    )
  );

  if (location === "farm") {
    const farmButtonRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("harvest")
        .setLabel("harvest all")
        .setStyle(1),
      new ButtonBuilder().setCustomId("refresh").setLabel("🔄").setStyle(1)
    );
    return [locationMenuRow, farmButtonRow];
  } else if (location === "shop") {
    const shopButtonRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("item1").setLabel("Item 1").setStyle(1),
      new ButtonBuilder().setCustomId("item2").setLabel("Item 2").setStyle(1),
      new ButtonBuilder().setCustomId("item3").setLabel("Item 3").setStyle(1),
      new ButtonBuilder().setCustomId("item4").setLabel("Item 4").setStyle(1)
    );
    return [locationMenuRow, shopButtonRow];
  } else if (location === "inventory") {
    return [locationMenuRow];
  }
}

module.exports = rowMaker;
