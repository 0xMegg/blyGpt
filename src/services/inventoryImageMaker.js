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

  const canvas = Canvas.createCanvas(400, 400);
  const context = canvas.getContext("2d");
  const number = nine;
  context.drawImage(await Canvas.loadImage(base), 0, 0, 400, 400);
  context.drawImage(await Canvas.loadImage(number), 91, 114, 20, 20);

  const buffer = await canvas.toBuffer("image/png");
  const attachment = new AttachmentBuilder(buffer, {
    name: "myInventory.png",
  });

  return attachment;
}

module.exports = inventoryImageMaker;
