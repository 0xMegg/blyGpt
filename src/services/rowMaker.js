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
      new ButtonBuilder()
        .setCustomId("seed1")
        .setLabel("buy carrot")
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("seed2")
        .setLabel("buy pumpkin")
        .setStyle(1)
    );
    return [locationMenuRow, shopButtonRow];
  } else if (location === "inventory") {
    const invenButtonRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("plant1")
        .setLabel("plant carrot")
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("plant2")
        .setLabel("plant pumpkin")
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("sell1")
        .setLabel("sell carrot")
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("sell2")
        .setLabel("sell pumpkin")
        .setStyle(1),
      new ButtonBuilder().setCustomId("cook").setLabel("cook dish").setStyle(1)
    );
    return [locationMenuRow, invenButtonRow];
  }
}

module.exports = rowMaker;
