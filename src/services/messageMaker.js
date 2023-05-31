const { db } = require("../fbase");
const farmImageMaker = require("./farmImageMaker");
const rowMaker = require("./rowMaker");

async function farmMessageMaker(interaction, userType) {
  let user;
  if (userType === "author") {
    user = interaction.author;
  } else if (userType === "user") {
    user = interaction.user;
  }
  const id = user.id;
  const userRef = db.collection("users").doc(user.id);
  const userData = (await userRef.get()).data();
  const cropRef = userRef.collection("myFarm").doc("crop1");
  const cropData = (await cropRef.get()).data();
  const time = cropData?.createAt?._seconds;
  const type = cropData?.type;
  const title = `${user.username}'s farm`;
  const content = `💰 ${userData.gold}`;

  const attachment = await farmImageMaker(type, time);
  const rows = rowMaker("farm");
  const message = {
    content: "",
    embeds: [
      {
        title: title,
        description: content,
        image: {
          url: "attachment://myFarm.png",
        },
      },
    ],
    files: [attachment],
    components: rows,
  };

  return message;
}

async function shopMessageMaker(interaction) {
  const imageUrl =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113381984803229786/shop.png";

  const user = interaction.user;
  const id = user.id;
  const userRef = db.collection("users").doc(id);
  const userData = (await userRef.get()).data();
  const title = `${user.username}'s farm`;
  const content = `💰 ${userData.gold}`;

  const rows = rowMaker("shop");
  const message = {
    content: "shop",
    embeds: [
      {
        title: title,
        description: content,
        image: {
          url: imageUrl,
        },
      },
    ],
    files: [],
    components: rows,
  };

  return message;
}

async function inventoryMessageMaker(interaction) {
  const imageUrl =
    "https://cdn.discordapp.com/attachments/1110128243220172833/1113381984803229786/shop.png";

  const user = interaction.user;
  const id = user.id;
  const userRef = db.collection("users").doc(id);
  const userData = (await userRef.get()).data();
  const title = `${user.username}'s farm`;
  const content = `💰 ${userData.gold}`;

  const rows = rowMaker("shop");
  const message = {
    content: "shop",
    embeds: [
      {
        title: title,
        description: content,
        image: {
          url: imageUrl,
        },
      },
    ],
    files: [],
    components: rows,
  };

  return message;
}
module.exports = { farmMessageMaker, shopMessageMaker, inventoryMessageMaker };
