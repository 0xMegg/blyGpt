const { db, storage } = require("../fbase");
const {
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  AttachmentBuilder,
} = require("discord.js");
const { Pagination, ExtraRowPosition } = require("pagination.djs");
const Canvas = require("@napi-rs/canvas");

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

  switch (type) {
    case 1:
      const now = new Date().getTime() / 1000;
      const gap = now - time;
      console.log(gap);
      break;
    case 2:
      console.log("case2");
      break;
    default:
      console.log("에러에러");
      break;
  }

  const base =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110398686569177208/Sprite-0001-non.png";
  const assets =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110398742508605440/assets_3232.png";
  const seed =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110478589809401886/seed.png";
  const sprout =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110478589255753728/sprout.png";
  const carrot =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110478589490643025/carrot.png";
  const canvas = Canvas.createCanvas(512, 288);
  const context = canvas.getContext("2d");

  //base layer
  context.drawImage(await Canvas.loadImage(base), 0, 0, 512, 288);
  //seed layer for test
  context.drawImage(await Canvas.loadImage(seed), 322, 83, 32, 32);

  const buffer = await canvas.toBuffer("image/png");
  const attachment = new AttachmentBuilder(buffer, {
    name: "myFarm.png",
  });

  interaction.reply({ content: "farm", files: [attachment] });
}

module.exports = farmfunction;
