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
        .setLabel("전부 수확")
        .setStyle(1),
      new ButtonBuilder().setCustomId("refresh").setLabel("🔄").setStyle(1)
    );
    return [locationMenuRow, farmButtonRow];
  } else if (location === "shop") {
    const shopButtonRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("seed1")
        .setLabel(`${crop1Name} 구매`)
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("seed2")
        .setLabel(`${crop2Name} 구매`)
        .setStyle(1)
    );
    return [locationMenuRow, shopButtonRow];
  } else if (location === "inventory") {
    const invenButtonRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("plant1")
        .setLabel(`${crop1Name} 심기`)
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("plant2")
        .setLabel(`${crop2Name} 심기`)
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("sell1")
        .setLabel(`${crop1Name} 판매`)
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("sell2")
        .setLabel(`${crop2Name} 판매`)
        .setStyle(1),
      new ButtonBuilder()
        .setCustomId("cook")
        .setLabel(`${dishName} 요리`)
        .setStyle(1)
    );
    return [locationMenuRow, invenButtonRow];
  }
}

module.exports = rowMaker;
