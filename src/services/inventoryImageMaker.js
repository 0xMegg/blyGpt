const { AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");

async function inventoryImageMaker(number) {
  const base =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113384356950589450/inventory.png";
  const zero =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113388569214582805/0.png";
  const one =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113388569512398908/01.png";
  const two =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113388569768239187/02.png";
  const three =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113388570028277801/03.png";
  const four =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113388570279956571/04.png";
  const five =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113388570556768306/05.png";
  const six =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113388570955218944/06.png";
  const seven =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113388571219480586/07.png";
  const eight =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113388571492098068/08.png";
  const nine =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113388571777302548/09.png";

  // console.log(number);

  const degit3 = Math.floor(number / 100);
  number %= 100;
  const degit2 = Math.floor(number / 10);
  const degit1 = number % 10;

  function getImageByNumber(number) {
    let image;
    switch (number) {
      case 1:
        image = one;
        break;
      case 2:
        image = two;
        break;
      case 3:
        image = three;
        break;
      case 4:
        image = four;
        break;
      case 5:
        image = five;
        break;
      case 6:
        image = six;
        break;
      case 7:
        image = seven;
        break;
      case 8:
        image = eight;
        break;
      case 9:
        image = nine;
        break;
      default:
        image = zero;
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
