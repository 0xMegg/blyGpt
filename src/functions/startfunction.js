const { db, storage } = require("../fbase");
const { EmbedBuilder, ButtonStyle } = require("discord.js");
const { Pagination } = require("pagination.djs");

async function startfunction(interaction) {
  const userDoc = db.collection("users").doc(interaction.user.id);
  const farmDoc = userDoc.collection("farm").doc();
  const inventoryDoc = userDoc.collection("inventory").doc();

  // If it exists, return a message
  // if (doc.exists) {
  //   interaction.reply("u r already here");
  // } else {

  // Set the user's data with the new index
  await userDoc.set({
    discordId: interaction.user.id,
    lastLogin: new Date(),
    exp: 0,
    gold: 0,
  });

  const imageUrl1 =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1111544677829705781/Q_800.jpeg";
  const imageUrl2 =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1111544677427056670/NewJeans_theMEGASTUDY.jpg";
  const imageUrl3 =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1111544677087330416/maxresdefault.jpg";
  // Create a new embed
  const embed1 = new EmbedBuilder()
    .setTitle("Welcome1")
    .setThumbnail(imageUrl1)
    .setDescription("상세설명")
    .addFields({
      name: "빌리야에 온걸 환영해",
      value: "빌리야는 어쩌구 저쩌구",
    });
  const embed2 = new EmbedBuilder()
    .setTitle("Welcome2")
    .setThumbnail(imageUrl2)
    .setDescription("너의 정보는 어쩌구 저쩌구");
  const embed3 = new EmbedBuilder()
    .setTitle("Welcome3")
    .setThumbnail(imageUrl3)
    .setDescription("가입");
  // .addFields({
  //   name: "",
  //   value: "[클릭](http://www.google.com)",
  // });
  const embeds = [embed1, embed2, embed3];

  const pagination = new Pagination(interaction);
  pagination.setButtonAppearance({
    first: {
      label: "처음으로",
      emoji: "",
      style: ButtonStyle.PRIMARY,
    },
    prev: {
      label: "",
      emoji: "◀️",
      style: ButtonStyle.SECONDARY,
    },
    next: {
      label: "",
      emoji: "▶️",
      style: ButtonStyle.SUCCESS,
    },
    last: {
      label: "마지막으로",
      emoji: "",
      style: ButtonStyle.DANGER,
    },
  });

  pagination.setEmbeds(embeds);
  pagination.render();

  // }
}

module.exports = startfunction;
