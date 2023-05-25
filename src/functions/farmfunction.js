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

async function farmfunction(interaction) {
  const cropRef = db
    .collection("users")
    .doc(interaction.user.id)
    .collection("myFarm")
    .doc("crop1");
  const cropDoc = await cropRef.get();
  const cropData = cropDoc.data();
  const type = cropData.type;
  const time = cropData.createAt._seconds;

  const attachment = await farmImageMaker(type, time);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("refresh").setLabel("🔄").setStyle(1)
  );

  let message = {
    content: "farm",
    files: [attachment],
    components: [row],
  };

  interaction.reply(message);
}

module.exports = farmfunction;
