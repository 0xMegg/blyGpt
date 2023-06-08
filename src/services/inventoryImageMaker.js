const { AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const {
  zeroUrl,
  oneUrl,
  twoUrl,
  threeUrl,
  fourUrl,
  fiveUrl,
  sixUrl,
  sevenUrl,
  eightUrl,
  nineUrl,
} = require(__dirname + "/../assets/numbers");
const {
  carrotSeedUrl,
  carrotCropUrl,
  pumpkinSeedUrl,
  pumpkinCropUrl,
} = require(__dirname + "/../assets/crops");
const { inventoryBaseUrl } = require(__dirname + "/../assets/bases");

async function inventoryImageMaker(
  seed1Number,
  seed2Number,
  harvested1Number,
  harvested2Number
) {
  const canvas = Canvas.createCanvas(400, 400);
  const context = canvas.getContext("2d");
  const seed1NumberImageArray = getImageArrayByNumber(seed1Number);
  const seed2NumberImageArray = getImageArrayByNumber(seed2Number);
  const harvested1NumberImageArray = getImageArrayByNumber(harvested1Number);
  const harvested2NumberImageArray = getImageArrayByNumber(harvested2Number);

  context.drawImage(await Canvas.loadImage(inventoryBaseUrl), 0, 0, 400, 400);
  //carrot seed
  context.drawImage(await Canvas.loadImage(carrotSeedUrl), 98, 91, 32, 32);
  context.drawImage(
    await Canvas.loadImage(seed1NumberImageArray[0]),
    71,
    145,
    20,
    20
  );
  context.drawImage(
    await Canvas.loadImage(seed1NumberImageArray[1]),
    71 + 33,
    145,
    20,
    20
  );
  context.drawImage(
    await Canvas.loadImage(seed1NumberImageArray[2]),
    71 + 33 + 33,
    145,
    20,
    20
  );
  //pumpkin seed
  context.drawImage(
    await Canvas.loadImage(pumpkinSeedUrl),
    98 + 172,
    91,
    32,
    32
  );
  context.drawImage(
    await Canvas.loadImage(seed2NumberImageArray[0]),
    71 + 172,
    145,
    20,
    20
  );
  context.drawImage(
    await Canvas.loadImage(seed2NumberImageArray[1]),
    71 + 172 + 33,
    145,
    20,
    20
  );
  context.drawImage(
    await Canvas.loadImage(seed2NumberImageArray[2]),
    71 + 172 + 33 + 33,
    145,
    20,
    20
  );
  //carrot
  context.drawImage(
    await Canvas.loadImage(carrotCropUrl),
    98,
    91 + 172,
    32,
    32
  );
  context.drawImage(
    await Canvas.loadImage(harvested1NumberImageArray[0]),
    71,
    145 + 172,
    20,
    20
  );
  context.drawImage(
    await Canvas.loadImage(harvested1NumberImageArray[1]),
    71 + 33,
    145 + 172,
    20,
    20
  );
  context.drawImage(
    await Canvas.loadImage(harvested1NumberImageArray[2]),
    71 + 33 + 33,
    145 + 172,
    20,
    20
  );
  //pumpkin
  context.drawImage(
    await Canvas.loadImage(pumpkinCropUrl),
    98 + 172,
    91 + 172,
    32,
    32
  );
  context.drawImage(
    await Canvas.loadImage(harvested2NumberImageArray[0]),
    71 + 172,
    145 + 172,
    20,
    20
  );
  context.drawImage(
    await Canvas.loadImage(harvested2NumberImageArray[1]),
    71 + 172 + 33,
    145 + 172,
    20,
    20
  );
  context.drawImage(
    await Canvas.loadImage(harvested2NumberImageArray[2]),
    71 + 172 + 33 + 33,
    145 + 172,
    20,
    20
  );

  const buffer = await canvas.toBuffer("image/png");
  const attachment = new AttachmentBuilder(buffer, {
    name: "myInventory.png",
  });

  return attachment;
}
function getImageByNumber(number) {
  if (number === 1) {
    return oneUrl;
  } else if (number === 2) {
    return twoUrl;
  } else if (number === 3) {
    return threeUrl;
  } else if (number === 4) {
    return fourUrl;
  } else if (number === 5) {
    return fiveUrl;
  } else if (number === 6) {
    return sixUrl;
  } else if (number === 7) {
    return sevenUrl;
  } else if (number === 8) {
    return eightUrl;
  } else if (number === 9) {
    return nineUrl;
  } else if (number === 0) {
    return zeroUrl;
  }
}
function getImageArrayByNumber(number) {
  const degit3 = getImageByNumber(Math.floor(number / 100));
  number %= 100;
  const degit2 = getImageByNumber(Math.floor(number / 10));
  const degit1 = getImageByNumber(number % 10);
  return [degit3, degit2, degit1];
}

module.exports = inventoryImageMaker;
