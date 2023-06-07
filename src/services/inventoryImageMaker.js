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
const { inventoryBaseUrl } = require(__dirname + "/../assets/bases");

async function inventoryImageMaker(number) {
  const base = inventoryBaseUrl;
  // console.log(number);

  const degit3 = Math.floor(number / 100);
  number %= 100;
  const degit2 = Math.floor(number / 10);
  const degit1 = number % 10;

  function getImageByNumber(number) {
    let image;
    switch (number) {
      case 1:
        image = oneUrl;
        break;
      case 2:
        image = twoUrl;
        break;
      case 3:
        image = threeUrl;
        break;
      case 4:
        image = fourUrl;
        break;
      case 5:
        image = fiveUrl;
        break;
      case 6:
        image = sixUrl;
        break;
      case 7:
        image = sevenUrl;
        break;
      case 8:
        image = eightUrl;
        break;
      case 9:
        image = nineUrl;
        break;
      default:
        image = zeroUrl;
        break;
    }
    return image;
  }

  const canvas = Canvas.createCanvas(400, 400);
  const context = canvas.getContext("2d");
  const image3 = getImageByNumber(degit3);
  const image2 = getImageByNumber(degit2);
  const image1 = getImageByNumber(degit1);

  context.drawImage(await Canvas.loadImage(base), 0, 0, 400, 400);
  context.drawImage(await Canvas.loadImage(image3), 57, 110, 20, 20);
  context.drawImage(await Canvas.loadImage(image2), 77, 110, 20, 20);
  context.drawImage(await Canvas.loadImage(image1), 97, 110, 20, 20);

  const buffer = await canvas.toBuffer("image/png");
  const attachment = new AttachmentBuilder(buffer, {
    name: "myInventory.png",
  });

  return attachment;
}

module.exports = inventoryImageMaker;
