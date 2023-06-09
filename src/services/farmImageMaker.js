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

async function farmImageMaker(cropDataArray) {
  let status = "";
  let cropImageArray = [];
  for (data of cropDataArray) {
    if (data.type === 1) {
      if (data.time > 10) {
        cropImageArray.push(carrotCropUrl);
      } else if (data.time > 5) {
        cropImageArray.push(carrotSproutUrl);
      } else {
        cropImageArray.push(carrotSeedUrl);
      }
    } else if (data.type === 2) {
      if (data.time > 20) {
        cropImageArray.push(pumpkinCropUrl);
      } else if (data.time > 10) {
        cropImageArray.push(pumpkinSproutUrl);
      } else {
        cropImageArray.push(pumpkinSeedUrl);
      }
    }
  }

  // if (type === 1) {
  //   const now = new Date().getTime() / 1000;
  //   const gap = now - time;
  //   console.log(gap);
  //   if (gap <= 10) {
  //     status = carrotSeedUrl;
  //     console.log("seed");
  //   } else if (gap <= 20) {
  //     status = carrotSproutUrl;
  //     console.log("sprout");
  //   } else {
  //     status = carrotCropUrl;
  //     console.log("carrot");
  //   }
  // } else if (type === 2) {
  //   console.log("case2");
  // } else {
  //   console.log("no crops");
  // }

  const canvas = Canvas.createCanvas(400, 400);
  const context = canvas.getContext("2d");

  //base layer
  context.drawImage(await Canvas.loadImage(farmBaseUrl), 0, 0, 400, 400);
  //seed layer for test
  context.drawImage(await Canvas.loadImage(cropImageArray[0]), 86, 140, 64, 64);
  context.drawImage(
    await Canvas.loadImage(cropImageArray[1]),
    86,
    140 + 78,
    64,
    64
  );
  context.drawImage(
    await Canvas.loadImage(cropImageArray[2]),
    86,
    140 + 78 + 78,
    64,
    64
  );
  context.drawImage(
    await Canvas.loadImage(cropImageArray[3]),
    86 + 80,
    140,
    64,
    64
  );
  context.drawImage(
    await Canvas.loadImage(cropImageArray[4]),
    86 + 80,
    140 + 78,
    64,
    64
  );
  context.drawImage(
    await Canvas.loadImage(cropImageArray[5]),
    86 + 80,
    140 + 78 + 78,
    64,
    64
  );
  context.drawImage(
    await Canvas.loadImage(cropImageArray[6]),
    86 + 80 + 80,
    140,
    64,
    64
  );
  context.drawImage(
    await Canvas.loadImage(cropImageArray[7]),
    86 + 80 + 80,
    140 + 78,
    64,
    64
  );
  context.drawImage(
    await Canvas.loadImage(cropImageArray[8]),
    86 + 80 + 80,
    140 + 78 + 78,
    64,
    64
  );

  const buffer = await canvas.toBuffer("image/png");
  const attachment = new AttachmentBuilder(buffer, {
    name: "myFarm.png",
  });

  return attachment;
}

module.exports = farmImageMaker;
