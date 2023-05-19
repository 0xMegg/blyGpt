const { db, storage } = require("../fbase");
const {
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");
const { Pagination, ExtraRowPosition } = require("pagination.djs");

async function startfunction(interaction) {
  const userDocRef = db.collection("users").doc(interaction.user.id);

  // Try to get the user's document
  const doc = await userDocRef.get();

  // If it exists, return a message
  // if (doc.exists) {
  //   interaction.reply("u r already here");
  // } else {
  // Get the current index from the database
  const indexDocRef = db.collection("meta").doc("index");
  let indexDoc = await indexDocRef.get();
  let currentIndex;

  if (!indexDoc.exists) {
    currentIndex = 0; // Set initial value if it doesn't exist
    await indexDocRef.set({ currentIndex: currentIndex });
  } else {
    currentIndex = indexDoc.data().currentIndex;
  }

  // Increment the index for the next user
  await indexDocRef.update({
    currentIndex: currentIndex + 1,
  });

  // Set the user's data with the new index
  await userDocRef.set({
    index: currentIndex,
    discordId: interaction.user.id,
    lastLogin: new Date(),
    exp: 0,
    gold: 0,
  });

  const imageUrl1 =
    "https://firebasestorage.googleapis.com/v0/b/fir-study-1c95a.appspot.com/o/Q_80%2C0.jpeg?alt=media&token=9c015d0e-158e-4d8a-9705-5d3800ee7369";
  const imageUrl2 =
    "https://firebasestorage.googleapis.com/v0/b/fir-study-1c95a.appspot.com/o/NewJeans_theMEGASTUDY.jpg?alt=media&token=fc752bb8-6689-43df-a2d5-01a5bbc1a625";
  const imageUrl3 =
    "https://firebasestorage.googleapis.com/v0/b/fir-study-1c95a.appspot.com/o/maxresdefault.jpg?alt=media&token=c781148d-93d7-454b-9e7e-24a7031998a2";
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
