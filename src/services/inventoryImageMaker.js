const { AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");

async function inventoryImageMaker() {
  const base =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1111553484211363890/20220824000086_0.jpg";

  const canvas = Canvas.createCanvas(1280, 853);
  const context = canvas.getContext("2d");

  //base layer1280 × 853
  context.drawImage(await Canvas.loadImage(base), 0, 0, 1280, 853);

  const buffer = await canvas.toBuffer("image/png");
  const attachment = new AttachmentBuilder(buffer, {
    name: "myInventory.png",
  });

  return attachment;
}

module.exports = inventoryImageMaker;
