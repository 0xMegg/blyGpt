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
const rowMaker = require("../services/rowMaker");
const messageMaker = require("../services/messageMaker");
const shopfunction = require("./shopfunction");
const inventoryFunction = require("./inventoryfunction");

async function farmfunction(interaction) {
  try {
    const message = await messageMaker(interaction, "farm", "author");
    interaction.reply(message);
  } catch (e) {
    console.log(e);
    shopfunction(interaction, "send");
  }

  const collector = interaction.channel.createMessageComponentCollector({});

  async function refreshFarm(interaction) {
    const message = await messageMaker(interaction, "farm", "user");
    interaction.editReply(message);
  }

  collector.on("collect", async (interaction) => {
    await interaction.deferUpdate();
    switch (interaction.customId) {
      case "location":
        switch (interaction.values[0]) {
          case "farm":
            refreshFarm(interaction);
            break;
          case "shop":
            shopfunction(interaction, "editReply");
            break;
          case "inventory":
            inventoryFunction(interaction, "editReply");
            break;
        }
        break;
      case "item1":
        const userRef = db.collection("users").doc(interaction.user.id);
        const userData = (await userRef.get()).data();
        const cropRef1 = userRef.collection("myFarm").doc("crop1");
        console.log("-----before-----");
        console.log(userData.gold);
        userRef.update({ gold: userData.gold - 1 });
        cropRef1.set({
          type: 1,
          createAt: new Date(),
        });
        setTimeout(async () => {
          const newUserRef = db.collection("users").doc(interaction.user.id);
          const newUserData = (await newUserRef.get()).data();
          console.log("-----after-----");
          console.log(newUserData.gold);
        }, 1000);
        break;
      case "refresh":
        refreshFarm(interaction);
        break;
      case "harvest":
        const userRef1 = db.collection("users").doc(interaction.user.id);
        const cropRef = userRef1.collection("myFarm").doc("crop1");
        const cropDoc = await cropRef.get();
        const cropData = cropDoc.data();
        const invenRef = userRef1.collection("myInven").doc("inven1");
        const invenDoc = await invenRef.get();
        const invenData = invenDoc.data();
        const time = cropData?.createAt?._seconds;
        const type = cropData?.type;

        const now = new Date().getTime() / 1000;
        const gap = now - time;
        if (gap > 20) {
          console.log("ready to harvest");
          cropRef.delete();
          const cropNumber = invenData.number;
          if (cropRef.exists) {
            invenRef.update({
              type: "plant1",
              number: cropNumber + 1,
            });
          } else {
            invenRef.set({
              type: "plant1",
              number: cropNumber + 1,
            });
          }
          console.log("harvested");
        } else {
          console.log("not ready");
        }
        setTimeout(() => refreshFarm(interaction), 1000);

        break;
      default:
        interaction.channel.send(`${interaction.customId} 미구현 기능입니다`);
    }
  });
}

module.exports = farmfunction;
