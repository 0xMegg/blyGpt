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
const { inventoryMessageMaker } = require("../services/messageMaker");

async function inventoryFunction(interaction, messageType) {
  // const userRef = db.collection("users").doc(interaction.user.id);
  // const userData = (await userRef.get()).data();
  // const cropRef = userRef.collection("myFarm").doc("crop1");
  // const cropDoc = await cropRef.get();
  // const cropData = cropDoc.data();
  // const invenRef = userRef.collection("myInven").doc("inven1");
  // const invenDoc = await invenRef.get();
  // const invenData = invenDoc.data();

  // const itemType = invenData.type;
  // const itemNumber = invenData.number;

  // const attachment = await inventoryImageMaker(itemNumber);
  // const rows = rowMaker("inventory");

  // console.log(itemType);
  // console.log(itemNumber);

  // const message = {
  //   content: itemType + " " + itemNumber,
  //   embeds: [
  //     {
  //       // title: title,
  //       // description: content,
  //       image: {
  //         url: "attachment://myInventory.png",
  //       },
  //     },
  //   ],
  //   files: [attachment],
  //   components: rows,
  // };
  const message = await inventoryMessageMaker(interaction);
  if (messageType === "send") {
    interaction.channel.send(message);
  } else if (messageType === "editReply") {
    interaction.editReply(message);
  } else {
    interaction.reply(message);
  }
}

module.exports = inventoryFunction;
