const { AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");

async function farmImageMaker(type, time) {
  let status = "";
  const base =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113010845258096680/3x3.png";
  // const base =
  //   "https://cdn.discordapp.com/attachments/1110128243220172833/1110398686569177208/Sprite-0001-non.png";
  // const assets =
  //   "https://cdn.discordapp.com/attachments/1110128243220172833/1110398742508605440/assets_3232.png";
  const seed =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110478589809401886/seed.png";
  const sprout =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110478589255753728/sprout.png";
  const carrot =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110478589490643025/carrot.png";

  if (type === 1) {
    const now = new Date().getTime() / 1000;
    const gap = now - time;
    console.log(gap);
    if (gap <= 10) {
      status = seed;
      console.log("seed");
    } else if (gap <= 20) {
      status = sprout;
      console.log("sprout");
    } else {
      status = carrot;
      console.log("carrot");
    }
  } else if (type === 2) {
    console.log("case2");
  } else {
    console.log("no crops");
  }

  const canvas = Canvas.createCanvas(400, 400);
  const context = canvas.getContext("2d");

  //base layer
  context.drawImage(await Canvas.loadImage(base), 0, 0, 400, 400);
  //seed layer for test
  if (status !== "") {
    context.drawImage(await Canvas.loadImage(status), 71, 71, 32, 32);
  }

  const buffer = await canvas.toBuffer("image/png");
  const attachment = new AttachmentBuilder(buffer, {
    name: "myFarm.png",
  });

  return attachment;
}

module.exports = farmImageMaker;
