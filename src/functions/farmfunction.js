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
  const base =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110398686569177208/Sprite-0001-non.png";
  const assets =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110398742508605440/assets_3232.png";
  const seed =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110413346844459039/seed.png";
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
