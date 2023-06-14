const { db, storage } = require(__dirname + "/../fbase");
const { EmbedBuilder, ButtonStyle } = require("discord.js");
const { Pagination } = require("pagination.djs");

async function startfunction(interaction) {
  const userDoc = db.collection("users").doc(interaction.user.id);
  const snapshot = await userDoc.get();
  const crop1Doc = userDoc.collection("farm").doc("crop1");
  const crop2Doc = userDoc.collection("farm").doc("crop2");
  const crop3Doc = userDoc.collection("farm").doc("crop3");
  const crop4Doc = userDoc.collection("farm").doc("crop4");
  const crop5Doc = userDoc.collection("farm").doc("crop5");
  const crop6Doc = userDoc.collection("farm").doc("crop6");
  const crop7Doc = userDoc.collection("farm").doc("crop7");
  const crop8Doc = userDoc.collection("farm").doc("crop8");
  const crop9Doc = userDoc.collection("farm").doc("crop9");
  const seed1Doc = userDoc.collection("inventory").doc("seed1");
  const seed2Doc = userDoc.collection("inventory").doc("seed2");
  const harvested1Doc = userDoc.collection("inventory").doc("harvested1");
  const harvested2Doc = userDoc.collection("inventory").doc("harvested2");
  const dishDoc = userDoc.collection("inventory").doc("dish");

  // If it exists, return a message
  if (snapshot.exists) {
    interaction.reply("u r already start! type 'bly game'");
  } else {
    // Set the user's data with the new index
    await userDoc.set({
      discordId: interaction.user.id,
      lastLogin: new Date(),
      // exp: 0,
      gold: 100,
    });
    await crop1Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop2Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop3Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop4Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop5Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop6Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop7Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop8Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await crop9Doc.set({
      type: 0,
      createdAt: new Date(),
    });
    await seed1Doc.set({
      number: 0,
    });
    await seed2Doc.set({
      number: 0,
    });
    await harvested1Doc.set({
      number: 0,
    });
    await harvested2Doc.set({
      number: 0,
    });
    await dishDoc.set({
      number: 0,
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
  }
}

module.exports = startfunction;
