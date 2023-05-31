const { db, storage } = require("../fbase");
const {
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  ComponentType,
  AttachmentBuilder,
} = require("discord.js");
const { Pagination, ExtraRowPosition } = require("pagination.djs");
const Canvas = require("@napi-rs/canvas");
const farmImageMaker = require("../services/farmImageMaker");

async function collectors(interaction) {
  console.log("alive");
  const collector = interaction.channel.createMessageComponentCollector({
    componentType: ComponentType.Button,
    // time: 60000,
  });

  collector.on("collect", async (i) => {
    if (i.user.id === interaction.user.id) {
      if (i.customId === "refresh") {
        await i.deferUpdate();
        message = {
          content: "editfarm",
          files: [await farmImageMaker(type, time)],
          components: [row],
        };
        await i.message.edit(message);
      } else if (i.customId === "item1") {
        docRef.update({ gold: docData.gold - 1 });
        const newCollectionRef = docRef.collection("myFarm");
        const newDocRef = newCollectionRef.doc("crop1");
        docRef.update({ exp: 1 });
        // Add data to the new document
        await newDocRef.set({
          type: 1,
          createAt: new Date(),
        });
        interaction.channel.send("item1 button acted");
      } else {
        interaction.channel.send("fuckoff");
      }
    } else {
      i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    }
  });

  collector.on("end", (collected) => {
    console.log(`Collected ${collected.size} interactions.`);
  });
}

module.exports = collectors;
