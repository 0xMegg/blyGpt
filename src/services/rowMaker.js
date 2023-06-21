const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");
const { crop1Name, crop2Name, dishName } = require("../config");

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
        .setLabel(`buy ${crop1Name}`)
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("seed2")
        .setLabel(`buy ${crop2Name}`)
        .setStyle(1)
    );
    return [locationMenuRow, shopButtonRow];
  } else if (location === "inventory") {
    const invenButtonRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("plant1")
        .setLabel(`plant ${crop1Name}`)
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("plant2")
        .setLabel(`plant ${crop2Name}`)
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("sell1")
        .setLabel(`sell ${crop1Name}`)
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("sell2")
        .setLabel(`sell ${crop2Name}`)
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("cook")
        .setLabel(`cook ${dishName}`)
        .setStyle(1)
    );
    return [locationMenuRow, invenButtonRow];
  }
}

module.exports = rowMaker;
