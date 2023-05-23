const { db, storage } = require("../fbase");
const {
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  AttachmentBuilder,
} = require("discord.js");
const { Pagination, ExtraRowPosition } = require("pagination.djs");
const Canvas = require("@napi-rs/canvas");

async function testfunction(interaction) {
  // const userDocRef = db.collection("users").doc(interaction.user.id);
  // const doc = await userDocRef.get();

  // if (doc.exists) {
  //   const data = doc.data();
  //   const fieldNames = Object.keys(data);
  //   console.log(fieldNames); // This will print an array of field names in the console

  //   // assuming "referenceField" is the name of your reference field
  //   if (data.referenceField) {
  //     const referencePath = data.referenceField.path;
  //     console.log(referencePath); // This will print the path of the reference
  //   }
  // } else {
  //   console.log("No such document!");
  // }

  const base =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110128399986475058/00.PNG";
  const attach01 =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110128399172784158/16.PNG";
  const attach02 =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1110128399575416903/15.PNG";

  const canvas = Canvas.createCanvas(2048, 2048);
  const context = canvas.getContext("2d");
  const images = [
    { img: base, zIndex: 0 },
    { img: attach01, zIndex: 1 },
    { img: attach02, zIndex: 1 },
  ];
  const sorted = images.sort((a, b) => a.zIndex - b.zIndex);

  for (const { img } of sorted) {
    const image = await Canvas.loadImage(img);
    context.drawImage(image, 0, 0, 2048, 2048);
  }

  const buffer = await canvas.toBuffer("image/png");
  const attachment = new AttachmentBuilder(buffer, {
    name: "profile-image.png",
  });

  interaction.reply({ content: "test", files: [attachment] });
}

module.exports = testfunction;
