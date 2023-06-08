const { AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const { farmBaseUrl } = require(__dirname + "/../assets/bases");
const {
  carrotSeedUrl,
  carrotSproutUrl,
  carrotCropUrl,
  pumpkinSeedUrl,
  pumpkinSproutUrl,
  pumpkinCropUrl,
} = require(__dirname + "/../assets/crops");

async function farmImageMaker(type, time) {
  let status = "";
  const base = farmBaseUrl;

  if (type === 1) {
    const now = new Date().getTime() / 1000;
    const gap = now - time;
    console.log(gap);
    if (gap <= 10) {
      status = carrotSeedUrl;
      console.log("seed");
    } else if (gap <= 20) {
      status = carrotSproutUrl;
      console.log("sprout");
    } else {
      status = carrotCropUrl;
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
