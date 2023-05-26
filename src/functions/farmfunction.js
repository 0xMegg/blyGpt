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
const shopfunction = require("./shopfunction");
const inventoryFunction = require("./inventoryFunction");

async function farmfunction(interaction) {
  const userRef = db.collection("users").doc(interaction.author.id);
  const userData = (await userRef.get()).data();
  const cropRef = userRef.collection("myFarm").doc("crop1");
  const cropDoc = await cropRef.get();
  const cropData = cropDoc.data();
  let time;
  let type;
  try {
    time = cropData?.createAt?._seconds;
    type = cropData?.type;
  } catch (e) {
    console.log(e);
    shopfunction(interaction, "send");
  }
  const attachment = await farmImageMaker(type, time);
  const rows = rowMaker("farm");

  let message = {
    files: [attachment],
    components: rows,
  };

  interaction.reply(message);
  // const filter = (interaction) => {
  //   return interaction.customId === "item1";
  // };

  const collector = interaction.channel.createMessageComponentCollector({
    // filter,
    // componentType: ComponentType.Button,
    // time: 60000,
  });

  async function refreshFarm(interaction) {
    const newAttachment = await farmImageMaker(type, time);
    const newMessage = {
      files: [newAttachment],
      components: rows,
      embeds: [],
    };
    interaction.editReply(newMessage);
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
        console.log("-----before-----");
        console.log(userData.gold);
        userRef.update({ gold: userData.gold - 1 });
        cropRef.set({
          type: 1,
          createAt: new Date(),
        });
        console.log("-----after-----");
        console.log(userData.gold);
        break;
      case "refresh":
        refreshFarm(interaction);
        break;
      case "harvest":
        // if (gap > 20) {
        //   console.log("ready to harvest");
        // } else {
        console.log("not ready");
        // }
        break;
      default:
        interaction.channel.send(`${interaction.customId} 미구현 기능입니다`);
    }
  });
}

module.exports = farmfunction;
