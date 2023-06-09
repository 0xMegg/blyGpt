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

  // tempArray = [];

  cropDataArray.forEach(async (data, index) => {
    if (data.type === 1) {
      if (data.time > 10) {
        // tempArray.push(carrotCropUrl);
        context.drawImage(
          await Canvas.loadImage(carrotCropUrl),
          coordinate[index][0],
          coordinate[index][1],
          coordinate[index][2],
          coordinate[index][3]
        );
      } else if (data.time > 5) {
        context.drawImage(
          await Canvas.loadImage(carrotSproutUrl),
          coordinate[index][0],
          coordinate[index][1],
          coordinate[index][2],
          coordinate[index][3]
        );
      } else {
        context.drawImage(
          await Canvas.loadImage(carrotSeedUrl),
          coordinate[index][0],
          coordinate[index][1],
          coordinate[index][2],
          coordinate[index][3]
        );
      }
    } else if (data.type === 2) {
      if (data.time > 20) {
        context.drawImage(
          await Canvas.loadImage(pumpkinCropUrl),
          coordinate[index][0],
          coordinate[index][1],
          coordinate[index][2],
          coordinate[index][3]
        );
      } else if (data.time > 10) {
        context.drawImage(
          await Canvas.loadImage(pumpkinSproutUrl),
          coordinate[index][0],
          coordinate[index][1],
          coordinate[index][2],
          coordinate[index][3]
        );
      } else {
        context.drawImage(
          await Canvas.loadImage(pumpkinSeedUrl),
          coordinate[index][0],
          coordinate[index][1],
          coordinate[index][2],
          coordinate[index][3]
        );
      }
    }
  });

  // for (let i = 0; i < tempArray.length; i++) {
  //   context.drawImage(
  //     await Canvas.loadImage(carrotCropUrl),
  //     coordinate[i][0],
  //     coordinate[i][1],
  //     coordinate[i][2],
  //     coordinate[i][3]
  //   );
  // }

  const buffer = await canvas.toBuffer("image/png");
  const attachment = new AttachmentBuilder(buffer, {
    name: "myFarm.png",
  });

  return attachment;
}

module.exports = farmImageMaker;
