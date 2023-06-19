const { AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const { farmBaseUrl, dog1, dog2, dog3 } = require(__dirname +
  "/../assets/bases");
const {
  carrotSeedUrl,
  carrotSproutUrl,
  carrotCropUrl,
  pumpkinSeedUrl,
  pumpkinSproutUrl,
  pumpkinCropUrl,
} = require("../assets/crops");

async function farmImageMaker(cropDataArray) {
  const canvas = Canvas.createCanvas(400, 400);
  const context = canvas.getContext("2d");

  //base layer
  context.drawImage(await Canvas.loadImage(farmBaseUrl), 0, 0, 400, 400);
  const coordinate = [
    [86, 140, 64, 64],
    [86 + 80, 140, 64, 64],
    [86 + 80 + 80, 140, 64, 64],
    [86, 140 + 78, 64, 64],
    [86 + 80, 140 + 78, 64, 64],
    [86 + 80 + 80, 140 + 78, 64, 64],
    [86, 140 + 78 + 78, 64, 64],
    [86 + 80, 140 + 78 + 78, 64, 64],
    [86 + 80 + 80, 140 + 78 + 78, 64, 64],
  ];

  for (let i = 0; i < cropDataArray.length; i++) {
    if (cropDataArray[i].type === 1) {
      if (cropDataArray[i].time > 10) {
        // tempArray.push(carrotCropUrl);
        context.drawImage(
          await Canvas.loadImage(carrotCropUrl),
          coordinate[i][0],
          coordinate[i][1],
          coordinate[i][2],
          coordinate[i][3]
        );
      } else if (cropDataArray[i].time > 5) {
        context.drawImage(
          await Canvas.loadImage(carrotSproutUrl),
          coordinate[i][0],
          coordinate[i][1],
          coordinate[i][2],
          coordinate[i][3]
        );
      } else {
        context.drawImage(
          await Canvas.loadImage(carrotSeedUrl),
          coordinate[i][0],
          coordinate[i][1],
          coordinate[i][2],
          coordinate[i][3]
        );
      }
    } else if (cropDataArray[i].type === 2) {
      if (cropDataArray[i].time > 20) {
        context.drawImage(
          await Canvas.loadImage(pumpkinCropUrl),
          coordinate[i][0],
          coordinate[i][1],
          coordinate[i][2],
          coordinate[i][3]
        );
      } else if (cropDataArray[i].time > 10) {
        context.drawImage(
          await Canvas.loadImage(pumpkinSproutUrl),
          coordinate[i][0],
          coordinate[i][1],
          coordinate[i][2],
          coordinate[i][3]
        );
      } else {
        context.drawImage(
          await Canvas.loadImage(pumpkinSeedUrl),
          coordinate[i][0],
          coordinate[i][1],
          coordinate[i][2],
          coordinate[i][3]
        );
      }
    }
  }

  const random = Math.floor(Math.random() * 3) + 1;
  if (random === 1) {
    context.drawImage(await Canvas.loadImage(dog1), 285, 79, 32, 48);
  } else if (random === 2) {
    context.drawImage(await Canvas.loadImage(dog2), 285, 79, 32, 48);
  } else if (random === 3) {
    context.drawImage(await Canvas.loadImage(dog3), 285, 79, 32, 48);
  }
  const buffer = await canvas.toBuffer("image/png");
  const attachment = new AttachmentBuilder(buffer, {
    name: "myFarm.png",
  });

  return attachment;
}

module.exports = farmImageMaker;
