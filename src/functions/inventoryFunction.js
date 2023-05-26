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
const inventoryImageMaker = require("../services/inventoryImageMaker");
const rowMaker = require("../services/rowMaker");

async function inventoryFunction(interaction, messageType) {
  // try {
  //   const cropRef = db
  //     .collection("users")
  //     .doc(interaction.author.id)
  //     .collection("myFarm")
  //     .doc("crop1");
  //   const cropDoc = await cropRef.get();
  //   const cropData = cropDoc.data();
  //   time = cropData?.createAt?._seconds;
  //   type = cropData?.type;
  // } catch (e) {
  //   console.log(e);
  //   shopfunction(interaction, "send");
  // }
  const attachment = await inventoryImageMaker();
  const rows = rowMaker("inventory");

  const message = {
    embeds: [],
    files: [attachment],
    components: rows,
  };

  if (messageType === "send") {
    interaction.channel.send(message);
  } else if (messageType === "editReply") {
    interaction.editReply(message);
  } else {
    interaction.reply(message);
  }
  // const filter = (interaction) => {
  //   return interaction.customId === "item1";
  // };
}

module.exports = inventoryFunction;
